+++
date = '2024-12-27T10:48:31-05:00'
draft = false
title = 'AWS Amplify and WAF'
tags = ['aws', 'amplify', 'waf', 'til']
+++
TIL that AWS Amplify added integration with AWS WAF. 
{{< figure src="image.png" alt="Amplify Console" >}}
As I was setting up this blog, I stumpled across a new feature that AWS Amplify added. It [looks like this came out](https://aws.amazon.com/blogs/mobile/aws-amplify-hosting-adds-web-application-firewall-protection-public-preview/) just a couple of days ago, and is in public preview. I'm excited about this because it can do IP Blocking which you previously had to implement manually OR just use a username/password but expose the app to the public internet.