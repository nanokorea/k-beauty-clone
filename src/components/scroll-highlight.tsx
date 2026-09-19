import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollHighlightProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollHighlight({ children, className, delay = 0 }: ScrollHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: `0px 0px -${18 + delay * 5}% 0px`, threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "translate-y-3 opacity-30 transition-[opacity,transform] duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        active && "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}

type StickyHighlightProps = {
  eyebrow: string;
  title: string;
  lines: string[];
  children?: ReactNode;
  className?: string;
};

export function StickyHighlight({ eyebrow, title, lines, children, className }: StickyHighlightProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLine, setActiveLine] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setActiveLine(lines.length - 1);
      return;
    }

    let frame = 0;
    const update = () => {
      const bounds = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const distance = Math.max(bounds.height - viewport * 0.45, 1);
      const progress = Math.min(1, Math.max(0, (viewport * 0.72 - bounds.top) / distance));
      setActiveLine(Math.min(lines.length - 1, Math.floor(progress * (lines.length + 1))));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [lines.length]);

  return (
    <div ref={sectionRef} className={cn("lg:min-h-[165vh]", className)}>
      <div className="lg:sticky lg:top-32">
        <p className="text-xs font-medium uppercase text-primary">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold leading-10 text-ink">{title}</h2>
        <div className="mt-6 space-y-2 sm:mt-8 sm:space-y-3">
          {lines.map((line, index) => (
            <p
              key={line}
              className={cn(
                "translate-y-3 text-lg leading-8 text-foreground/25 transition-[color,opacity,transform] duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:text-foreground/80 motion-reduce:transition-none sm:text-xl sm:leading-9",
                index <= activeLine && "translate-y-0 text-foreground/85",
              )}
            >
              {line}
            </p>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}