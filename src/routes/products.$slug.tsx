import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/site";
import { juncoIngredients } from "@/data/junco-ingredients";
import { ProductDetailTabs } from "@/components/product-detail-tabs";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-16">
        <SectionHeading title={product.name} sub={product.sub} />
        <div className="mx-auto mt-12 grid max-w-[1100px] items-start gap-10 px-4 md:grid-cols-2">
          <img src={product.image} alt={product.name} className="w-full rounded-sm" />
          <div className="space-y-4 text-[15px] leading-7 text-foreground/85">
            <p className="font-medium text-foreground">{product.summary}</p>
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

        <ProductDetailTabs key={product.slug} slug={product.slug} detail={
          <div className="mx-auto max-w-[900px] space-y-6">
            <h2 className="text-xl font-semibold">{product.sub}</h2>
            <p className="text-[15px] leading-8">{product.summary}</p>
            {product.body.map((line) => <p key={line} className="text-[15px] leading-8">{line}</p>)}
            {product.detailImages?.map((src) => (
              <img key={src} src={src} alt={`${product.name} 상세 이미지`} className="w-full rounded-sm" loading="lazy" />
            ))}
          </div>
        } ingredients={product.slug === "junco-classic" ? (
          <section className="mx-auto max-w-[1000px]">
            <p className="text-center text-[11px] tracking-[0.3em] text-muted-foreground">FULL INGREDIENT LIST</p>
            <h3 className="mt-2 text-center text-xl font-semibold text-foreground">JUNCO CLASSIC 전성분</h3>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[640px] border-t-2 border-foreground text-left text-[13px] leading-7">
                <thead>
                  <tr className="border-b border-border text-foreground">
                    <th className="w-12 py-3 pl-2 font-semibold">No.</th>
                    <th className="py-3 font-semibold">Ingredient (INCI / 한글)</th>
                    <th className="py-3 font-semibold">Origin / Source</th>
                    <th className="py-3 font-semibold">Key Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  {juncoIngredients.map(([name, origin, benefit], i) => (
                    <tr key={name} className="border-b border-border/60 even:bg-secondary/40">
                      <td className="py-2 pl-2 text-muted-foreground">{i + 1}</td>
                      <td className="py-2 pr-3 font-medium text-foreground">{name}</td>
                      <td className="py-2 pr-3 text-foreground/80">{origin}</td>
                      <td className="py-2 text-primary">{benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : undefined} />



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
