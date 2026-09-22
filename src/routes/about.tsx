import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import aboutImg from "@/assets/about-ei.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "EI에 대하여 | JUNCO CLASSIC 한국" },
      {
        name: "description",
        content:
          "반세기 넘게 비누 업계를 이끌어 온 장인 이시노 에이이치(石野栄一)와 EI 브랜드의 이야기를 소개합니다.",
      },
      { property: "og:title", content: "EI에 대하여 | JUNCO CLASSIC 한국" },
      {
        property: "og:description",
        content: "비누 장인 이시노 에이이치(石野栄一)와 EI 브랜드 이야기.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-16">
        <div className="mx-auto max-w-[900px] px-4 text-sm text-foreground/60">
          홈 &gt; 브랜드 소개
        </div>
        <SectionHeading title="브랜드 소개" sub="About EI" />
        <div className="mx-auto mt-12 max-w-[900px] space-y-6 px-4 text-[15px] leading-7 text-foreground/85">
          <img
            src={aboutImg.url}
            alt="비누 장인 이시노 에이이치(石野栄一)"
            className="w-full rounded-sm"
          />
          <p>
            저는 올해 여든 살이 되었습니다. 제 평생 해온 단 하나의 일은 수제 비누의 연구와 생산이었습니다.
          </p>
          <p>
            50여 년 동안 제가 개발한 수제 비누는 천여 종에 이릅니다. 널리 알려진 HACCI 꿀 비누,
            penelopi moon 문라이트 비누 등이 그것입니다.
          </p>
          <p>
            50여 년의 개발 과정에서 저는 세안 제품과 팩이 따로 나뉘어 있어 사용하는 분들이 여러 불편을
            겪는다는 사실을 알게 되었습니다. 또한 민감한 피부나 피부 질환이 있는 분들이 고를 수 있는
            세안 제품은 아주 적거나 거의 없다시피 했습니다. 시중에 유통되는 영유아·아동용 제품 역시
            여러 이유로 부모님들의 걱정을 완전히 덜어 주지는 못했습니다.
          </p>
          <p>
            그래서 저는 수제 비누에 새로운 기능을 담아, 사용이 간편하면서도 효과적인 세안과 깊은
            피부 보호, 오래가는 아름다움까지 세 가지를 하나로 아우르는, 모든 소비자가 믿고 쓸 수 있는
            제품을 반드시 만들어 내겠다고 결심했습니다.
          </p>
          <p>
            이 이상을 실현하기 위해 저는 먼저 '계면활성' 처방을 고안하여 피부 위의 유분과 수분이 스스로
            분리되도록 했습니다. 풍성한 거품은 피부의 과한 유분을 끌어당기는 동시에 수분을 붙잡아 주어,
            사용 후에도 피부가 산뜻하면서 촉촉하게 느껴집니다. 이어서 '틀 제조법(框錬製法)'이라는 독자적인
            제조 공정을 만들었습니다. 이 방법으로 만든 비누는 각종 한방·식물 유효 성분을 최대 25%까지
            담을 수 있어, 곱고 밀도 높은 영양 가득한 거품이 만들어지고 이 거품이 피부를 가장 부드럽게
            감싸 줍니다.
          </p>
          <p>
            제가 만든 새로운 시대의 수제 비누는 출시되자마자 소비자들의 마음을 사로잡았습니다. 잡지와
            방송에서 잇달아 취재를 왔고, 이름난 화장품 브랜드들이 협업을 요청하며 자사 제품의 제조를
            맡겨 왔습니다.
          </p>
          <p>
            세안과 피부 관리에 대한 기존의 관념은 완전히 바뀌었고, 수제 비누를 쓰는 일은 하나의 새로운
            문화가 되었습니다.
          </p>
          <p>
            50여 년 동안, 이렇게 단순하고 한결같은 마음이 있었기에 저는 오직 한 가지 일, 모두에게
            아름다움과 기쁨을 주는 수제 비누를 연구하고 만드는 일을 계속할 수 있었습니다. Eiichi Ishino는
            지금까지 쌓아온 50년의 연구 경험과 제가 바라본 수제 비누의 역사를 집대성한 제품입니다. 그
            안에는 수십 년의 노력과 정수뿐 아니라, 비누 문화에 대한 저의 이해가 함께 담겨 있습니다.
            제 손을 거쳐 태어난 비누 한 장 한 장은 모두 제 아이와 같아서, 저의 기운과 마음을 그대로
            불어넣었습니다.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

