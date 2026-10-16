# HYU Technologies — Design Contract

## Product positioning
A technology commerce interface for Vietnam. Structure: **catalog-first marketplace** (Operate + Persuade), not a sparse editorial landing page.

## Reference study
User-supplied saved HTML: *Divine Shop - Phần mềm bản quyền.html*.

Confirmed from the HTML snapshot:
- A slim utility area with support/promotional links;
- A search-centric header with identity/account and cart affordances;
- Shortcuts to viewed, popular, and promotional product destinations;
- A visible "Danh mục sản phẩm" menu and navigation links;
- A list of icon-led topical categories next to a multi-image promotional banner area.

**Source limitation:** The saved HTML only retained the first visible part of the page (header, category/navigation and a banner group); this is not a complete snapshot of all sections, functionality, or mobile views. Further sections below the opening commerce grid are HYU's original extensions, not a claim about the reference.

## Adaptation rules
- Strong structural inspiration: three-layer header, prominent search/cart, left category rail, asymmetric main-banner/promo-banner area, feature strip, dense cards and prominent catalog filters.
- Preserve HYU-specific branding, messaging and independently drawn CSS product illustrations. Do not reuse Divine Shop name, trademarks, artwork, photographs, marketing copy, code or embedded assets.
- Avoid false claims (discounts, reviews, sales volumes, official product warranties). All prices/specs/inventory are clearly **DEMO**.
- Next.js / SQLite checkout stays local; GitHub Pages remains a static-only functional preview (browser-local cart).
- Keep navigation reachable on small screens with horizontally scrolling quick links; mobile hero and product grid adapt without horizontal page overflow.

## Tokens
- ink: #151717 / #17201b
- paper: #f6f7f5
- light catalog: #eaf0e8
- signal chartreuse: #ccff5f
- warm secondary promo: #e9ded1
- stroke: #dfe4de; muted #69706e
- Typography: Arial/system sans with restrained heavy headings and clear monetary numerals.
- Touch targets: at least 44px where practical; keyboard focus visible, interactive semantics, and motion reduction supported.

## Frontend sources
- Next.js header: \`src/components/store.tsx\` (Nav)
- Next.js storefront: \`src/app/page.tsx\`
- Next.js styles: \`src/app/globals.css\`
- GitHub Pages showcase: \`docs/index.html\`, \`docs/assets/style.css\`, \`docs/assets/preview.js\`

## Follow-up (out of scope)
Once authentic photography, SKUs, offers, inventory and customer trust policies are available, replace CSS device art with licensed product imagery and structured variants without changing the current navigation or information hierarchy.
