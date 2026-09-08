# 🦜 PollyGlot - Perfect Translation Every Time

Aplikasi translasi teks menggunakan OpenAI API dengan tampilan responsive (mobile, tablet, desktop).

## Fitur

- Translate teks ke French 🇫🇷, Spanish 🇪🇸, atau Japanese 🇯🇵
- Menggunakan OpenAI GPT model
- Error handling
- Tampilan responsive (mobile, tablet, desktop)
- API key disembunyikan di server (tidak exposed ke client)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` menjadi `.env`:

   ```bash
   copy .env.example .env
   ```

3. Isi `OPENAI_API_KEY` di file `.env` dengan API key OpenAI Anda:

   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
   ```

4. Jalankan server:

   ```bash
   npm start
   ```

5. Buka browser ke `http://localhost:3002`

## Struktur Project

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

### Penjelasan File

| File/Folder    | Keterangan                                              |
| -------------- | ------------------------------------------------------- |
| `index.html`   | Struktur halaman (input view & result view)             |
| `index.css`    | Styling responsive (mobile, tablet, desktop)            |
| `index.js`     | Logic frontend (fetch API, switch view, error handling) |
| `assets/`      | Menyimpan gambar/logo yang digunakan (opsional)         |
| `server.js`    | Backend Express, menangani request ke OpenAI API        |
| `.env.example` | Template environment variable                           |
| `package.json` | Daftar dependencies & script npm                        |

## Teknologi

- Node.js + Express (backend, menyembunyikan API key)
- OpenAI API (model: `gpt-5-nano`)
- Vanilla HTML/CSS/JS (frontend, responsive)
