import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Star, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { createProductFeedback, feedbackSchema, listProductFeedback } from "@/lib/product-feedback.functions";

export const productFeedbackOptions = (productSlug: string) => ({
  queryKey: ["product-feedback", productSlug],
  queryFn: () => listProductFeedback({ data: { productSlug } }),
});

type Tab = "detail" | "review" | "question" | "ingredients";

export function ProductDetailTabs({ slug, detail, ingredients }: { slug: string; detail: ReactNode; ingredients?: ReactNode }) {
  const [tab, setTab] = useState<Tab>("detail");
  const [writing, setWriting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const { user, loading } = useAuth();
  const save = useServerFn(createProductFeedback);
  const { data: rows = [], isError, isPending, refetch } = useQuery(productFeedbackOptions(slug));
  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "detail", label: "상세정보" },
    { id: "review", label: "사용후기", count: rows.filter((r) => r.kind === "review").length },
    { id: "question", label: "Q&A", count: rows.filter((r) => r.kind === "question").length },
    { id: "ingredients", label: "전성분표" },
  ];
  const items = rows.filter((r) => r.kind === tab);
  const changeTab = (next: Tab) => { setTab(next); setWriting(false); setTitle(""); setContent(""); };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy || !user || (tab !== "review" && tab !== "question")) return;
    const parsed = feedbackSchema.safeParse({ productSlug: slug, kind: tab, title, content, rating: tab === "review" ? rating : null });
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "입력 내용을 확인해 주세요."); return; }
    setBusy(true);
    try {
      await save({ data: parsed.data });
      await refetch();
      setWriting(false); setTitle(""); setContent("");
      toast.success(tab === "review" ? "사용후기가 등록되었습니다." : "질문이 등록되었습니다.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "등록에 실패했습니다."); }
    finally { setBusy(false); }
  };

  return (
    <section className="mx-auto mt-16 max-w-[1100px] px-4">
      <div role="tablist" aria-label="제품 상세 정보" className="grid grid-cols-4 gap-1 border-b border-border py-5 sm:py-8">
        {tabs.map((item) => (
          <Button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={tab === item.id} aria-controls={`panel-${item.id}`} variant="ghost"
            onClick={() => changeTab(item.id)} className={`h-12 gap-1 rounded-none px-0 text-xs hover:bg-transparent hover:text-foreground sm:gap-2 sm:text-base ${tab === item.id ? "font-semibold text-foreground" : "font-normal text-muted-foreground"}`}>
            {item.label}{item.count !== undefined && <span className="inline-flex min-w-4 items-center justify-center rounded-sm bg-muted px-1 text-[10px] text-muted-foreground sm:text-xs">{item.count}</span>}
          </Button>
        ))}
      </div>
      <div key={slug} id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="min-h-64 py-10 sm:py-14">
        {tab === "detail" ? detail : tab === "ingredients" ? (ingredients ?? <p className="py-12 text-center text-sm text-muted-foreground">전성분표 준비 중입니다.</p>) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{tab === "review" ? "사용후기" : "상품 Q&A"}</h2>
              {!loading && (user ? <Button variant="outline" onClick={() => setWriting(!writing)}><Pencil />{writing ? "닫기" : tab === "review" ? "후기 작성" : "질문 작성"}</Button> : <Button asChild variant="outline"><Link to="/auth">로그인 후 작성</Link></Button>)}
            </div>
            {writing && user && <form onSubmit={submit} className="mb-8 space-y-4 border-y border-border py-6">
              {tab === "review" && <fieldset><legend className="mb-2 text-sm">별점</legend><div className="flex gap-1">{[1,2,3,4,5].map((n) => <Button key={n} type="button" variant="ghost" size="icon" aria-label={`${n}점`} aria-pressed={rating === n} onClick={() => setRating(n)} className="text-primary"><Star className={n <= rating ? "fill-current" : ""} /></Button>)}</div></fieldset>}
              <label className="block text-sm">제목<input required maxLength={100} value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3" /></label>
              <label className="block text-sm">내용<textarea required maxLength={3000} rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3" /></label>
              <p className="text-xs text-muted-foreground">작성한 내용은 공개됩니다. 연락처 등 개인정보는 입력하지 마세요.</p>
              <div className="flex justify-end"><Button type="submit" disabled={busy}>{busy ? "등록 중…" : "등록하기"}</Button></div>
            </form>}
            {isError ? <div className="py-10 text-center"><p className="text-sm text-muted-foreground">목록을 불러오지 못했습니다.</p><Button variant="link" onClick={() => refetch()}>다시 시도</Button></div> : isPending ? <p className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</p> : items.length === 0 ? <p className="py-12 text-center text-sm text-muted-foreground">{tab === "review" ? "등록된 사용후기가 없습니다." : "등록된 질문이 없습니다."}</p> : <ul className="divide-y divide-border border-y border-border">{items.map((item) => <li key={item.id} className="py-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><span>{item.author_label}</span><time dateTime={item.created_at}>{new Date(item.created_at).toISOString().slice(0,10)}</time>{item.rating !== null && <span className="text-primary" aria-label={`${item.rating}점`}>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</span>}</div>
              <h3 className="mt-3 break-words text-base font-medium">{item.title}</h3><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7">{item.content}</p>
            </li>)}</ul>}
          </>
        )}
      </div>
    </section>
  );
}