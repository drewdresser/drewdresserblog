+++
date = '2025-05-03T20:00:37-04:00'
draft = false
title = 'AI Storybooks'
+++
My wife and I recently had a baby. She is 4 months now, but as you can imagine, the AI use cases for raising a baby are endless. There is the late night - "what do I do if my baby won't sleep" questions to `4o`, there are the "please researach why we should or shouldn't let our baby use a standing play station" to `o3` and lastly, there is the "write me a story I can read to my 4 month year old about her trip to Central Park" to `4.5` and `4o` image. 

It's the last use case that this post is about - wouldn't it be cool if I had a basic python script, web app, or something that could take an input and generate a beautiful children's book? Couple this with OpenAI's latest image model `gpt-image-1 and my ideas started flowing. Today I'm ready to release a v0 [here](https://github.com/drewdresser/storybook-creator).


I'm excited to introduce Custom Story Gen - an early prototype of an AI-powered tool that will generate custom, print-ready children's storybooks. This is more than just a content generator. It's a wraper on LLMs that brings us towards a future where anyone can create high-quality, personalized storybooks starring their own children, pets, family members, and adventures, complete with matching illustration.

My goal with this app is to generate stories that are so coherent, well-illustrated, and emotionally relevent that you'd feel great about printing them. They can be used for bedtime traditions or birthay gits, but I want these books to feel personal and polished.

### What it can today
Today is an early launch. It's highly technical and requires python experience to run. Today the app can:
- Create original stories tailored to your child’s age range
- Include your own characters (and even upload a photo for illustration purposes)
- Customize the setting, tone, theme, and length
- Automatically generate matching illustrations for each page
- Export a structured folder with page images, text, and metadata

Here is a basic example of the configuration you can use:
```json
{
  "characters": [
    {
      "name": "Ella",
      "description": "A baby human with a big smile",
      "image_path": "input/images/ella.jpeg"
    },
    {
      "name": "Rory",
      "description": "A black and white tibetan terrier puppy"
    }
  ],
  "theme": "Friendship and overcoming fears",
  "age_range": "1-2 years",
  "location": {
    "setting": "A sunny meadow next to a sparkling blue river",
    "details": ["Tall swaying grass", "Colorful wildflowers", "Busy buzzing bees"]
  },
  "story_length_pages": 5,
  "image_style": "Colorful cartoon illustration, simple and friendly, watercolor texture"
}

```
Here are some example outputs from a recent story:
{{< figure src="page_01.png" alt="Page 1 of the storybook" >}}
{{< figure src="page_02.png" alt="Page 2 of the storybook" >}}
{{< figure src="page_03.png" alt="Page 3 of the storybook" >}}


### Under the Hood: The Architecture
The current system is simple by design, but thoughtfully structured:
- Python 3.12+ powers the backend logic
- OpenAI & Gemini APIs are used to generate story text and illustrations
- JSON config-driven design allows non-developers to use the tool easily

File-based output includes:
- A .txt file with the story
- Individual .png illustrations per page
- A manifest JSON for downstream publishing or UI use

It’s a thin wrapper for now—but a powerful one.

### What’s Coming Next
This prototype is only the beginning. Here’s what’s on the roadmap:

**LLM-Powered Evaluation:**
We plan to build an agent that acts as a quality control editor, rating generated books for clarity, engagement, tone, and age-appropriateness.

**Turn It Into a SaaS Tool:**
A user-friendly web app where parents can create, preview, and purchase personalized books without touching code.

**Smarter Agentic Backends:**
Today’s story generation is linear. Future versions will use agents to dynamically plan story arcs, revise drafts, and coordinate illustration prompts for consistency.

**Printer Integration:**
Ultimately, we want to connect directly to on-demand book printing services—so you can create and order a printed copy in just a few clicks.

### Try it today
Want to test it out?
```bash
git clone https://github.com/yourusername/story-book-creator.git
cd story-book-creator
uv sync
cp .env.example .env  # Add your OpenAI and Gemini keys
cp story_config.example.json input/story_config.json  # Customize your story
uv run main.py
```
Your generated book will appear in the output/ directory. Tweak your config, try different characters, experiment with styles—this is your sandbox.

We’re just getting started. If you want to follow along—or contribute—check out the [GitHub](https://github.com/drewdresser/storybook-creator) repo and stay tuned for upcoming updates. The future of storytime is personal, and we’re building it—one page at a time.