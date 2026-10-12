import type { IngredientSheet } from "@/data/product-ingredients";

export function ProductIngredientTable({ name, sheet }: { name: string; sheet: IngredientSheet }) {
  return <section className="mx-auto max-w-[950px] text-foreground">
    <header className="border-b-2 border-foreground pb-8">
      <p className="text-xs text-oxide">INGREDIENT REFERENCE</p>
      <h2 className="mt-4 break-words text-2xl leading-relaxed sm:text-3xl">{name}<span className="mt-1 block text-xl">전성분표</span></h2>
    </header>
    <table className="mt-8 w-full table-fixed border-b border-border text-left text-sm">
      <caption className="sr-only">{name} 전성분 목록</caption>
      <colgroup><col className="w-10 sm:w-16" /><col /><col className="w-28 sm:w-48" /></colgroup>
      <thead className="bg-secondary text-secondary-foreground"><tr><th scope="col" className="px-2 py-4 font-medium">No.</th><th scope="col" className="px-2 py-4 font-medium sm:px-4">성분명</th><th scope="col" className="px-2 py-4 font-medium sm:px-4">일반적 역할</th></tr></thead>
      <tbody>{sheet.items.map((item, i) => <tr key={item.english} className="border-t border-border even:bg-detail-paper">
        <td className="px-2 py-5 align-top text-oxide">{String(i + 1).padStart(2, "0")}</td>
        <th scope="row" className="break-words px-2 py-5 text-left align-top font-normal sm:px-4"><span className="block font-medium leading-6">{item.name}</span><span className="mt-1 block break-words text-xs leading-5 text-muted-foreground">{item.english}</span></th>
        <td className="break-words px-2 py-5 align-top text-xs leading-6 text-muted-foreground sm:px-4 sm:text-sm">{item.role}</td>
      </tr>)}</tbody>
    </table>
  </section>;
}
