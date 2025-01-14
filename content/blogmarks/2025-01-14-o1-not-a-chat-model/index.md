+++
date = '2025-01-14T16:45:48-05:00'
draft = false
my_url = 'https://www.latent.space/p/o1-skill-issue'
slug = 'o1-not-a-chat-model'
tags = ['ai', 'llm', 'o1', 'llm-reasoning']
+++

There has been a lot of chat about the new reasoning models, and how they are not chat models. I completely agree, and want to add my voice to the chorus.

The focus of this is that an o1 prompt should look a lot different than your typical chat:

{{< figure src="image.png" alt="O1 Prompt Structure" >}}

Understanding this prompt anatomy is crucial because it fundamentally changes how organizations need to approach AI implementation. While the structure might make sense to technical users, rolling this out across an enterprise presents unique challenges. The shift from quick chat-style interactions to detailed, structured briefs impacts everything from user training to workflow design.

The enterprise challenge with o1 isn't just about adopting new tech - it's about fundamentally changing how people work with AI. While chat models let users dive in with quick questions and iterate, o1 demands what I'd call "front-loaded effort" - you need to dump ALL the context upfront and carefully frame what you want.
This creates an interesting tension for enterprise adoption:
On the upside, o1's report-style outputs actually align really well with enterprise needs. You get structured, thorough analysis that reads like a proper business document rather than a casual chat. Perfect for decision-making and documentation.
But here's the catch - teaching busy enterprise users to write these detailed briefs is tough. They're used to the quick back-and-forth of chat models or traditional tools. Now we're asking them to:

- Front-load all context (which means gathering it first)
- Clearly define outputs (no vague requests)
- Wait longer for responses (potentially 5+ minutes)

For enterprise rollouts, I think this means:

1. Training needs to shift from "how to chat with AI" to "how to brief AI"
2. Expectations around response times need resetting (not usually a big deal)
3. Best practices around context gathering need development

The real kicker? Just when enterprises were getting comfortable with chat-based AI, this paradigm shift forces another round of change management. It's like teaching someone a new language right after they got comfortable with the first one.

To make this work, enterprises might need dedicated "AI prompt engineers" - people who can bridge the gap between users and these more demanding but powerful models. Think of them as technical writers for the AI age. If not dedicated people, then companies could consider dedicated projects and engagements focused on bringing reasoning prompts to business users.

Additionally, it'd be helpful to start sharing the art of the possible for business users with reasoning models like o1. Let me share three practical examples where business users could leverage reasoning models effectively:

**Quarterly Report Analysis:** Instead of asking quick questions about numbers, dump the entire quarterly spreadsheet, previous reports, and industry context into the model and ask for a comprehensive analysis. The model can identify trends, flag concerns, and create executive summaries - all in one thorough shot. Much better than piecemeal analysis through chat.

**Meeting Summary & Action Plans:** Take a raw meeting transcript, add the project background, team structure, and goals, then ask the model to create a structured output with: key decisions, action items, risks identified, and next steps. The model's ability to process all this context at once means better synthesis than parsing piece by piece.

**Policy Compliance Review:** Perfect for legal or HR teams. Feed in your company policies, industry regulations, and a proposed new process or policy. The model can do a thorough gap analysis, identifying compliance risks and suggesting specific updates. Much more reliable than trying to check compliance point-by-point through chat. Plus, the model's formal report style matches the serious nature of compliance work.

**RFP Response Analysis:** For procurement or sales teams, dump in the entire RFP document, your company's past proposals, competitor intel, and pricing strategy. Ask for a detailed analysis of what sections need focus, suggested win themes, pricing recommendations, and potential red flags. The model's ability to process all this context at once helps create a cohesive strategy instead of answering one requirement at a time.

The key theme here? These aren't quick Q&A tasks - they're meaty problems where the user invests time upfront to get comprehensive, actionable insights in return. Think "weekly deep-dive" rather than "quick daily check."


Bottom line: Treat o1 like the powerful reasoning engine it is - with proper training and support - and it'll transform your business. Treat it like ChatGPT, and you will likely struggle with user frustration and 
poor results.
