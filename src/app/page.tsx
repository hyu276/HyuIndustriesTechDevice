import Link from "next/link";
import { products } from "@/lib/database";
import { Card, Art } from "@/components/store";

export const dynamic = "force-dynamic";

const commerceCategories = [
  { name:"Laptop", hint:"Làm việc & học tập",symbol:"▣"},
  { name:"Desktop", hint:"Máy tính để bàn",symbol:"▤"},
  { name:"Điện thoại",hint:"Thiết bị di động",symbol:"▯"},
  { name:"Linh kiện",hint:"Nâng cấp PC",symbol:"⬡"},
  { name:"Phụ kiện",hint:"Góc làm việc",symbol:"⌘"},
];
const categoryUrl = (name:string) => "/products?category="+encodeURIComponent(name);

export default function Home() {
  const items=products();
  return <main className="commerce-home">
    <section className="market-shell wrap" aria-label="Danh mục và chương trình giới thiệu">
      <aside className="market-rail">
        <div className="market-rail-title">KHÁM PHÁ DANH MỤC <span aria-hidden="true">☷</span></div>
        <nav aria-label="Danh mục sản phẩm">
          {commerceCategories.map(category=><Link href={categoryUrl(category.name)} key={category.name} className="market-rail-item">
            <span className="market-rail-icon" aria-hidden="true">{category.symbol}</span>
            <span><strong>{category.name}</strong><small>{category.hint}</small></span>
            <span className="market-arrow" aria-hidden="true">›</span>
          </Link>)}
        </nav>
        <div className="market-rail-bottom"><span>HYU CATALOG</span><Link href="/products">Xem tất cả <span aria-hidden="true">↗</span></Link></div>
      </aside>
      <div className="market-stage">
        <div className="market-main-banner">
          <div className="market-banner-copy">
            <span className="market-label">HYU INDUSTRIES / DEVICE COLLECTION</span>
            <h1>Chọn công nghệ.<br/><em>Chọn khả năng.</em></h1>
            <p>Khám phá thiết bị công nghệ và cấu hình được trình bày minh bạch — từ laptop, desktop đến phụ kiện thiết yếu.</p>
            <Link href="/products" className="market-banner-action">Khám phá cửa hàng <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="market-banner-art" aria-hidden="true"><span className="market-art-circle"/><Art name="laptop"/></div>
          <span className="market-banner-index">01 / CATALOG PREVIEW</span>
        </div>
        <div className="market-secondary">
          <Link href={categoryUrl("Desktop")} className="market-promo market-promo-power">
            <div><span className="market-label">BUILD YOUR SETUP</span><h2>Hiệu năng<br/>cho mọi dự án<span>.</span></h2><span className="market-promo-link">Desktop & PC <span aria-hidden="true">↗</span></span></div>
            <div className="market-mini-art" aria-hidden="true"><Art name="desktop"/></div>
          </Link>
          <Link href={categoryUrl("Phụ kiện")} className="market-promo market-promo-desk">
            <div><span className="market-label">THE SMALL DETAILS</span><h2>Góc làm việc.<br/>Nâng tầm trải nghiệm.</h2><span className="market-promo-link">Xem phụ kiện <span aria-hidden="true">↗</span></span></div>
            <div className="market-mini-art" aria-hidden="true"><Art name="headset"/></div>
          </Link>
        </div>
      </div>
    </section>

    <div className="market-service-wrap"><div className="wrap market-services">
      <div><span aria-hidden="true" className="market-service-icon">⌕</span><span><strong>Tìm nhanh theo nhu cầu</strong><small>Danh mục rõ ràng, dễ lựa chọn</small></span></div>
      <div><span aria-hidden="true" className="market-service-icon">▤</span><span><strong>Cấu hình dễ so sánh</strong><small>Thông số hiển thị trực tiếp</small></span></div>
      <div><span aria-hidden="true" className="market-service-icon">▢</span><span><strong>Giỏ hàng thử nghiệm</strong><small>Không thanh toán thật</small></span></div>
    </div></div>

    <section className="market-shortcuts wrap" aria-labelledby="shortcutsTitle">
      <div className="market-section-heading"><div><span className="market-overline">BROWSE BY CATEGORY</span><h2 id="shortcutsTitle">Khám phá theo danh mục</h2></div><Link href="/products">Tất cả sản phẩm <span aria-hidden="true">↗</span></Link></div>
      <div className="market-shortcut-grid">
        {commerceCategories.map((category,index)=><Link href={categoryUrl(category.name)} key={category.name} className="market-shortcut">
          <span className="market-shortcut-icon" aria-hidden="true">{category.symbol}</span>
          <span><strong>{category.name}</strong><small>{items.filter(item=>item.category===category.name).length} sản phẩm demo</small></span>
          <span className="market-shortcut-number">0{index+1}</span>
        </Link>)}
      </div>
    </section>

    <section className="market-catalog-zone" aria-labelledby="featuredTitle"><div className="wrap">
      <div className="market-section-heading"><div><span className="market-overline">TECH DEVICE / HAND-PICKED DEMO CATALOG</span><h2 id="featuredTitle">Sản phẩm dành cho bạn<span className="market-accent">.</span></h2><p>Thông số, giá bán và tồn kho hiện chỉ phục vụ bản thử nghiệm.</p></div><Link href="/products">Xem toàn bộ <span aria-hidden="true">↗</span></Link></div>
      <div className="products market-product-grid">{items.map(p=><Card key={p.id} p={p}/>)}</div>
      <div className="market-catalog-foot"><span>ĐÃ HIỂN THỊ {items.length} / {items.length} SẢN PHẨM DEMO</span><Link href="/products" className="market-outline-link">Khám phá toàn bộ danh mục <span aria-hidden="true">→</span></Link></div>
    </div></section>

    <section className="wrap market-feature-row" aria-label="Khám phá thêm">
      <div><span className="market-overline">WORK BETTER</span><h2>Thiết bị tạo nên<br/>không gian sáng tạo.</h2><p>Gợi ý nhóm laptop và desktop cho công việc, học tập và nhu cầu cá nhân.</p><Link href={categoryUrl("Laptop")}>Xem laptop <span aria-hidden="true">↗</span></Link></div>
      <div><span className="market-overline">EVERYDAY ESSENTIALS</span><h2>Hoàn thiện<br/>góc làm việc.</h2><p>Phụ kiện và linh kiện dành cho bộ máy theo phong cách của bạn.</p><Link href={categoryUrl("Phụ kiện")}>Xem phụ kiện <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="market-final-note"><div className="wrap"><strong>HYU INDUSTRIES · DEVELOPMENT PREVIEW</strong><p>Website đang được hoàn thiện. Toàn bộ sản phẩm, cấu hình, giá và đơn hàng là dữ liệu minh họa. Không có giao dịch thanh toán thực tế.</p></div></section>
  </main>;
}
