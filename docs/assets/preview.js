"use strict";
/* Static GitHub Pages showcase. Data mirrors the repository's demo catalog. No backend or payment calls. */
const catalog=[
  {id:"laptop",name:"ARC Studio 14",category:"Laptop",price:28990000,stock:14,specs:"32GB RAM · 1TB SSD · 14-inch",art:"laptop"},
  {id:"desktop",name:"Vector Pro Desktop",category:"Desktop",price:36990000,stock:9,specs:"8-core · 32GB RAM · 1TB SSD",art:"desktop"},
  {id:"phone",name:"Nova Phone X",category:"Điện thoại",price:18990000,stock:18,specs:"6.7-inch OLED · 256GB · 5G",art:"phone"},
  {id:"headset",name:"Pulse Wireless",category:"Phụ kiện",price:2490000,stock:29,specs:"Bluetooth · ANC · USB-C",art:"headset"},
  {id:"keyboard",name:"Orbit Mechanical 75",category:"Phụ kiện",price:3290000,stock:20,specs:"75% layout · Wireless",art:"keyboard"},
  {id:"gpu",name:"Core Graphics XT",category:"Linh kiện",price:15990000,stock:7,specs:"16GB VRAM · PCIe",art:"gpu"}
];
const byId=new Map(catalog.map(p=>[p.id,p]));
const money=n=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(n);
const elem=(tag,className,text)=>{const e=document.createElement(tag);if(className)e.className=className;if(text!==undefined)e.textContent=text;return e};
const art=p=>{const e=elem("div","device-art "+p.art);e.setAttribute("role","img");e.setAttribute("aria-label","Hình thiết bị minh họa "+p.name);return e};
const selectors={grid:document.getElementById("productGrid"),results:document.getElementById("resultCount"),search:document.getElementById("searchInput"),sort:document.getElementById("sortProducts"),empty:document.getElementById("emptyResults"),cartCount:document.getElementById("cartCount"),status:document.getElementById("globalStatus")};
let activeCategory="Tất cả";
let selectedProduct=null;
const cartKey="hyu-pages-preview-cart";
function loadCart(){try{const raw=JSON.parse(localStorage.getItem(cartKey)||"{}");if(!raw||typeof raw!=="object"||Array.isArray(raw))return {};const good={};for(const [id,quantity] of Object.entries(raw)){if(byId.has(id)&&Number.isInteger(quantity)&&quantity>0&&quantity<=20)good[id]=quantity;}return good}catch{return {}}}
let cart=loadCart();
function persist(){try{localStorage.setItem(cartKey,JSON.stringify(cart))}catch{}refreshCartCount()}
function refreshCartCount(){selectors.cartCount.textContent=String(Object.values(cart).reduce((sum,quantity)=>sum+quantity,0))}
function announce(message){selectors.status.textContent=message}
function addToCart(id){if(!byId.has(id))return;cart[id]=Math.min(20,(cart[id]||0)+1);persist();announce("Đã thêm "+byId.get(id).name+" vào giỏ demo.")}
function renderProducts(){
  const q=selectors.search.value.trim().toLocaleLowerCase("vi");
  let rows=catalog.filter(p=>(activeCategory==="Tất cả"||p.category===activeCategory)&&(!q||(p.name+" "+p.category+" "+p.specs).toLocaleLowerCase("vi").includes(q)));
  const sort=selectors.sort.value;if(sort==="asc")rows.sort((a,b)=>a.price-b.price);if(sort==="desc")rows.sort((a,b)=>b.price-a.price);
  selectors.grid.replaceChildren();
  for(const p of rows){
    const card=elem("article","product-card");
    const media=elem("button","product-image");media.type="button";media.setAttribute("aria-label","Xem chi tiết "+p.name);
    media.append(elem("span","image-badge","DEMO / "+p.category.toUpperCase()),art(p));media.addEventListener("click",()=>showProduct(p.id));
    const content=elem("div","product-content");content.append(elem("span","product-category","HYU SELECT / "+p.category.toUpperCase()));
    const title=elem("h3","product-name");const open=elem("button","product-title-button",p.name);open.type="button";open.style.cssText="border:0;background:none;text-align:left;padding:0;color:inherit;font:inherit;font-weight:inherit;cursor:pointer";open.addEventListener("click",()=>showProduct(p.id));title.append(open);
    content.append(title,elem("p","product-specs",p.specs),elem("div","product-price",money(p.price)));
    const footer=elem("div","product-actions");footer.append(elem("span","stock","Kho demo: "+p.stock));const add=elem("button","card-add","+ Thêm vào giỏ");add.type="button";add.setAttribute("aria-label","Thêm "+p.name+" vào giỏ demo");add.addEventListener("click",()=>addToCart(p.id));footer.append(add);content.append(footer);card.append(media,content);selectors.grid.append(card);
  }
  selectors.empty.hidden=rows.length>0;
  selectors.results.textContent=String(rows.length).padStart(2,"0")+" DEVICES / PREVIEW";
}
function setCategory(name){
  activeCategory=name;
  /* Sidebar and commercial banner shortcuts share the same catalog filtering state. */
document.querySelectorAll("[data-market-filter]").forEach(control=>control.addEventListener("click",event=>{
  if(control.tagName==="A")event.preventDefault();
  const category=control.getAttribute("data-market-filter");
  if(!category)return;
  selectors.search.value="";
  setCategory(category);
  document.getElementById("catalog").scrollIntoView({behavior:"smooth"});
}));
document.querySelectorAll(".filter-chip").forEach(button=>{const active=button.dataset.filter===name;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active))});
  renderProducts();
}
function showProduct(id){
 const p=byId.get(id);if(!p)return;selectedProduct=p.id;
 const media=document.getElementById("detailMedia");media.replaceChildren(art(p));
 document.getElementById("detailCategory").textContent=p.category.toUpperCase()+" / DEMONSTRATION";
 document.getElementById("detailTitle").textContent=p.name;
 document.getElementById("detailSpecs").textContent=p.specs;
 document.getElementById("detailPrice").textContent=money(p.price);
 document.getElementById("productDialog").showModal();
}
function cartChange(id,delta){const next=(cart[id]||0)+delta;if(next<=0)delete cart[id];else cart[id]=Math.min(20,next);persist();renderCart();}
function renderCart(){
 const list=document.getElementById("cartItems");list.replaceChildren();let total=0;
 const entries=Object.entries(cart);
 if(!entries.length){list.append(elem("div","cart-empty","Chưa có sản phẩm nào. Hãy khám phá danh mục và thêm thiết bị vào giỏ demo."));}
 for(const[id,quantity]of entries){
   const p=byId.get(id);if(!p)continue;total+=p.price*quantity;
   const row=elem("div","cart-entry");const thumb=elem("div","cart-thumb");thumb.append(art(p));const detail=elem("div");detail.append(elem("strong","",p.name),elem("p","",money(p.price)));
   const q=elem("div","quantity");
   const minus=elem("button","", "−");minus.type="button";minus.setAttribute("aria-label","Giảm số lượng "+p.name);minus.addEventListener("click",()=>cartChange(id,-1));
   const plus=elem("button","","+");plus.type="button";plus.setAttribute("aria-label","Tăng số lượng "+p.name);plus.disabled=quantity>=20;plus.addEventListener("click",()=>cartChange(id,1));
   q.append(minus,elem("span","",String(quantity)),plus);detail.append(q);row.append(thumb,detail);list.append(row);
 }
 document.getElementById("cartTotal").textContent=money(total);
 document.getElementById("demoCheckout").disabled=entries.length===0;
}
document.querySelectorAll(".filter-chip").forEach(button=>button.addEventListener("click",()=>setCategory(button.dataset.filter)));
document.querySelectorAll(".category-tile").forEach(button=>button.addEventListener("click",()=>{setCategory(button.dataset.filter);document.getElementById("catalog").scrollIntoView({behavior:"smooth"})}));
selectors.search.addEventListener("input",renderProducts);selectors.sort.addEventListener("change",renderProducts);
document.getElementById("searchForm").addEventListener("submit",event=>{event.preventDefault();document.getElementById("catalog").scrollIntoView({behavior:"smooth"})});
document.getElementById("resetSearch").addEventListener("click",()=>{selectors.search.value="";selectors.sort.value="default";setCategory("Tất cả")});
document.getElementById("openCart").addEventListener("click",()=>{renderCart();document.getElementById("cartDialog").showModal()});
document.querySelectorAll("[data-close]").forEach(button=>button.addEventListener("click",()=>document.getElementById(button.dataset.close).close()));
document.getElementById("detailAdd").addEventListener("click",()=>{if(selectedProduct)addToCart(selectedProduct);document.getElementById("productDialog").close()});
document.getElementById("demoCheckout").addEventListener("click",()=>{const notice=document.getElementById("checkoutNotice");notice.textContent="Đây chỉ là bản preview trên GitHub Pages. Checkout cần Next.js và SQLite local, nên không có đơn hàng hoặc thanh toán được tạo ở đây.";notice.style.color="#365d20";announce(notice.textContent)});
for(const dialog of document.querySelectorAll("dialog"))dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
refreshCartCount();renderProducts();
