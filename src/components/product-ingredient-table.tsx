import type { IngredientSheet } from "@/data/product-ingredients";

export function ProductIngredientTable({ name, sheet }: { name: string; sheet: IngredientSheet }) {
  return <section className="mx-auto max-w-[950px] text-foreground">
    <header className="border-b-2 border-foreground pb-8">
      <p className="text-xs text-oxide">INGREDIENT REFERENCE</p>
      <h2 className="mt-4 break-words text-2xl leading-relaxed sm:text-3xl">{name}<span className="mt-1 block text-xl">전성분표</span></h2>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"><span>제공 자료 기준 · {sheet.items.length}개 성분</span><span>자료 {sheet.page}페이지</span></div>
    </header>
    <p className="my-6 text-sm leading-7 text-muted-foreground">제공하신 자료에 기재된 성분 목록을 한국어·영어로 정리했습니다. 번호는 자료의 기재 순서이며 함량 순서를 확인한 표가 아닙니다. 영문은 성분 이해를 위한 명칭으로, 공식 INCI 및 최신 국내 제품 라벨과 다를 수 있습니다.</p>
    <table className="w-full table-fixed border-b border-border text-left text-sm">
      <caption className="sr-only">{name} 제공 자료 성분 목록</caption>
      <colgroup><col className="w-10 sm:w-16" /><col /><col className="w-28 sm:w-48" /></colgroup>
      <thead className="bg-secondary text-secondary-foreground"><tr><th scope="col" className="px-2 py-4 font-medium">No.</th><th scope="col" className="px-2 py-4 font-medium sm:px-4">성분명</th><th scope="col" className="px-2 py-4 font-medium sm:px-4">일반적 역할</th></tr></thead>
      <tbody>{sheet.items.map((item, i) => <tr key={item.english} className="border-t border-border even:bg-detail-paper">
        <td className="px-2 py-5 align-top text-oxide">{String(i + 1).padStart(2, "0")}</td>
        <th scope="row" className="break-words px-2 py-5 text-left align-top font-normal sm:px-4"><span className="block font-medium leading-6">{item.name}</span><span className="mt-1 block break-words text-xs leading-5 text-muted-foreground">{item.english}</span>{item.note && <span className="mt-2 block text-xs leading-5 text-muted-foreground">{item.note}</span>}</th>
        <td className="break-words px-2 py-5 align-top text-xs leading-6 text-muted-foreground sm:px-4 sm:text-sm">{item.role}</td>
      </tr>)}</tbody>
    </table>
    <div className="mt-7 border-l-2 border-oxide pl-5 text-xs leading-6 text-muted-foreground"><p>출처: 제공된 성분표.pdf, {sheet.page}페이지. 원료의 일반적인 역할은 완제품의 효능을 보장하지 않습니다. 배합 변경 및 원문 표기 차이가 있을 수 있으므로 실제 제품 포장의 전성분을 우선 확인해 주세요.</p>{sheet.note && <p className="mt-3">{sheet.note}</p>}</div>
  </section>;
}