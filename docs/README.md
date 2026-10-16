# HYU Industries — GitHub Pages static preview
This directory contains a **standalone, static product showcase** for GitHub Pages, not a deployment of the Next.js application.

## Enable GitHub Pages
1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Set branch **main**, folder **/docs**, click **Save**.
4. Visit https://hyu276.github.io/HyuIndustriesTechDevice/ after GitHub reports the page is published.

All product names/prices/specs/inventory are **illustrative**. The cart is only stored in localStorage in the visitor's own browser. No auth, real inventory updates, checkout, payment, customer records or shipping occurs.

To modify the demo catalog, update both \`src/lib/catalog.ts\` (Next.js local application) and \`docs/assets/preview.js\` (static showcase) until an automated export strategy replaces the duplication.

This preview is intentionally unindexed via the robots meta tag and is safe to publish without database credentials.
