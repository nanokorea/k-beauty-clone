import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type DescriptionSlide = { src: string; alt: string };

export function ProductDescriptionSlider({ slides }: { slides: DescriptionSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = setInterval(() => setIndex((v) => (v + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const go = (step: number) => setIndex((v) => (v + step + slides.length) % slides.length);

  return (
    <div
      data-reveal-managed
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-square w-full overflow-hidden border border-border bg-muted">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden={i !== index}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <button
          type="button"
          aria-label="이전 사진"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm transition-colors hover:bg-background"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="다음 사진"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm transition-colors hover:bg-background"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`사진 ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-8 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
