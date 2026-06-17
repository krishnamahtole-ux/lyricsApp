# Lyrics Admin App

Minimal Next.js app providing a public lyrics browser and an admin panel.

Live demo

- https://lyrics-app-amber.vercel.app/

Quick start

1. Install dependencies:

```powershell
cd lyrics-admin-app
npm install
```

2. Run in development:

```powershell
npm run dev
```

3. Open http://localhost:3000 for public view and http://localhost:3000/admin for admin.

Admin credentials

- Default admin password: `admin` (set `ADMIN_PASSWORD` env var to change).

Notes

- The app stores lyrics in `data/lyrics.json`.
- Sessions are in-memory and will reset when the server restarts.

Deployment

1) Push to GitHub

- Create a new public repository on GitHub and push this project. Example using the GitHub CLI:

```bash
gh repo create your-username/lyrics-admin-app --public --source=. --remote=origin --push
```

- Or manually create a repo on GitHub, then run:

```bash
git remote add origin https://github.com/your-username/lyrics-admin-app.git
git branch -M main
git push -u origin main
```

2) Deploy to Vercel (recommended for Next.js)

- Connect your GitHub repository in the Vercel dashboard and import the project. Vercel will detect Next.js and handle builds automatically.
- Or use the Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

Environment variables

- Set `ADMIN_PASSWORD` (recommended) in Vercel or your host environment to change the default admin password.

Notes

- If you prefer Netlify or GitHub Pages, you can deploy a built static export, but Vercel offers the smoothest Next.js integration.
