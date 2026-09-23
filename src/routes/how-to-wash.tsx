import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import herb01 from "@/assets/sy-l01.gif.asset.json";
import herb02 from "@/assets/sy-l02.gif.asset.json";
import herb03 from "@/assets/sy-l03.gif.asset.json";
import herb04 from "@/assets/sy-l04.gif.asset.json";
import herb05 from "@/assets/sy-l05.gif.asset.json";
import herb06 from "@/assets/sy-l06.gif.asset.json";
import herb07 from "@/assets/sy-l07.gif.asset.json";
import herb08 from "@/assets/sy-l08.gif.asset.json";
import herb09 from "@/assets/sy-l09.gif.asset.json";
import herb10 from "@/assets/sy-l10.gif.asset.json";
import stepPic1 from "@/assets/sy-spic1.jpg.asset.json";
import stepPic2 from "@/assets/sy-spic2.jpg.asset.json";
import stepPic3 from "@/assets/sy-spic3.jpg.asset.json";
import bubbleFoam from "@/assets/bubble-foam.gif.asset.json";

export const Route = createFileRoute("/how-to-wash")({
  head: () => ({
    meta: [
      { title: "올바른 한방·거품 팩 세안법 | EI JUNCO CLASSIC 한국" },
      {
        name: "description",
        content:
          "한방 식물 추출물을 담은 JUNCO CLASSIC 미용비누의 거품 팩 세안법을 STEP 1부터 STEP 6까지 단계별로 안내합니다.",
      },
      { property: "og:title", content: "올바른 한방·거품 팩 세안법 | EI JUNCO CLASSIC" },
      {
        property: "og:description",
        content: "1000여 종의 한방 식물 추출물 중 엄선 배합. 거품 팩 세안법 6단계 안내.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowToWash,
});

const herbs = [
  { img: herb01.url, name: "감초 추출물", en: "Licorice" },
  { img: herb02.url, name: "로즈 오일", en: "Rose Oil" },
  { img: herb03.url, name: "황금(오우곤) 추출물", en: "Scutellaria" },
  { img: herb04.url, name: "인삼(오타네닌진)", en: "Ginseng" },
  { img: herb05.url, name: "로즈마리 추출물", en: "Rosemary" },
  { img: herb06.url, name: "상백피 추출물", en: "Mulberry Bark" },
  { img: herb07.url, name: "영지(레이시) 추출물", en: "Reishi" },
  { img: herb08.url, name: "차조기(시소) 추출물", en: "Perilla" },
  { img: herb09.url, name: "율무(요쿠이닌) 추출물", en: "Coix Seed" },
  { img: herb10.url, name: "캐모마일 추출물", en: "Chamomile" },
];

function StepTitle({ children }: { children: string }) {
  return (
    <div className="mt-12 border-l-4 border-primary bg-secondary/70 px-5 py-2.5 text-sm font-semibold tracking-[0.2em] text-primary">
      {children}
    </div>
  );
}

function HowToWash() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-[1100px] px-4 pt-8 text-xs text-muted-foreground">
          HOME &gt; 올바른 한방·거품 팩 세안법
        </div>

        <div className="mx-auto max-w-[1100px] px-4 pb-20">
          <h1 className="mt-5 border-b-2 border-antique-gold pb-4 text-2xl font-bold text-ink sm:text-3xl">
            올바른 한방·거품 팩 세안법
          </h1>

          <div className="mt-10 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_360px]">
            <div className="mx-auto w-full max-w-[860px] md:mx-0">
          <div className="text-left text-[17px] leading-7 text-primary sm:text-lg">
            오늘부터는 세안을 하면서 스킨케어를.
            <br />
            한방 추출물을 배합한 최상의 거품이
            <br />
            당신을 더욱 아름다운 피부로 이끕니다.
          </div>

          <div className="mt-8 text-[15px] leading-7 text-foreground/85">
            <p>
              촘촘한 거품을 피부에 올리고 몇 분간 팩을 하기만 하면 됩니다.
              <br />
              아낌없이 배합한 한방 식물 추출물이 피부에 스며들어 촉촉함으로 가득 채웁니다.
              <br />
              세안 후의 피부는 활성화되어 화장수와 에센스의 유효 성분을 온전히 받아들일 수 있게 됩니다.
              <br />
              그래서 늘 하던 스킨케어를 스페셜 케어로 바꾸어 줍니다.
              <br />
              그것이 이시노 에이이치(石野栄一)가 만든 거품 팩 미용비누입니다.
            </p>
          </div>
            </div>
            <img
              src={bubbleFoam.url}
              alt="풍성한 거품을 손에 올린 모습"
              className="mx-auto w-full max-w-[360px] rounded-sm"
              loading="lazy"
            />
          </div>

          <div className="mt-12 bg-story-ivory px-5 py-4 text-center text-[15px] font-semibold leading-7 text-ink">
            저희가 만든 비누는 1000여 종에 이르는 한방 식물 추출물 중에서 수십 종을 엄선해 배합하고 있습니다.
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {herbs.map((h) => (
              <li key={h.name} className="text-center">
                <img
                  src={h.img}
                  alt={h.name}
                  className="mx-auto h-auto w-full max-w-[150px]"
                  loading="lazy"
                />
                <p className="mt-3 text-sm font-medium text-ink">{h.name}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wide text-primary">{h.en}</p>
              </li>
            ))}
          </ul>

          <StepTitle>STEP 1</StepTitle>
          <p className="mt-4 text-[15px] leading-7 text-foreground/85">
            먼저 미온수로 얼굴을 헹궈 냅니다.
          </p>

          <StepTitle>STEP 2</StepTitle>
          <div className="mt-4 text-[15px] leading-7 text-foreground/85">
            <p>
              손을 미온수로 적신 뒤 비누를 충분히 거품 냅니다.
              <br />
              비누 안에 미용 성분이 많이 들어 있어 거품이 다소 잘 나지 않는 성질이 있으므로, 거품망
              사용을 권해 드립니다.
              <br />
              거품망을 사용하시면 한층 더 촘촘하고 고급스러운 거품을 즐기실 수 있습니다.
            </p>
            <p className="mt-6 font-semibold text-ink">· 거품망 사용 방법</p>
            <p className="mt-2">
              거품망을 물이나 미온수로 한 번 가볍게 헹군 뒤 물기를 살짝 털어 냅니다.
              <br />
              비누를 거품망에 여러 번 문질러 줍니다.
              <br />
              적은 양으로도 순식간에 결이 고운 고급 거품이 완성됩니다.
            </p>
          </div>

          <StepTitle>STEP 3</StepTitle>
          <div className="mt-4 grid items-center gap-6 sm:grid-cols-[1fr_260px]">
            <p className="text-[15px] leading-7 text-foreground/85">
              거품을 얼굴 전체에 올리고, 이마와 코, 콧방울 주변부터 부드럽게, 절대 문지르지 말고
              풍성한 거품으로 얼굴 전체를 가볍게 마사지하듯 세안합니다.
            </p>
            <img src={stepPic1.url} alt="거품을 얼굴에 올리는 모습" className="w-full" loading="lazy" />
          </div>

          <StepTitle>STEP 4</StepTitle>
          <div className="mt-4 grid items-center gap-6 sm:grid-cols-[1fr_260px]">
            <p className="text-[15px] leading-7 text-foreground/85">
              세안 후 거품을 그대로 몇 분간 얼굴 전체에 올려 둔 채 팩을 합니다.
              <br />
              한방 식물 추출물의 미용 성분이 피부 깊숙이 스며들어
              <br />
              당신 안에 잠든 본래의 아름다움을 깨워 줍니다.
            </p>
            <img src={stepPic2.url} alt="거품 팩을 하는 모습" className="w-full" loading="lazy" />
          </div>

          <StepTitle>STEP 5</StepTitle>
          <div className="mt-4 grid items-center gap-6 sm:grid-cols-[1fr_260px]">
            <p className="text-[15px] leading-7 text-foreground/85">
              충분한 양의 물로 거품을 깨끗이 헹궈 냅니다.
            </p>
            <img src={stepPic3.url} alt="거품을 헹구는 모습" className="w-full" loading="lazy" />
          </div>

          <StepTitle>STEP 6</StepTitle>
          <p className="mt-4 text-[15px] leading-7 text-foreground/85">
            수건으로 가볍게 누르듯이 물기를 닦아 냅니다.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
