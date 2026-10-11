type SoapReason = { title: string; text: string };

const reasons: SoapReason[] = [
  { title: "쫀쫀하고 촘촘한 거품", text: "비누에 물을 묻혀 거품망으로 충분히 거품을 내면, 풍성하고 부드러운 거품으로 세안할 수 있습니다." },
  { title: "식물성 오일 유래 베이스", text: "비누의 기본이 되는 원료부터 생각합니다. 제품별 원료와 배합은 각 제품의 성분 안내를 확인해 주세요." },
  { title: "시간을 들이는 와쿠네리 제법", text: "비누 반죽을 틀에 넣고 서서히 냉각·건조하는 일본 전통 제조 방식으로 정성껏 완성합니다." },
  { title: "깨끗한 물에서 시작하는 제조", text: "제조에 사용하는 물과 비누 베이스까지 세심하게 살피는 이시노의 제품 철학을 담았습니다." },
  { title: "매일의 클렌징 리추얼", text: "충분히 낸 거품으로 부드럽게 씻고 깨끗이 헹궈 주세요. 사용 부위와 사용법은 제품별 안내를 따라 주세요." },
];

const maternityDetails = [
  "거품망에 문지르면 부드러운 생크림 같은 거품이 만들어집니다. 거품으로 가볍게 마사지하듯 세안하세요.",
  "9가지 식물성 오일 유래 지방산과 해수 유래 가성소다로 만든 비누 베이스를 사용합니다. 공급사 자료 기준 pH 8의 약알칼리성입니다.",
  "비누 반죽을 틀에 넣어 서서히 열을 가한 뒤 자연 냉각·자연 건조합니다. 약 90일간 숙성시켜 단단한 비누로 완성합니다.",
  "제조 과정에서 역삼투압(RO) 필터 방식으로 정제한 물을 사용합니다.",
  "얼굴 세안부터 거품 팩, 바디 세정까지 사용할 수 있습니다. 사용 부위와 사용법은 제품별 안내를 따라 주세요.",
];

export function IshinoSoapReasons({ maternity = false }: { maternity?: boolean }) {
  return (
    <section aria-label="EI 미용비누가 특별한 이유" className="bg-detail-paper px-6 py-16 text-foreground sm:py-20">
      <div className="mx-auto max-w-[900px]">
        <div className="border-b-2 border-foreground pb-7">
          <p className="text-xs text-primary">WHY ISHINO SOAP</p>
          <h2 className="mt-4 text-2xl leading-relaxed sm:text-3xl">이시노 비누가 특별한 이유</h2>
          <p className="mt-3 text-sm text-muted-foreground">제조 방식부터 매일의 세안까지</p>
        </div>
        <dl className="divide-y divide-border border-b border-border">
          {reasons.map((reason, index) => (
            <div key={reason.title} className="grid grid-cols-[28px_1fr] gap-x-4 gap-y-3 py-6 sm:grid-cols-[36px_220px_1fr] sm:gap-x-6 sm:py-7">
              <span aria-hidden="true" className="text-sm font-medium text-oxide">0{index + 1}</span>
              <dt className="text-base font-medium leading-7">{reason.title}</dt>
              <dd className="col-start-2 text-sm leading-7 text-muted-foreground sm:col-start-3">{maternity ? maternityDetails[index] : reason.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">공급사 제공 자료를 바탕으로 한 안내입니다. 원료·배합·숙성 기간 및 사용 부위는 제품별로 다를 수 있습니다.{maternity && " pH와 RO 정제수 관련 내용은 마터니티 공급사 자료 기준입니다."}</p>
      </div>
    </section>
  );
}