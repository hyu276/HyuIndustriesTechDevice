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
export function Nav(){const router=useRouter();const[q,setQ]=useState("");const{items}=useStore();return <header className="header"><div className="wrap nav"><Link className="brand" href="/">HYU<span>.</span></Link><nav className="navlinks"><Link href="/products">Sản phẩm</Link><Link href="/products?category=Laptop">Laptop</Link><Link href="/products?category=Desktop">PC</Link><Link href="/products?category=Ph%E1%BB%A5%20ki%E1%BB%87n">Phụ kiện</Link></nav><form className="search" onSubmit={e=>{e.preventDefault();router.push("/products?q="+encodeURIComponent(q))}}><input aria-label="Tìm sản phẩm" placeholder="Tìm thiết bị..." value={q} onChange={e=>setQ(e.target.value)}/><button aria-label="Tìm">⌕</button></form><Link className="cartlink" href="/cart">Giỏ hàng ({items.reduce((s,i)=>s+i.quantity,0)})</Link></div></header>}
export function Art({name}:{name:string}){return <div className={"device "+name} role="img" aria-label={"Minh họa demo "+name}/>}
export function Add({id}:{id:string}){const{add}=useStore();return <button className="btn" onClick={()=>add(id)}>+ Thêm vào giỏ</button>}
export function Card({p}:{p:Product}){return <article className="card"><Link href={"/products/"+p.slug} className="media"><Art name={p.art}/></Link><div className="card-body"><span className="tag">DEMO / {p.category.toUpperCase()}</span><Link href={"/products/"+p.slug}><h3>{p.name}</h3></Link><p className="specs">{p.specs}</p><div className="price">{new Intl.NumberFormat("vi-VN").format(p.price)} ₫</div><div className="product-footer"><small className="muted">Kho demo: {p.stock}</small><Add id={p.id}/></div></div></article>}
