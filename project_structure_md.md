# Project Structure Reference

This document outlines the project structure for a portfolio website with a built-in Admin CMS, using a JSON file as a lightweight database.

## Folder Structure

```
PROJECT_ROOT/
├── admin/                  # CMS Interface
│   ├── index.html          # Admin dashboard/editor
│   ├── auth.html           # Login page
│   └── config.yml          # CMS configuration (if used)
│
├── static/                 # Static Assets & Data
│   ├── portfolio.json      # The "Database" (content.json)
│   ├── images/             # Project images
│   └── ...
│
├── server.js               # Node.js Express Server
├── index.html              # Main Portfolio Website
├── styles.css              # Main Styles
└── script.js               # Main Frontend Logic
```

## Key Components

### 1. Admin CMS (`/admin`)
- Contains the user interface for editing content.
- `index.html`: The main editor interface where you can modify texts, images, and projects.
- `auth.html`: Simple authentication entry point.

### 2. Content Database (`/static/portfolio.json`)
- This file acts as the database (`content.json`).
- Stores all dynamic content (e.g., profile info, projects list, skills).
- The main website fetches this file to display content.
- The Admin CMS reads from and writes to this file via the server.

### 3. Backend Server (`server.js`)
- A simple Node.js/Express server.
- **Purpose:**
  - Serves the static files (website and admin).
  - **API:** Provides endpoints to Read and Save `portfolio.json`.
  - Handles file system operations (reading/writing the JSON file).

## Workflow

1. **Frontend (Public Site):** Fetches `static/portfolio.json` on load and renders the content.
2. **Admin Panel:**
   - Fetches `static/portfolio.json` to populate form fields.
   - Sends updated JSON data to the `server.js` API (`/api/save-portfolio`).
3. **Server:**
   - Receives data from Admin.
   - Creates a backup of the old `portfolio.json`.
   - Overwrites `portfolio.json` with new data.

## Template for New Projects

When asking an AI to scaffold a similar project, you can use this prompt:

> "Create a web project structure with a lightweight CMS.
> 1. `admin/` folder: For the content editor interface.
> 2. `content.json` (or `data.json`): To store all website text and data.
> 3. Folder Structure: Keep it simple with `static/` for assets.
> 4. Backend: A simple Node.js script to handle saving the JSON file from the admin panel. Ensure the main site reads from the JSON file dynamically."

---

## Notes

- This structure is ideal for small to medium-sized projects where a full database is not necessary.
- The JSON file approach provides simplicity and portability.
- Easy to version control and deploy to static hosting platforms with a simple backend.
- Suitable for portfolios, small business sites, and personal projects.