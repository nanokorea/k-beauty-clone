import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/site";
import { productIngredientSheets } from "@/data/product-ingredients";
import { ProductIngredientTable } from "@/components/product-ingredient-table";
import { BabyDetail } from "@/components/baby-detail";
import babyOriginal from "@/assets/baby-original.jpg.asset.json";
import { ProductDetailTabs } from "@/components/product-detail-tabs";
import { ProductDescriptionSlider } from "@/components/product-description-slider";
import classicSlide1 from "@/assets/junco-classic-slide-1.jpg.asset.json";
import classicSlide2 from "@/assets/junco-classic-slide-2.jpg.asset.json";
import classicSlide3 from "@/assets/junco-classic-slide-3.jpg.asset.json";
import classicSlide4 from "@/assets/junco-classic-slide-4.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { MaternityDetail } from "@/components/maternity-detail";
import maternityOriginal from "@/assets/maternity-original.jpg.asset.json";
import { IshinoSoapReasons } from "@/components/ishino-soap-reasons";
import { ClassicDetail } from "@/components/classic-detail";
import classicProductSet from "@/assets/classic-detail-set.png.asset.json";
import { KakitanninDetail } from "@/components/kakitannin-detail";
import kakitanninMain from "@/assets/kakitannin-main.png.asset.json";
import { PureCollagenDetail } from "@/components/pure-collagen-detail";
import pureCollagenOriginal from "@/assets/pure-collagen-original.jpg.asset.json";
import { RecollectionDetail, SdcDetail } from "@/components/recollection-sdc-detail";
import recollectionOriginal from "@/assets/store-recollection.jpg.asset.json";
import sdcOriginal from "@/assets/history-sdc.jpg.asset.json";

export const Route = createFileRoute("/products/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "제품";
    const desc = loaderData?.summary ?? "EI 미용비누 제품 소개";
    return {
      meta: [
        { title: `${name} | JUNCO CLASSIC 한국` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} | JUNCO CLASSIC 한국` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const ingredientSheet = productIngredientSheets[product.slug];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-16">
        <SectionHeading title={product.name} sub={product.sub} />
        <div className="mx-auto mt-12 grid max-w-[1100px] items-start gap-10 px-4 md:grid-cols-2">
          {product.slug === "junco-classic" ? <ProductDescriptionSlider slides={[classicSlide1, classicSlide2, classicSlide3, classicSlide4].map((s, i) => ({ src: s.url, alt: `JUNCO CLASSIC 사진 ${i + 1}` }))} /> : <img src={product.slug === "junco-classic-maternity" ? maternityOriginal.url : product.slug === "junco-classic" ? classicProductSet.url : product.slug === "junco-classic-clear-kakitannin" ? kakitanninMain.url : product.slug === "junco-classic-pure-collagen" ? pureCollagenOriginal.url : product.slug === "junco-classic-baby" ? babyOriginal.url : product.slug === "junco-classic-recollection" ? recollectionOriginal.url : product.slug === "sdc-beauty-soap" ? sdcOriginal.url : product.image} alt={product.name} className="w-full rounded-sm" />}
          <div className="space-y-4 text-[15px] leading-7 text-foreground/85">
            <p className="font-medium text-foreground">{product.summary}</p>
            {product.slug === "junco-classic-maternity" && <p className="text-sm text-primary">내용량 115g · 얼굴 및 전신용</p>}
            {product.buyUrl ? (
              <Button asChild size="lg" className="mt-4">
              <a
                href={product.buyUrl}
                className="mt-4 inline-flex items-center rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                바로 구매하기
              </a>
              </Button>
            ) : product.slug === "junco-classic" ? (
              <Button asChild size="lg" className="mt-4">
              <Link
                to="/shop/$slug"
                params={{ slug: "junco-classic-100g" }}
                className="mt-4 inline-flex items-center rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                바로 구매하기
              </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="mt-4">
              <Link
                to="/shop"
                className="mt-4 inline-flex items-center rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                스토어 바로가기
              </Link>
              </Button>
            )}
          </div>
        </div>

        <ProductDetailTabs key={product.slug} slug={product.slug} detail={<>{product.slug === "junco-classic-maternity" ? <MaternityDetail /> : product.slug === "junco-classic" ? <ClassicDetail /> : product.slug === "junco-classic-clear-kakitannin" ? <KakitanninDetail /> : product.slug === "junco-classic-pure-collagen" ? <PureCollagenDetail /> : product.slug === "junco-classic-baby" ? <BabyDetail /> : product.slug === "junco-classic-recollection" ? <RecollectionDetail /> : product.slug === "sdc-beauty-soap" ? <SdcDetail /> :
          <div className="mx-auto max-w-[900px] space-y-6">
            <h2 className="text-xl font-semibold">{product.sub}</h2>
            <p className="text-[15px] leading-8">{product.summary}</p>
            {product.body.map((line) => <p key={line} className="text-[15px] leading-8">{line}</p>)}
            {product.detailImages?.map((src) => (
              <img key={src} src={src} alt={`${product.name} 상세 이미지`} className="w-full rounded-sm" loading="lazy" />
            ))}
          </div>
        }<div className="-mx-4"><IshinoSoapReasons maternity={product.slug === "junco-classic-maternity"} /></div></>} ingredients={ingredientSheet ? <ProductIngredientTable name={product.name} sheet={ingredientSheet} /> : undefined} />



        <div className="mx-auto mt-20 max-w-[1100px] px-4">
          <h3 className="text-lg font-semibold">다른 제품</h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((p) => p.slug !== product.slug)
              .map((p) => (
                <li key={p.slug}>
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="group block">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full rounded-sm object-cover transition-opacity group-hover:opacity-90"
                      loading="lazy"
                    />
                    <p className="mt-3 text-sm font-medium group-hover:text-primary">{p.name}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
