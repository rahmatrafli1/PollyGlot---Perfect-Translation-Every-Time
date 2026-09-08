# 🦜 PollyGlot - Perfect Translation Every Time

A text translation app powered by the OpenAI API with a responsive design (mobile, tablet, desktop).

## Features

- Translate text into French 🇫🇷, Spanish 🇪🇸, or Japanese 🇯🇵
- Uses OpenAI GPT model
- Error handling
- Responsive layout (mobile, tablet, desktop)
- API key hidden on the server (not exposed to the client)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env`:

   ```bash
   copy .env.example .env
   ```

3. Fill in your `OPENAI_API_KEY` in the `.env` file:

   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
   ```

4. Run the server:

   ```bash
   npm start
   ```

5. Open your browser at `http://localhost:3002`

## Project Structure

```
PollyGlot/
├── assets/
├── index.html
├── index.css
├── index.js
├── server.js
├── package.json
├── .env.example
└── .gitignore
```

### File Overview

| File/Folder    | Description                                             |
| -------------- | ------------------------------------------------------- |
| `index.html`   | Page structure (input view & result view)               |
| `index.css`    | Responsive styling (mobile, tablet, desktop)            |
| `index.js`     | Frontend logic (fetch API, switch view, error handling) |
| `assets/`      | Stores images/logos used in the app (optional)          |
| `server.js`    | Express backend, handles requests to the OpenAI API     |
| `.env.example` | Environment variable template                           |
| `package.json` | List of dependencies & npm scripts                      |

## Technology

- Node.js + Express (backend, keeps the API key hidden)
- OpenAI API (model: `gpt-5-nano`)
- Vanilla HTML/CSS/JS (responsive frontend)
