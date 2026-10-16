"use client";import{createContext,useContext,useMemo,useState,useSyncExternalStore}from"react";import Link from"next/link";import{useRouter}from"next/navigation";import type{Product}from"@/lib/catalog";
type Item={id:string;quantity:number};const C=createContext<{items:Item[];add:(id:string)=>void;change:(id:string,amount:number)=>void;clear:()=>void}|null>(null);
const getCartSnapshot=()=>{try{return localStorage.getItem("hyu-cart")||"[]"}catch{return "[]"}};
const getServerCartSnapshot=()=> "[]";
const subscribeCart=(notify:()=>void)=>{
  const onStorage=(event:StorageEvent)=>{if(event.key==="hyu-cart")notify()};
  window.addEventListener("storage",onStorage);
  window.addEventListener("hyu:cart-updated",notify);
  return ()=>{window.removeEventListener("storage",onStorage);window.removeEventListener("hyu:cart-updated",notify)};
};
function readCart(raw:string):Item[]{try{
  const parsed:unknown=JSON.parse(raw);
  if(!Array.isArray(parsed))return [];
  return parsed.filter((item):item is Item=>item!==null&&typeof item==="object"&&
    typeof item.id==="string"&&item.id.length>0&&Number.isSafeInteger(item.quantity)&&item.quantity>0&&item.quantity<=20).slice(0,30);
}catch{return []}}
function writeCart(items:Item[]){try{localStorage.setItem("hyu-cart",JSON.stringify(items));window.dispatchEvent(new Event("hyu:cart-updated"))}catch{/* private browsing or disabled storage */}}
export function StoreProvider({children}:{children:React.ReactNode}){
  const snapshot=useSyncExternalStore(subscribeCart,getCartSnapshot,getServerCartSnapshot);
  const items=useMemo(()=>readCart(snapshot),[snapshot]);
  const add=(id:string)=>{const existing=readCart(getCartSnapshot());if(existing.some(i=>i.id===id)){writeCart(existing.map(i=>i.id===id?{...i,quantity:Math.min(20,i.quantity+1)}:i))}else if(existing.length<30){writeCart([...existing,{id,quantity:1}])}};
  const change=(id:string,amount:number)=>writeCart(readCart(getCartSnapshot()).map(i=>i.id===id?{...i,quantity:Math.max(0,Math.min(20,i.quantity+amount))}:i).filter(i=>i.quantity>0));
  return <C.Provider value={{items,add,change,clear:()=>writeCart([])}}>{children}</C.Provider>;
}
export function useStore(){const c=useContext(C);if(!c)throw Error("Store provider missing");return c;}
export function Nav(){
  const router=useRouter();const[q,setQ]=useState("");const{items}=useStore();
  const cartCount=items.reduce((total,item)=>total+item.quantity,0);
  return <header className="header market-header">
    <div className="market-utility"><div className="wrap market-utility-inner"><span>HYU INDUSTRIES · TECHNOLOGY STORE</span><nav aria-label="Liên kết trợ giúp"><Link href="/products">Hướng dẫn khám phá</Link><Link href="/cart">Giỏ hàng demo</Link><span>Bản thử nghiệm</span></nav></div></div>
    <div className="wrap market-masthead">
      <Link className="brand market-brand" href="/" aria-label="HYU Industries trang chủ">HYU<span>.</span><small>TECH DEVICE</small></Link>
      <form className="market-search" role="search" onSubmit={e=>{e.preventDefault();router.push("/products?q="+encodeURIComponent(q))}}>
        <label className="market-search-label" htmlFor="hyu-search">Tìm thiết bị</label>
        <input id="hyu-search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Bạn đang tìm laptop, PC hay phụ kiện gì?" type="search"/>
        <button type="submit" aria-label="Tìm kiếm sản phẩm">⌕ <span>Tìm kiếm</span></button>
      </form>
      <Link className="market-header-shortcut" href="/products"><span aria-hidden="true" className="market-head-symbol">▦</span><span><strong>Danh mục</strong><small>Khám phá sản phẩm</small></span></Link>
      <Link className="market-header-shortcut" href="/cart"><span aria-hidden="true" className="market-head-symbol">▢</span><span><strong>Giỏ hàng ({cartCount})</strong><small>Đơn hàng demo</small></span></Link>
    </div>
    <nav className="market-subnav" aria-label="Lối tắt cửa hàng"><div className="wrap market-subnav-inner">
      <Link href="/products" className="market-menu-button"><span aria-hidden="true">☷</span> DANH MỤC SẢN PHẨM</Link>
      <Link href="/products">Tất cả sản phẩm</Link>
      <Link href="/products?category=Laptop">Laptop</Link>
      <Link href="/products?category=Desktop">PC & Desktop</Link>
      <Link href="/products?category=%C4%90i%E1%BB%87n%20tho%E1%BA%A1i">Điện thoại</Link>
      <Link href="/products?category=Ph%E1%BB%A5%20ki%E1%BB%87n">Phụ kiện</Link>
      <Link href="/products?category=Linh%20ki%E1%BB%87n">Linh kiện</Link>
      <span className="market-subnav-status">● PREVIEW</span>
    </div></nav>
  </header>;
}
export function Art({name}:{name:string}){return <div className={"device "+name} role="img" aria-label={"Minh họa demo "+name}/>}
export function Add({id}:{id:string}){const{add}=useStore();return <button className="btn" onClick={()=>add(id)}>+ Thêm vào giỏ</button>}
export function Card({p}:{p:Product}){return <article className="card"><Link href={"/products/"+p.slug} className="media"><Art name={p.art}/></Link><div className="card-body"><span className="tag">DEMO / {p.category.toUpperCase()}</span><Link href={"/products/"+p.slug}><h3>{p.name}</h3></Link><p className="specs">{p.specs}</p><div className="price">{new Intl.NumberFormat("vi-VN").format(p.price)} ₫</div><div className="product-footer"><small className="muted">Kho demo: {p.stock}</small><Add id={p.id}/></div></div></article>}
