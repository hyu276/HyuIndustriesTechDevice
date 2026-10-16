export type Product={id:string;slug:string;name:string;category:string;price:number;stock:number;specs:string;art:string};
export const demo:Product[]=[
{id:"laptop",slug:"arc-studio-14",name:"ARC Studio 14",category:"Laptop",price:28990000,stock:14,specs:"32GB RAM · 1TB SSD · 14-inch",art:"laptop"},
{id:"desktop",slug:"vector-pro",name:"Vector Pro Desktop",category:"Desktop",price:36990000,stock:9,specs:"8-core · 32GB RAM · 1TB SSD",art:"desktop"},
{id:"phone",slug:"nova-phone-x",name:"Nova Phone X",category:"Điện thoại",price:18990000,stock:18,specs:"6.7-inch OLED · 256GB · 5G",art:"phone"},
{id:"headset",slug:"pulse-wireless",name:"Pulse Wireless",category:"Phụ kiện",price:2490000,stock:29,specs:"Bluetooth · ANC · USB-C",art:"headset"},
{id:"keyboard",slug:"orbit-75",name:"Orbit Mechanical 75",category:"Phụ kiện",price:3290000,stock:20,specs:"75% layout · Wireless",art:"keyboard"},
{id:"gpu",slug:"core-graphics",name:"Core Graphics XT",category:"Linh kiện",price:15990000,stock:7,specs:"16GB VRAM · PCIe",art:"gpu"}];
export const vnd=(n:number)=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(n);
