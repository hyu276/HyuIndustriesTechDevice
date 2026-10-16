import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=(p:string)=>readFileSync(p,"utf8");
test("Next storefront uses category-first commercial layout",()=>{
 const source=read("src/app/page.tsx");
 for(const marker of ["market-rail","market-main-banner","market-secondary","market-services","market-shortcut-grid","market-product-grid"]){
  assert.ok(source.includes(marker),"Missing storefront section: "+marker);
 }
});
test("GitHub Pages showcase contains accessible navigation and search",()=>{
 const html=read("docs/index.html");
 for(const marker of ['id="searchInput"','id="productGrid"','id="openCart"','id="cartCount"','id="catalog"','id="heroTitle"','class="market-sidebar"']){
  assert.ok(html.includes(marker),"Missing preview element: "+marker);
 }
 assert.equal((html.match(/<header\b/g)||[]).length,(html.match(/<\/header>/g)||[]).length);
 assert.equal((html.match(/<main\b/g)||[]).length,(html.match(/<\/main>/g)||[]).length);
});
test("Static promo controls are wired to existing category filtering",()=>{
 const js=read("docs/assets/preview.js");
 assert.match(js,/\[data-market-filter\]/);
 assert.match(js,/setCategory\(category\)/);
});
