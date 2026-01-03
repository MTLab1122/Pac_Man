# Deployment Guide for GitHub Pages

## Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys your game to GitHub Pages whenever you push to the `main` branch.

### Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository: https://github.com/MTLab1122/Pac_Man
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push the updated code:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to the **Actions** tab in your repository
   - You should see a workflow running
   - Once it completes, your game will be live at: https://mtlab1122.github.io/Pac_Man/

## Manual Deployment

If you prefer to deploy manually:

1. **Build the static export:**
   ```bash
   npm run build
   ```

2. **The `out` folder will contain the static files**

3. **Push the `out` folder to the `gh-pages` branch:**
   ```bash
   git subtree push --prefix out origin gh-pages
   ```

   Or use the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   npx gh-pages -d out
   ```

## Troubleshooting

- If the game shows a blank page, check the browser console for errors
- Make sure the basePath in `next.config.js` matches your repository name (`/Pac_Man`)
- Clear your browser cache and try again

