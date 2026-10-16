# Source-informed layout study
The layout was redesigned from the user's supplied, saved Divine Shop HTML file, **not by copying its source**.

| Reference aspect visible in saved HTML | HYU implementation |
| --- | --- |
| Small informational top links | Slim utility bar with demo context |
| Search-led site header, account/cart affordances | Large central search, discover shortcut, local cart |
| Popular/promotional/viewed product navigation | Dedicated links to product categories, no fabricated traffic or discounts |
| "Danh mục sản phẩm" category entry | Left five-category rail and quick category bar |
| Icon-based topical entries | HYU laptop, desktop, mobile, component and accessory group links |
| Multi-image banner area | Independently authored CSS hero with two adjacent promotional cards |
| Beyond first visible fold not preserved in attachment | HYU-original benefit strip, category tiles and catalog grid |

The current static preview **does not** connect to the local SQLite backend, offer accounts, process real orders, or use any payment gateway. No external web calls or Divine Shop assets are needed.
