+++
date = '2024-12-27T10:58:31-05:00'
draft = false
my_url = 'https://www.anthropic.com/research/building-effective-agents'
slug = 'Building effective agents'
tags = ['anthropic', 'agents', 'ai']
+++
Agents are an overloaded term in AI. I found this article to be particularly helpful in understanding the current definition of agenticy systems, agents, and workflows. Plus it included a survey of some popular workflow architectures. To me, it all starts looking a lot like the microservices architectures as those were becoming more and more popular by Amazon over the past decade.

One principal to follow when building (software in general) agentic systems...
>When building applications with LLMs, we recommend finding the simplest solution possible, and only increasing complexity when needed. This might mean not building agentic systems at all. Agentic systems often trade latency and cost for better task performance, and you should consider when this tradeoff makes sense.

Their definitions of agents...
- Agentic systems - parent term for an entire app or system
- Workflows - systems where multiple LLMs are orchestrated together with code 
- Agents - LLMs dynamically direct their own processes and tool usage

Their walkthrough of common workflow patterns was interesting as well. They walk through prompt chaining, routing parallelization, orchestrator workers, and evaluator optimizer. I think as reasoning models like o1 become more powerful, we’ll start to see these workflows become less important. Let’s look at Evaluator-optimizer:

{{< figure src="image.png" alt="Evaluator Optimizer" >}}

This is just one LLM providing content or a response and another LLM call provides feedback or an evaluation. It’s useful if we have evaluation criteria. 

As reasoning models increase, more applications will move from worklfows to agents. Models like o1 that are doing multi step reasoning, one of the first types of paths I expect them to take, would be the iterative loop above. Let’s try it with Google Gemini’s new 2.0 Flash Thinking Experimental:

**Prompt**
💭
```
Generate a day-by-day training plan for a reactive dog exhibiting specific behaviors: lunging, barking at strangers. The plan should incorporate positive reinforcement techniques and gradually desensitize the dog to triggers over 4 weeks. Each day’s plan must include:
•	A clearly defined goal for that day.
•	Detailed instructions for the owner, including step-by-step exercises.
•	A checklist to measure the dog’s progress.

Evaluation Criteria:

1. Clarity: Are the daily goals and instructions written in a way that is easy to understand for a non-expert dog owner?
2. Feasibility: Are the exercises practical for an average dog owner to implement with minimal equipment or prior training experience?
3. Progressiveness: Does the plan show a clear progression from simple to complex tasks aligned with the dog’s desensitization process?
4. Effectiveness: Based on canine training principles, is the plan likely to improve the dog’s behavior when executed consistently?
5. Empathy: Does the tone and approach demonstrate understanding of the challenges faced by both the dog and the owner?
```
**Thinking** 🧠

This is a stripped down version of Gemini's thought process.
```
1. Deconstruct the Request
2. Establish Foundational Principles: Positive Reinforcement, Classical Conditioning , Operant Conditioning, Gradual Exposure, Consistency is Key, Manage the Environment, Listen to Your Dog, Patience and Understanding
3. Structure the 4 Weeks: Week 1: Foundation Building, Week 2: Controlled Exposure (Distance), Week 3: Controlled Exposure (Closer), Week 4: Generalization and Maintenance
4. Design Daily Goals
5. Develop Detailed Instructions
6. Create Progress Checklists
7. Incorporate Evaluation Criteria Throughout
8. Refine and Review
9. Add Important Considerations
10. Self-Correction Example during the Process
    - Initial Thought, Correction, Revised Approach
```
<!-- - Details
    
    Here's a breakdown of the thinking process to construct the 4-week reactive dog training plan:
    
    1. **Deconstruct the Request:** Identify the core requirements: 4-week plan, reactive dog (lunging/barking at strangers), positive reinforcement, gradual desensitization, daily goals, detailed instructions, progress checklist, and adherence to the evaluation criteria (clarity, feasibility, progressiveness, effectiveness, empathy).
    2. **Establish Foundational Principles:** Before diving into the week-by-week structure, consider the overarching training principles:
        - **Positive Reinforcement:** Focus on rewarding desired behaviors, not punishing unwanted ones. High-value treats are essential.
        - **Classical Conditioning:** Create positive associations with triggers. Pairing the trigger with something good (treats) changes the dog's emotional response.
        - **Operant Conditioning:** Teach alternative behaviors (like "look at that") to redirect focus.
        - **Gradual Exposure:** Start with triggers at a distance or intensity the dog can handle and slowly increase the challenge. Avoid pushing the dog "over threshold."
        - **Consistency is Key:** Regular, short sessions are more effective than infrequent, long ones.
        - **Manage the Environment:** Avoid putting the dog in situations where they'll react intensely early on.
        - **Listen to Your Dog:** Watch for signs of stress (whale eye, lip licking, tense body) and adjust the training accordingly.
        - **Patience and Understanding:** Reactive behavior is often rooted in fear or anxiety. The process takes time.
    3. **Structure the 4 Weeks:** Plan a logical progression:
        - **Week 1: Foundation Building:** Focus on basic obedience in a low-stress environment and introducing the concept of "Look at That."
        - **Week 2: Controlled Exposure (Distance):** Introduce triggers at a distance where the dog is aware but not reactive. Start generalizing the "Look at That" cue.
        - **Week 3: Controlled Exposure (Closer):** Gradually decrease the distance to triggers, while maintaining a controlled environment. Introduce counter-conditioning exercises like "Find It."
        - **Week 4: Generalization and Maintenance:** Practice in more varied environments with more varied triggers. Focus on maintaining progress and handling unexpected encounters.
    4. **Design Daily Goals:** For each day, create a specific, achievable goal that builds upon the previous days/weeks. Ensure the goals are concrete and measurable. Examples: "Practice 'sit' and 'stay' indoors," "Observe a stranger from a distance of 50 feet without reaction."
    5. **Develop Detailed Instructions:** Break down each exercise into simple, actionable steps. Provide specific guidance on treat delivery, distance, duration, and when to stop. Use clear and concise language. Emphasize observation of the dog's behavior.
    6. **Create Progress Checklists:** Develop simple yes/no or rating scales to track the dog's progress. This helps the owner see improvement and identify areas where the dog is struggling. Examples: "Dog remained calm," "Dog took treats," "Dog barked/lunged."
    7. **Incorporate Evaluation Criteria Throughout:**
        - **Clarity:** Use simple language, avoid jargon.
        - **Feasibility:** Recommend short sessions, use common household items (treats, leash).
        - **Progressiveness:** Ensure a logical flow from easier to harder tasks.
        - **Effectiveness:** Align exercises with established positive reinforcement and desensitization principles.
        - **Empathy:** Use encouraging language, acknowledge the challenges, and emphasize patience. Include warnings about setbacks and the importance of positive experiences.
    8. **Refine and Review:** After drafting the plan, review each day to ensure:
        - The goal is clear.
        - The instructions are easy to follow.
        - The checklist accurately measures progress.
        - The day's activities fit within the overall weekly and 4-week plan.
        - The tone is positive and supportive.
    9. **Add Important Considerations:** Include crucial caveats and advice:
        - Consult a professional.
        - Safety precautions.
        - Signs of stress.
        - Celebrate successes.
        - Consistency is key.
    
    **Self-Correction Example during the Process:**
    
    - **Initial Thought:** Maybe start with direct exposure to strangers in Week 1.
    - **Correction:** This would likely be too overwhelming for a reactive dog. It violates the principle of gradual exposure. Better to start with foundational obedience and introduce triggers at a significant distance in Week 2.
    - **Revised Approach:** Week 1 focuses on basic commands and creating a positive association with training. Week 2 introduces distance-based trigger work.
    
    By following this structured approach and continually evaluating against the request's criteria, a comprehensive and effective training plan for a reactive dog can be developed. -->
    

Check it out! This thinking process is actually a perfect example of how our brains bounce between coming up with ideas and checking if they're any good. Like, there's this awesome moment where they think "hey, maybe let's throw the dog right into meeting strangers" but then the evaluation part of their brain kicks in with "whoa, hold up, that's way too intense for a scared pup." The whole thing is basically a dance between brainstorming cool training ideas and then reality-checking them against what actually works for reactive dogs and their humans - it's like having an excited idea machine and a practical bouncer working together in your head to build something that actually makes sense.

The parallel between AI workflow architectures and the evolution of microservices hints at a deeper pattern in software engineering - we repeatedly solve the problem of complexity by breaking it down into smaller, specialized components that communicate in structured ways. Additionally, as models like OpenAI's o1 (or even o3) become more sophisticated at multi-step reasoning, we may see a shift back toward unified systems. This raises an interesting question: Is the current trend toward complex workflow architectures a permanent evolution in AI system design, or just a temporary solution until single models become capable enough to handle these tasks autonomously? The answer could fundamentally reshape how we build AI systems in the coming years.