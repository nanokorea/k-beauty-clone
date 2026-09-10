import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/site";

export const Route = createFileRoute("/products/$slug")({
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
            {product.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <a
              href="https://juncoclassic.cart.fc2.com/?ca=all"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center rounded-sm bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              온라인 스토어에서 구매
            </a>
          </div>
        </div>

        {product.detailImages?.length ? (
          <div className="mx-auto mt-16 max-w-[900px] space-y-8 px-4">
            {product.detailImages.map((src) => (
              <img key={src} src={src} alt={`${product.name} 상세 이미지`} className="w-full rounded-sm" loading="lazy" />
            ))}
          </div>
        ) : null}



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
