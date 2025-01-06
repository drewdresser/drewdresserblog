+++
date = '2025-01-05T14:22:58-05:00'
draft = false
title = 'AI Git Message'
tags = ['git', 'zsh', 'ai', 'llm', 'simonw']
+++

Ever find yourself staring at your terminal, struggling to write the perfect git commit message? I recently added a game-changing alias to my zshrc that leverages the power of LLMs to generate commit messages automatically. Using Simon Willison's llm CLI tool – a Swiss Army knife for interacting with language models directly from your terminal – this alias pipes your git diff through an AI model to generate concise, descriptive commit messages. It's like having a pair programmer who's really good at documentation sitting right next to you. Implementation is as simple as adding a single line to your zshrc, and just like that, you've automated one of development's most tedious tasks. While it might feel a bit like cheating, I've found the generated messages are often more consistent and informative than my manual ones, especially during those late-night coding sessions.

```bash
alias gitmessage='git diff | llm " Below is a diff of all staged changes, coming from the command:
\`\`\`
git diff
\`\`\`
Please generate a concise, one-line commit message for these changes."'
```