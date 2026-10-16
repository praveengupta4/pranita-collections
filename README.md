# Pranita Collections

A simple static website for the Pranita Collections Indian dress boutique. No build step — open `index.html` locally or host on GitHub Pages.

## Local preview

Open `index.html` in a browser, or from this folder run:

```bash
npx --yes serve .
```

Then visit the URL shown in the terminal.

## Edit content

All store content lives in [`js/catalog.js`](js/catalog.js).

### Contact

```js
contact: {
  name: "Vinita Garg",
  phone: "(555) 000-0000",
},
```

### Sale announcement

Set `active: true` to show the sale in two places: a framed card on the landing page (between the logo and the categories) and a popup when someone opens the catalog. Set `active: false` to hide both — the landing page closes the gap automatically.

```js
sale: {
  active: false,
  title: "Seasonal Sale",
  message: "Enjoy special pricing on select pieces. Contact us for details.",
},
```

Dismissing the popup remembers the choice for the browser session only.

### Add a category

Append to the `categories` array. The landing page and sidebar update automatically.

```js
{ id: "dupattas", label: "Dupattas" },
```

Use a short lowercase `id` with no spaces. Then add items with matching `categoryId`.

### Add a product

1. Drop the image into the matching folder under `assets/products/` (for example `assets/products/sarees/my-saree.jpg`).
2. Add an entry to `items`:

```js
{
  id: "saree-4",
  categoryId: "sarees",
  name: "My New Saree",
  image: "assets/products/sarees/my-saree.jpg",
},
```

Leave `image: ""` to show a “photo coming soon” placeholder. Prices are not shown on the site.

## GitHub Pages

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Select `main` (or `master`) and the `/ (root)` folder, then save.

The site will be available at `https://<username>.github.io/<repo-name>/`.

A `.nojekyll` file is included so GitHub Pages serves assets as-is.
