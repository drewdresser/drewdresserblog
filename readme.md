# Drew Dresser's Blog

A personal blog built with Hugo, TailwindCSS, and AWS Amplify. Features a clean, responsive design with support for blog posts and "blogmarks" (annotated links).

## Features

- Responsive design using TailwindCSS
- Two content types:
  - Traditional blog posts
  - Blogmarks (annotated external links)
- Tag-based categorization
- Analytics integration with PostHog
- AWS Amplify hosting with WAF protection
- Automatic dark/light mode support
- Markdown content with code syntax highlighting

## Tech Stack

- **Static Site Generator**: Hugo
- **CSS Framework**: TailwindCSS with Typography plugin
- **Hosting**: AWS Amplify
- **Analytics**: PostHog
- **Build Tools**: Node.js, PostCSS

## Local Development
`npm install`
`hugo server`

## Content Structure

- `content/posts/` - Blog posts
- `content/blogmarks/` - External link annotations
- `layouts/` - Hugo templates
- `assets/` - CSS and other assets

## Creating Content

### New Blog Post
`hugo new posts/my-post-name/index.md`

## Configuration Files

- `hugo.toml` - Main Hugo configuration
- `assets/css/tailwind.config.js` - TailwindCSS configuration
- `assets/css/postcss.config.js` - PostCSS configuration
- `amplify.yml` - AWS Amplify build configuration
