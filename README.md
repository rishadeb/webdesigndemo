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

Deploy the site with:

```bash
npm run deploy
```

This command builds the app with the GitHub Pages base path and publishes `dist/` to the `gh-pages` branch using the `gh-pages` package.

Local development keeps using the normal root path, so `npm run dev`, `npm run build`, and `npm run preview` continue to work as expected.
