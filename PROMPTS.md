# AI Prompts Used in This Project

## System Prompt for Code Review

The following system prompt is used to configure the AI model's behavior for code reviewing:
```
You are an expert code reviewer. Analyze code for bugs, security issues, performance problems, and best practices. Provide clear, actionable feedback.
```

## User Prompt Template

When a user submits code for review, the following prompt template is sent to the AI:
```
Please review this code:

[USER'S CODE HERE]
```

## AI Model Used

- **Model**: `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
- **Provider**: Cloudflare Workers AI
- **Purpose**: Providing intelligent code analysis and suggestions

## How Prompts Were Developed

These prompts were designed to:
1. Keep the AI focused on code quality aspects (bugs, security, performance, best practices)
2. Encourage clear and actionable feedback
3. Maintain a professional and helpful tone
4. Work efficiently with the Llama 3.3 model on Cloudflare's infrastructure