+++
date = '2025-01-11T20:12:12-05:00'
draft = false
my_url = 'https://huyenchip.com//2025/01/07/agents.html'
slug = 'Agents'
tags = ['ai', 'llm', 'agents', 'llm-planning', 'llm-feedback', 'llm-reasoning']
+++
I came across Chip Huyen's blog via twitter today. Her blog is great and has a lot of content I'm going to read. I'll start with this post on Agents. 

Chip defines Agents as:

> An agent is anything that can perceive its environment and act upon that environment. Artificial Intelligence: A Modern Approach (1995) defines an agent as anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators.⁠

She then explains that the interaction between an agent and the environment is the key to the agent's success. If you build a web scraping agent, the internet is the environment. If you build an agent that can play Minecraft, the Minecraft world is the environment. And so on.

Planning is the heart of an agent, and in the blog, Chip provides a lot of detail on it. Planning is decoupled from execution. The plan requires that the model understands the user's intent and requires that the model breaks the task down into smaller subtasks. You can do a lot to help improve the likelihood of success - asking for human feedback, writing great system prompts, giving better descriptions of the tools available to the agent, use a stronger model, or even fine tune a model.

To me it seems that with the current state of LLMs, the most effective manner to improve the planning aspect of an agent is to ask for human feedback. There may be veritcals, like coding or math, where the plan is easier for an LLM to generate, but for the long tasks, I think asking for human feedback is the best way to improve the agent. I wonder if we'll ever see the reasoning models (o1, o3, etc) allow users to adjust hte plan on the fly. I know that Google's Gemini 1.5 Deep Research has a "refine" feature that allows you to adjust the plan already.

The post is great, and the blog looks promising. I'll be back to Chip's writing!

