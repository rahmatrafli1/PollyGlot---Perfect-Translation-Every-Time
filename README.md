# 🦜 PollyGlot - Perfect Translation Every Time

A text translation app powered by the OpenAI API with a responsive design (mobile, tablet, desktop).

## Features

- Translate text into French 🇫🇷, Spanish 🇪🇸, or Japanese 🇯🇵
- Uses OpenAI GPT model
- Error handling
- Responsive layout (mobile, tablet, desktop)
- API key hidden on the server (not exposed to the client)
- Deployable via Node/Express server **or** Netlify Serverless Functions

## Setup (Local Development)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env`:

   ```bash
   copy .env.example .env
   ```

3. Fill in your environment variables in the `.env` file:

   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
   AI_MODEL=gpt-5-nano
   PORT=3002
   BASE_URL=your-base-url
   URL=http://localhost
   ```

4. Run the app in development mode (server + Vite client concurrently):

   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`

## Deployment Options

### Option A: Node.js + Apache (with mkcert SSL)

1. Build the frontend:

   ```bash
   npm run build
   ```

2. Configure Apache as a reverse proxy to the Node server and Vite dev server, using mkcert-generated SSL certificates.
3. Start the backend:

   ```bash
   npm start
   ```

See project deployment notes for full Apache VirtualHost configuration.

### Option B: Netlify (Serverless)

1. Ensure `netlify.toml` and `netlify/functions/translate.js` are present.
2. Set environment variables (`OPENAI_API_KEY`, `AI_MODEL`) in the Netlify Dashboard.
3. Test locally with Netlify CLI:

   ```bash
   npx netlify-cli dev
   ```

4. Deploy:

   ```bash
   npx netlify-cli deploy --prod
   ```

## Project Structure

```
PollyGlot/
├── assets/
├── netlify/
│   └── functions/
│       └── translate.js
├── index.html
├── index.css
├── index.js
├── server.js
├── vite.config.js
├── netlify.toml
├── package.json
├── .env.example
└── .gitignore
```

### File Overview

| File/Folder                      | Description                                                     |
| -------------------------------- | --------------------------------------------------------------- |
| `index.html`                     | Page structure (input view & result view)                       |
| `index.css`                      | Responsive styling (mobile, tablet, desktop)                    |
| `index.js`                       | Frontend logic (fetch API, switch view, error handling)         |
| `assets/`                        | Stores images/logos used in the app (optional)                  |
| `server.js`                      | Express backend for local dev / Apache deployment               |
| `netlify/functions/translate.js` | Serverless function version of the translate endpoint (Netlify) |
| `vite.config.js`                 | Vite dev server config (proxy, HMR, allowed hosts)              |
| `netlify.toml`                   | Netlify build & redirect configuration                          |
| `.env.example`                   | Environment variable template                                   |
| `package.json`                   | List of dependencies & npm scripts                              |

## Technology

- Node.js + Express (backend for local/Apache deployment)
- Netlify Functions (serverless backend for Netlify deployment)
- OpenAI API (model: `gpt-5-nano`)
- Vite (dev server & build tool)
- Vanilla HTML/CSS/JS (responsive frontend)
