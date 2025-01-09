+++
date = '2025-01-08T21:04:04-05:00'
draft = false
title = 'Running Ollama Vision Models Locally'
tags = ['phi', 'ai', 'ollama', 'llama','vision', 'llm', 'til', 'llm-ollama', 'uv']
+++
When I was checking out the new [Phi model with Ollama](https://x.com/ollama/status/1877055568264966614). I came across the [LLM Ollama plugin](https://github.com/taketwo/llm-ollama). It reminded me that Ollama now supports vision models.One of the use cases I've been thinking about is script that can run against all images in my downloads folder and generate a description of each image. Many of them have obscure names, and I'd like to be able to search them by description.

Here is my attempt to do this. The script is as simple as:

```bash
for file in ~/Downloads/*.{jpg,jpeg,png,gif,webp}; do
    echo "Processing $file"
    llm -m llama3.2-vision:11b "Describe this image." -a "$file"
done
```

To run this, you'll need to install [LLM](https://llm.datasette.io/en/stable/) and [Ollama](https://ollama.ai/). Then you'll need to install the llama3.2-vision model:

```bash
ollama pull llama3.2-vision:11b
```
and install the plugin: 
```bash
llm install --upgrade llm-ollama
```

This is remarkably simple and produces really helpful descriptions. 
{{< figure src="image.png" alt="Ollama Vision Local" >}}

```
The image shows a man running across the finish line of a triathlon, with a red archway and a crowd of people watching. The purpose of the image is to capture the moment of triumph for the athlete as he completes his race.

* A man:
        + Wearing a black triathlon suit
        + Running towards the camera
        + Has a number on his bib
        + Appears to be exhausted but determined
* A finish line:
        + Red archway with white text that reads "FINISH"
        + Surrounded by spectators and officials
        + Located at the end of a road or track
* A crowd of people:
        + Standing behind barriers, watching the athlete cross the finish line
        + Cheering and taking photos
        + Dressed in casual clothing, with some wearing team jerseys

The image conveys a sense of excitement and accomplishment, as the athlete reaches the end of his grueling triathlon. The crowd's enthusiasm adds to the celebratory atmosphere, making it clear that this is a momentous occasion for all involved.
```

It can obviously be modified to run against any file or folder that you want. I could imagine doing some intelligent document processing on this to help group similar files together and cleaning up my downloads folder.

 
Lastly, if you prefer a web interface for more adhoc usage. You can use [Open WebUI](https://github.com/open-webui/open-webui) and uvx to run it locally:
```bash
uvx --python 3.11 open-webui serve
```
This will automatically find the Ollama models you have, including your image model.