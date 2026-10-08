import { useEffect } from "react";

/** Shared, progressively enhanced reveal for current and future content routes. */
export function PageScrollReveal() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (media.matches) return;
      const tracked = new Set<Element>();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("scroll-in-view", entry.isIntersecting));
      }, { threshold: 0.08 });
      const scan = () => {
        document.querySelectorAll("main h1, main h2, main h3, main p, main img, main [data-scroll-reveal]").forEach((element) => {
          if (tracked.has(element) || element.closest('form, nav, [role="tablist"], [data-reveal-managed], .lg\\:sticky') || element.classList.contains("transition-[opacity,transform]")) return;
          const rect = element.getBoundingClientRect();
          element.classList.add("page-scroll-reveal");
          element.classList.toggle("scroll-in-view", rect.top < window.innerHeight && rect.bottom > 0);
          tracked.add(element);
          observer.observe(element);
        });
      };
      scan();
      const mutation = new MutationObserver(scan);
      mutation.observe(document.body, { childList: true, subtree: true });
      cleanup = () => {
        mutation.disconnect(); observer.disconnect();
        tracked.forEach((element) => element.classList.remove("page-scroll-reveal", "scroll-in-view"));
      };
    };
    setup(); media.addEventListener("change", setup);
    return () => { cleanup(); media.removeEventListener("change", setup); };
  }, []);
  return null;
}