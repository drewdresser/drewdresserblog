+++
date = '2024-12-28T21:36:04-05:00'
draft = false
my_url = 'https://www.linkedin.com/blog/engineering/ai/practical-text-to-sql-for-data-analytics'
slug = 'Practical Text to SQL from LinkedIn'
tags = ['ai', 'data', 'sql']
+++
A great article on how to use LLMs to generate SQL queries from natural language. Albert Chen’s deep dive into LinkedIn’s SQL Bot offers a fascinating glimpse into the marriage of generative AI with enterprise-scale data analytics. This multi-agent system, integrated into LinkedIn’s DARWIN platform, exemplifies how cutting-edge AI can democratize access to data insights while enhancing efficiency across teams.

*Key Takeaways:*
Empowering Data Democratization: SQL Bot addresses a classic bottleneck: dependency on data teams for insights. By enabling non-technical users to autonomously query databases using natural language, LinkedIn has transformed a time-intensive process into a streamlined, scalable solution.

Data Cleaning and Annotation:
> we initiated a dataset certification effort to collect comprehensive descriptions for hundreds of important tables. Domain experts identified key tables within their areas and provided mandatory table descriptions and optional field descriptions. These descriptions were augmented with AI-generated annotations based on existing documentation and Slack discussions, further enhancing our ability to retrieve the right tables and use them properly in queries
- They infer the tables that a user cares about based on their org chart.
Metadata and Knowledge Graphs as Pillars:
- Comprehensive dataset certification, enriched with AI-generated annotations, ensures accurate table retrieval despite LinkedIn’s vast table inventory (in the millions!).
By combining domain knowledge, query logs, and example queries into a knowledge graph, SQL Bot builds a robust contextual foundation for query generation.
- LLM-Driven Iterative Query Refinement: Leveraging LangChain and LangGraph, the system iteratively plans and constructs SQL queries. Validators and self-correction agents ensure outputs are precise, efficient, and error-free, highlighting the sophistication of LinkedIn’s text-to-SQL pipeline.

Personalized and Guided User Experiences: With features like quick replies, rich display elements, and a guided query-writing process, SQL Bot prioritizes user understanding and engagement. Its integration with DARWIN, complete with saved chat history and custom instructions, amplifies its accessibility and adoption.

Benchmarking and Continuous Improvement: They have an emphasis on benchmarking. They use human evaluation alongside LLM-as-a-judge methods, so they've developed a scalable approach to query assessment and model enhancement.

*Reflections:*
Many text-to-SQL solutions stumble in handling many tables, LinkedIn’s SQL Bot thrives by leveraging metadata, personalized retrieval, and user-friendly design. It’s also impressive how the system respects permissions, ensuring data security without sacrificing convenience.

Moreover, the survey results—95% user satisfaction with query accuracy—highlight the system’s impact. This balance of technical innovation and user-centric design offers a blueprint for organizations looking to replicate LinkedIn’s success.

*Why It Matters:*
I think there are enough details in this article to either add new features to your existing text to sql bot, or to build your own. LinkedIn’s work on SQL Bot is a testament to the power of AI in reshaping how we interact with complex data systems. It’s an inspiring read for engineers, data scientists, and AI enthusiasts aiming to make SQL data more accessible.