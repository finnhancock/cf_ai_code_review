# AI Code Reviewer

Instant code reviews powered by Cloudflare Workers AI

## Overview

This is an AI-powered code review application built on Cloudflare's edge infrastructure. It uses the Llama 3.3 language model to analyze code and provide feedback on bugs, security issues, performance problems, and best practices.

## Features

- **Instant AI Reviews**: Get immediate feedback on your code
- **Security Analysis**: Identifies potential security vulnerabilities
- **Performance Tips**: Suggests optimizations and improvements
- **Best Practices**: Recommends industry-standard coding patterns
- **Edge Computing**: Runs on Cloudflare's global network for low latency

## Live Demo

🔗 **[Try it live](https://cf-ai-code-review.finnhancock1.workers.dev)**

## Tech Stack

- **Cloudflare Workers**: Serverless edge computing platform
- **Workers AI**: Cloudflare's AI inference service
- **Llama 3.3 70B**: Meta's large language model
- **HTML/CSS/JavaScript**: Frontend interface

## Architecture

1. **Frontend**: Simple HTML interface for code input
2. **Backend**: Cloudflare Worker handling API requests
3. **AI Integration**: Workers AI running Llama 3.3 for code analysis
4. **State Management**: In-memory processing (no database required)

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm
- Wrangler CLI

### Setup

1. Clone the repository:
```bash
git clone https://github.com/finnhancock/cf_ai_code_review.git
cd cf_ai_code_review
```

2. Install dependencies:
```bash
npm install -g wrangler
```

3. Login to Cloudflare:
```bash
wrangler login
```

4. Run locally:
```bash
npx wrangler dev
```

5. Open `http://localhost:8787` in your browser

## Deployment

Deploy to Cloudflare Workers:
```bash
npx wrangler deploy
```

## How It Works

1. User pastes code into the text area
2. Frontend sends code to `/review` API endpoint
3. Worker sends code + system prompt to Llama 3.3 via Workers AI
4. AI analyzes the code and returns feedback
5. Frontend displays the review to the user

## Project Structure
```
cf_ai_code_review/
├── worker.js           # Main Worker code with API and frontend
├── wrangler.toml       # Cloudflare configuration
├── package.json        # Node.js dependencies
├── PROMPTS.md          # AI prompts documentation
└── README.md           # This file
```

## Assignment Requirements

This project fulfills the Cloudflare AI app assignment requirements:

✅ **LLM**: Uses Llama 3.3 on Workers AI  
✅ **Workflow/Coordination**: Cloudflare Workers handles requests  
✅ **User Input**: Web-based text input interface  
✅ **Memory/State**: In-memory request processing  
✅ **Documentation**: README.md and PROMPTS.md included  

## License

This project was created as part of a Cloudflare internship application.