import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { products } from "@/data/site";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";

const BASE_URL = "https://eisoap.com";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        const productRouteId = "/products/$slug";
        if (isSitemapRouteIncluded(router.routesById[productRouteId])) {
          for (const product of products) {
            const location = router.buildLocation({
              to: "/products/$slug",
              params: { slug: product.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, productRouteId);
            if (path) entries.push({ path });
          }
        }

        const shopRouteId = "/shop/$slug";
        if (isSitemapRouteIncluded(router.routesById[shopRouteId])) {
          const { createClient } = await import("@supabase/supabase-js");
          const url = process.env["SUPABASE_URL"];
          const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
          if (!url || !key) throw new Error("Public product source is not configured");
          const supabase = createClient(url, key, {
            auth: { persistSession: false, autoRefreshToken: false },
            global: {
              fetch: (input, init) => {
                const headers = new Headers(init?.headers);
                if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
                  headers.delete("Authorization");
                }
                headers.set("apikey", key);
                return fetch(input, { ...init, headers });
              },
            },
          });
          const pageSize = 1000;
          for (let offset = 0; ; ) {
            const { data, error } = await supabase
              .from("products")
              .select("id,slug")
              .eq("is_active", true)
              .order("id")
              .range(offset, offset + pageSize - 1);
            if (error) throw error;
            if (data.length === 0) break;
            for (const product of data) {
              const location = router.buildLocation({
                to: "/shop/$slug",
                params: { slug: product.slug },
                search: () => ({}),
                hash: "",
              });
              const path = sitemapPathForLocation(router, location, shopRouteId);
              if (path) entries.push({ path });
            }
            offset += data.length;
          }
        }

        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});