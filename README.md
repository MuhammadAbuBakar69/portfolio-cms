# Portfolio CMS Starter (Vite + React)

An editable personal portfolio website with built-in Content Management System (CMS) admin mode.

## Features
- **CMS Admin Mode Switch**: Toggle between Edit Mode (Admin panel) and Live Portfolio Preview mode.
- **Editable Hero Section**: Live updates for name, title, bio, email, photo URL, and social links.
- **Project CRUD Operations**: Add, edit, and delete featured portfolio projects with tech stack tags and demo links.
- **LocalStorage Persistence**: Portfolio content and projects persist automatically across page reloads.
- **Clean Aesthetic**: Modern typography and card layouts for developer portfolios.

## Project Structure
- `portfolio-cms_App.jsx`: Main React component managing profile & project state, CMS forms, and preview renderer.
- `portfolio-cms_App.css`: Modern stylesheet for both admin panel and public portfolio layout.

## How to Run in Vite React App
1. Place `portfolio-cms_App.jsx` and `portfolio-cms_App.css` into your Vite project's `src` folder.
2. Import `portfolio-cms_App.jsx` into `main.jsx` or `App.jsx`.
3. Run `npm run dev`.
