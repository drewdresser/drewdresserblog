+++
date = '2025-01-20T21:10:59-05:00'
draft = false
title = 'Running Deepseek R1 Locally'
tags = ['deepseek', 'llm', 'ollama']
+++
If you want to see a model "think" on your local machine, here is a quickstart:
1. Download a distilled version of the model: `ollama run hf.co/unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF:Q8_0`
2. Chat with the model there OR if you have the LLM CLI tool installed and the llm-ollama plugin (`llm install --upgrade llm-ollama`), you can run:
    ```bash
    llm -m 'hf.co/unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF:Q8_0' \
        'Flagship Pioneering is a Venture Creation company that creates companies. Come up with 5 new company ideas for them'
    ```

I've found the outputs to be mediocre. It's a distilled model, etc. etc. and a better comparison would be with their public API; however, it's facsinating to see the model "think" on your local machine.