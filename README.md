# Web Design Encyclopedia

Interactive React and Vite demo exploring multiple landing-page design directions for a fictional Nexus Corp product.

## Run locally

```bash
npm install
npm run dev
```

To preview a production build locally:

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

This repo includes a GitHub Actions workflow that builds the site and deploys `dist/` to GitHub Pages whenever changes are pushed to the `main` branch.

Local development keeps using the normal root path. During GitHub Actions builds, Vite automatically switches its base path to the repository name so the site works correctly on Pages.
