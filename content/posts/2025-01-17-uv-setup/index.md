+++
date = '2025-01-17T13:05:43-05:00'
draft = true
title = '2025 01 17 Uv Setup'
+++
I wanted to document some things about my UV setup. UV is 


## Command Line
```
uv sync
```

Good for running in a CI/CD pipeline to make sure virtual envrionment is set up correctly.

```python
uv run hellp.py
```
1. Installs python
2. Creates and activates virtual environment
3. Installs dependencies
4. Runs the script


## Tool usage
Some tools are available in the uv through `uvx`.

```bash
uvx ruff check .
```


