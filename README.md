# CodeConnect – Entri App

React + Redux Toolkit + Monaco Editor, backed by JSON Server.

## Local setup

```bash
npm install
npm run server
npm run dev
```

Open the Vite URL shown in your terminal (usually http://localhost:5173). The API is http://localhost:3001.

## Features

Files/folders REST CRUD, collapsible tree, tabs and drag reordering, autosave, API-backed workspace/settings, Monaco highlighting, theme controls, global search, command palette, keyboard shortcuts, live preview, console capture, resizable panes.

Shortcuts: Ctrl+S save, Ctrl+P quick open, Ctrl+Shift+P command palette, Ctrl+W close tab, Ctrl+B sidebar.

## Deployment

Deploy the frontend to Vercel/Netlify. Deploy JSON Server or another compatible REST backend separately, and configure `VITE_API_URL` with the public API base URL **before building**. A localhost API is not accessible to remote visitors. JSON Server is a mock development backend; for real multi-user use, replace it with a persistent hosted API.

## Testing note

Perform end-to-end checks of folder nesting, file operations, settings reload, tabs restore, preview, and API hosting before submitting. Avoid storing private data in `db.json`.
