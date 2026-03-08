export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS for all requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Serve HTML page on root
    if (url.pathname === '/' && request.method === 'GET') {
      return new Response(getHTML(), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Handle code review API
    if (url.pathname === '/review' && request.method === 'POST') {
      const { code } = await request.json();

      const messages = [
        {
          role: 'system',
          content: 'You are an expert code reviewer. Analyze code for bugs, security issues, performance problems, and best practices. Provide clear, actionable feedback.',
        },
        {
          role: 'user',
          content: `Please review this code:\n\n${code}`,
        },
      ];

      const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages,
      });

      return new Response(JSON.stringify({ review: response.response }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};

function getHTML() {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>AI Code Reviewer</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 32px;
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 16px;
    }
    textarea {
      width: 100%;
      min-height: 200px;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 14px;
      resize: vertical;
      margin-bottom: 20px;
    }
    textarea:focus {
      outline: none;
      border-color: #667eea;
    }
    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover { transform: translateY(-2px); }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    .result {
      margin-top: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      white-space: pre-wrap;
      font-size: 14px;
      line-height: 1.6;
      display: none;
    }
    .result.show { display: block; }
    .loading {
      text-align: center;
      color: #667eea;
      font-weight: 600;
      display: none;
    }
    .loading.show { display: block; }
  </style>
</head>
<body>
  <div class="container">
    <h1>&#129302; AI Code Reviewer</h1>
    <p class="subtitle">Powered by Cloudflare Workers AI</p>
    
    <textarea id="codeInput" placeholder="Paste your code here..."></textarea>
    <button onclick="reviewCode()" id="reviewBtn">Review Code</button>
    
    <div class="loading" id="loading">Analyzing code...</div>
    <div class="result" id="result"></div>
  </div>

  <script>
    async function reviewCode() {
      const code = document.getElementById('codeInput').value;
      if (!code.trim()) {
        alert('Please paste some code first!');
        return;
      }

      const btn = document.getElementById('reviewBtn');
      const loading = document.getElementById('loading');
      const result = document.getElementById('result');

      btn.disabled = true;
      loading.classList.add('show');
      result.classList.remove('show');

      try {
        const response = await fetch('/review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();
        result.textContent = data.review;
        result.classList.add('show');
      } catch (error) {
        result.textContent = 'Error: ' + error.message;
        result.classList.add('show');
      } finally {
        btn.disabled = false;
        loading.classList.remove('show');
      }
    }
  </script>
</body>
</html>
  `;
}