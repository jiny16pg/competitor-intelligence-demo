# Competitor Intelligence Demo

A standalone public demo of a competitor intelligence workspace. It uses synthetic market data only and does not connect to any internal CI site, API, dataset, or deployment directory.

## Local development

```bash
npm install
npm run dev
```

The production build is generated in `dist` with:

```bash
npm run build
```

## Public deployment

The repository is configured for GitHub Pages through `.github/workflows/deploy.yml`. The Vite base path matches the repository name: `/competitor-intelligence-demo/`.

This demo includes:

- Signal room with synthetic category momentum and price pressure trends
- Rheology view for sensory and texture clusters
- Formula map for recurring ingredient groups
- Search and category filters
- Select up to three competitors for a side-by-side comparison
- Read-state controls for market alerts

## Data and privacy

All names, metrics, claims, pricing, and product references in the interface are fictional sample content for demonstration. No real company names, logos, product data, internal URLs, private files, or credentials are included.
