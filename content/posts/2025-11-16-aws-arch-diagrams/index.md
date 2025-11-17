+++
date = '2025-11-16T21:45:34-05:00'
draft = false
title = 'I Taught an AI to Draw My AWS Diagrams So I Never Have To Again'
+++
If you’re a Solutions Architect, you know the drill: half your job is explaining architecture, and the other half is drawing the same architecture diagram 400 different ways.
This weekend, I finally decided to do something about it and build an AI Aagent that could draw them for me.
The goal was simple:
1. Let an agent generate AWS architecture (diagrams)[https://diagrams.mingrammer.com/] as code, using the excellent diagrams library.
2. Let that same agent execute the code to return a finished diagram image.

This was a two night experiment, here is how far I got:

1. First attempt: https://github.com/drewdresser/aws-solutions-architect-bench/blob/main/scripts/archdiagram_pydantic.py
2. Second attempt: https://github.com/drewdresser/aws-solutions-architect-bench/blob/main/scripts/archdiagram_pydantic_e2b.py

*Side note,* I spent a little time trying to configure Langfuse, Pydantic AI, and Langfuse. It didn't go great, but that might be a post for a new day.

## Attempt #1 Pydantic AI with build in CodeExecutionTool

I started simple: let Pydantic AI generate the code and execute it in line

```python
agent = Agent[None, str](
    "openai-responses:gpt-5.1",
    builtin_tools=[CodeExecutionTool()],
    model_settings=model_settings,
)

result = agent.run_sync(
    "Your job is to return an image of the architecture diagram. To do that you should use python diagrams library to generate the diagram. Then you should run the code to generate the image. You might have to install the diagrams library first."
)
```

It worked great until... it didn't. The sandbox environment couldn't `pip install diagrams` because there is no network access. Deal breaker. On to attempt #2

## Attempt #2: Pydantic AI with E2B Sandbox (Much Better)

E2B has a Code Interpreter sandbox I’ve been meaning to try. It lets you execute arbitrary Python and shell commands in an isolated environment, and it’s surprisingly pleasant to use on the free tier.

The first issue I had to tackle was that graphviz wasn’t installed in the environment and its not installable with pip (I guess that means E2B Sandbox will pip install things if it **is** pip installable, should check on this later).

So I added tooling for the agent to probe the environment first, then decide how to proceed.

### Environment inspection tool
This helper checks what the sandbox can actually do: package managers, permissions, installed binaries, etc. I anticipate this will be helpful as I try out multiple code execution environments.

```python
@agent.tool
def check_environment(ctx: RunContext[None]) -> CodeExecutionResult:
    ...
```

### Executing Python and extracting images
Next, the core tool: run Python inside E2B and extract whatever images it generates — PNG, JPEG, SVG, whatever.

```python
@agent.tool
def execute_python_code(ctx: RunContext[None], code: str) -> CodeExecutionResult:
    ...
```

Next, I went to work on the system prompt and agent:

```python
agent = Agent[None, str](
    "openai-responses:gpt-5.1",
    model_settings=model_settings,
    system_prompt="You are an expert at creating AWS architecture diagrams using Python's diagrams library. "
    "You can execute Python code using the E2B code interpreter to generate diagrams. "
    "If you encounter missing packages or dependencies, first use check_environment to understand what's available, "
    "then use run_shell_command to install them. "
    "For Python packages: 'pip install diagrams' "
    "For system packages: The E2B code interpreter sandbox may have restrictions. Try 'sudo apt-get install -y graphviz' "
    "but if that fails due to permissions, you may need to work around it or use alternative approaches. "
    "Always check the environment first to understand what package managers and permissions are available.",
)
```

The agent has four tools. check_environment inspects the sandbox to see what's available:

```python
@agent.tool
def check_environment(ctx: RunContext[None]) -> CodeExecutionResult:
    """
    Check the E2B sandbox environment to understand what's available.

    This tool helps identify:
    - What package manager is available (apt-get, yum, dnf, etc.)
    - What user we're running as (root or regular user)
    - What's already installed
    - System information

    Returns:
        Result containing environment information
    """
    try:
        sandbox = get_sandbox()

        # Check multiple things in parallel
        checks = [
            ("whoami", "Current user"),
            ("id", "User ID and groups"),
            ("which apt-get", "apt-get availability"),
            ("which yum", "yum availability"),
            ("which dnf", "dnf availability"),
            ("which pip", "pip availability"),
            ("which python3", "python3 availability"),
            ("which dot", "graphviz dot availability"),
            ("cat /etc/os-release", "OS information"),
        ]

        output_parts: list[str] = []
        output_parts.append("Environment Check Results:")
        output_parts.append("=" * 50)

        for cmd, description in checks:
            try:
                result = sandbox.commands.run(cmd, timeout=10)
                status = "✓" if result.exit_code == 0 else "✗"
                output_parts.append(f"\n{status} {description}:")
                if result.stdout:
                    output_parts.append(f"  {result.stdout.strip()}")
                if result.stderr and result.exit_code != 0:
                    output_parts.append("  (not found)")
            except Exception as e:
                output_parts.append(f"\n✗ {description}: Error - {str(e)}")

        output = "\n".join(output_parts)

        return CodeExecutionResult(
            success=True,
            output=output,
            files=[],
        )

    except Exception as e:
        return CodeExecutionResult(
            success=False,
            output="",
            error=f"Environment check error: {str(e)}",
            files=[],
        )
```

The core tool is `execute_python_code` which runs Python in the E2B sandbox and extracts generated images. E2B returns execution results that can include text, images, HTML, and markdown. The tool decodes base64 encoded images and saves them locally:

```python
@agent.tool
def execute_python_code(ctx: RunContext[None], code: str) -> CodeExecutionResult:
    """
    Execute Python code using E2B code interpreter.

    This tool can execute Python code in a sandboxed environment. It's particularly
    useful for generating architecture diagrams using the diagrams library.

    If you encounter import errors or missing packages, use the run_shell_command
    tool first to install the required packages (e.g., "pip install diagrams graphviz").

    Args:
        code: Python code to execute

    Returns:
        Result containing execution output, any errors, and generated files
    """
    try:
        sandbox = get_sandbox()

        # Execute the code - E2B sandbox.run_code() returns an Execution object
        execution = sandbox.run_code(code)

        # Check for errors first
        if execution.error:
            error_msg = f"{execution.error.name}: {execution.error.value}\n{execution.error.traceback}"
            return CodeExecutionResult(
                success=False,
                output="",
                error=error_msg,
                files=[],
            )

        # Collect output from results
        output_parts: list[str] = []
        files: list[str] = []
        image_data: bytes | None = None
        image_filename: str | None = None

        # Process each result in the execution
        for result in execution.results:
            # Handle text output
            if result.text:
                output_parts.append(result.text)

            # Handle image output (PNG, JPEG, SVG) - these contain base64 encoded data
            if result.png:
                try:
                    # PNG data is base64 encoded in E2B
                    image_data = base64.b64decode(result.png)
                    image_filename = "diagram.png"
                    output_parts.append("PNG image generated successfully")
                except Exception as e:
                    logger.error(f"Failed to decode PNG data: {str(e)}")
                    output_parts.append(
                        f"PNG image generated but decode error: {str(e)}"
                    )
            if result.jpeg:
                try:
                    image_data = base64.b64decode(result.jpeg)
                    image_filename = "diagram.jpeg"
                    output_parts.append("JPEG image generated successfully")
                except Exception as e:
                    logger.error(f"Failed to decode JPEG data: {str(e)}")
                    output_parts.append(
                        f"JPEG image generated but decode error: {str(e)}"
                    )
            if result.svg:
                # SVG is typically text, not base64
                if result.svg:
                    svg_bytes = result.svg.encode("utf-8")
                    image_data = svg_bytes
                    image_filename = "diagram.svg"
                    output_parts.append("SVG image generated successfully")

            # Handle HTML output
            if result.html:
                output_parts.append("HTML output generated")

            # Handle markdown output
            if result.markdown:
                output_parts.append(result.markdown)

        # Also check execution.text property for main result
        if execution.text and execution.text not in output_parts:
            output_parts.insert(0, execution.text)

        # Check if output mentions a file path and try to read it from the sandbox
        output_text = "\n".join(output_parts) if output_parts else ""

        # Try multiple patterns to find file references
        file_path_match = re.search(
            r"sandbox:([^\s\)]+\.(png|jpg|jpeg|svg))", output_text, re.IGNORECASE
        )
        filename_match = re.search(
            r"[`'\"]([^\s`'\"]+\.(png|jpg|jpeg|svg))[`'\"]", output_text, re.IGNORECASE
        )
        simple_filename_match = re.search(
            r"\b([a-zA-Z0-9_-]+\.(png|jpg|jpeg|svg))\b", output_text, re.IGNORECASE
        )

        # Determine which path to use
        sandbox_path = None
        if file_path_match:
            sandbox_path = file_path_match.group(1)
        elif filename_match:
            sandbox_path = filename_match.group(1)
        elif simple_filename_match:
            sandbox_path = simple_filename_match.group(1)

        if sandbox_path and not image_data:
            try:
                # Try to read the file from sandbox
                file_data = sandbox.files.read(sandbox_path, format="bytes")
                if file_data and isinstance(file_data, bytearray):
                    image_data = bytes(file_data)
                    image_filename = Path(sandbox_path).name
                    output_parts.append(
                        f"Successfully retrieved image file: {sandbox_path}"
                    )
            except Exception:
                # Try common diagram output locations
                common_paths = [
                    f"/{sandbox_path}",
                    f"./{sandbox_path}",
                    sandbox_path,
                    "/architecture_diagram.png",
                    "/diagram.png",
                    "./architecture_diagram.png",
                    "./diagram.png",
                ]
                # Remove duplicates while preserving order
                seen = set()
                unique_paths = []
                for path in common_paths:
                    if path not in seen:
                        seen.add(path)
                        unique_paths.append(path)
                common_paths = unique_paths
                for common_path in common_paths:
                    try:
                        file_data = sandbox.files.read(common_path, format="bytes")
                        if file_data and isinstance(file_data, bytearray):
                            image_data = bytes(file_data)
                            image_filename = Path(common_path).name
                            output_parts.append(f"Found image at: {common_path}")
                            break
                    except Exception:
                        continue

        # Save image to local file if we have image data
        if image_data and image_filename:
            output_dir = Path("results/diagrams")
            output_dir.mkdir(parents=True, exist_ok=True)
            local_path = output_dir / image_filename
            try:
                with open(local_path, "wb") as f:
                    f.write(image_data)
                logger.info(f"✅ Saved image to: {local_path}")
                files.append(str(local_path))
                output_parts.append(f"\n✅ Image saved to: {local_path}")
            except Exception as e:
                logger.error(f"Failed to save image: {str(e)}")
                output_parts.append(f"\n❌ Failed to save image: {str(e)}")

        output = (
            "\n".join(output_parts) if output_parts else "Code executed successfully"
        )

        return CodeExecutionResult(success=True, output=output, files=files)

    except Exception as e:
        return CodeExecutionResult(
            success=False, output="", error=f"Execution error: {str(e)}", files=[]
        )
```

The tool handles multiple image formats (PNG, JPEG, SVG), extracts images from E2B results (base64 or file reads), and saves them locally. It also tries common file paths if the image isn't in the results.
The workflow: the agent checks the environment, installs dependencies if needed, writes Python code using the diagrams library, executes it in E2B, and extracts the generated image. Pydantic AI structures the tool calls, and E2B provides isolation and execution capabilities.
This approach lets the agent reason about dependencies, write code, execute it safely, and retrieve artifacts—all orchestrated through Pydantic AI's tool system.

## Conclusion
This actually felt useful. Even in its early state, it's good enough to:;
- Generate a first-pass architecture diagram from a textual requirement
- Run the code
- Produce a real image
- Iterate based on feedback

I think this could be genuinely useful. Some possible next steps:
- deploy it! I'm thinking about AgentCore Gateway to expose it via MCP
- try out other code interpreters like Amazon Bedrock AgentCore Code Interpreter, Modal, Daytona, or Runloop
- add in a critique agent that can view the image and give feebdack
- evals...

This was a fun two night build. And honestly, anything the barrier to creating an architecture diagram is worth celebrating. 

More experiments soon.