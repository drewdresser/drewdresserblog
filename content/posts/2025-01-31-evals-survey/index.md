+++
date = '2025-01-31T23:16:37-05:00'
draft = false
title = 'Eval datasets and frameworks survey'
tags = ['evals', 'llm']
+++
The rapid pace of model development means everyone’s on a never-ending quest to figure out if the latest model is actually better than its predecessor. Public benchmarks are essential, but they usually only paint part of the picture. By rolling your own evaluations, you get a direct view of how a model handles tasks that matter to your team—like domain-specific question-answering, custom code generation, or weird edge cases unique to your product.

The first part of a hopeful series is to conduct a survey of popular evaluation datasets and a quick description of each.

### Evaluation Datasets

1. [TruthfulQA](https://github.com/sylinrl/TruthfulQA) – Tests how well a model avoids repeating human falsehoods. Comes in generative and multiple-choice variants. Great for checking whether your model parrots misinformation.
2. [Lab Bench](https://arxiv.org/pdf/2407.10362) – A robust, biology-focused dataset with 30 subtasks like protocol troubleshooting and sequence manipulation. Perfect if you’re dealing with scientific research workflows.
3. [SWE-bench](https://www.swebench.com/) – Focuses on real GitHub Issues. Ideal if your team wants to evaluate code quality, debugging capabilities, or how well a model handles real-world developer workflows.
4. [RE-Bench](https://arxiv.org/pdf/2411.15114) – Specifically probes AI’s R&D capabilities in a controlled environment, letting you compare model performance against human benchmarks.
5. [GPQA](https://arxiv.org/abs/2311.12022) – Graduate-level multiple-choice questions from actual PhD students. This is great if you’re dealing with advanced scientific or technical reasoning tasks that require real depth.
6. [Frontier Math](https://epoch.ai/frontiermath), [GSM8K](https://paperswithcode.com/dataset/gsm8k), [MATH](https://huggingface.co/datasets/HuggingFaceH4/MATH-500), and [DeepMind Mathematics](https://github.com/google-deepmind/mathematics_dataset) – For math-savvy teams, these are gold. They test everything from grade-school arithmetic to high-level theorem solving.
7. [HellaSwag](https://deepgram.com/learn/hellaswag-llm-benchmark-guide), [WinoGrande](https://winogrande.allenai.org/), and [MMLU Benchmark](https://arxiv.org/pdf/2009.03300) – If you want to test common-sense reasoning, logic, or broader knowledge capabilities, these cover a wide range.
8. [ARC](https://github.com/fchollet/ARC-AGI) (Abstraction and Reasoning Corpus) – Good for puzzles that test a model’s ability to identify patterns without explicit instructions.
9. [PopQA](https://huggingface.co/datasets/akariasai/PopQA) – Useful for stress-testing how well a model retains or “forgets” entity-specific information over multiple turns in conversation.
10. [HumanEval](https://github.com/openai/human-eval), [BigCodeBench](https://github.com/bigcode-project/bigcodebench) – If you need to see how your model handles code generation or code QA.
11. [IfEval-OOD](https://arxiv.org/pdf/2311.07911), [HREF](https://huggingface.co/datasets/allenai/href), [BigBenchHard](https://github.com/suzgunmirac/BIG-Bench-Hard), [DROP](https://github.com/allenai/allennlp-reading-comprehension/blob/master/allennlp_rc/eval/drop_eval.py) – More specialized sets that target out-of-distribution reasoning, reading comprehension, or advanced multi-step logic.

### Evaluation Frameworks

1. [Olmes](https://github.com/allenai/olmes?tab=readme-ov-file) – A new tool that simplifies loading, running, and reporting benchmarks on your model.
2. [llm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) by EleutherAI – One of the most established frameworks, supporting a ton of datasets and easy to customize for your own data.


I'm sure I'm missing some. If you know of any, please let me know. For now I think this puts one in a good position to start clicking around and researching which of these datasets are most relevant to their use case. From there, you can use oen of the evaluation frameworks to run through the curated dataset.
