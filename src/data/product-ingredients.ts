export type Ingredient = { name: string; english: string; role: string; note?: string };
export type IngredientSheet = { page: number; items: Ingredient[]; note?: string; quality?: string[] };

const ingredients: Record<string, Ingredient> = {
  soap: { name: "비누 베이스", english: "Soap base", role: "세정 베이스" },
  water: { name: "정제수", english: "Water", role: "용매" },
  sucroseStearate: { name: "수크로오스스테아레이트", english: "Sucrose Stearate", role: "유화 · 피부 유연" },
  sucroseLaurate: { name: "수크로오스라우레이트", english: "Sucrose Laurate", role: "유화" },
  lauric: { name: "라우릭애씨드", english: "Lauric Acid", role: "지방산 · 비누 베이스 구성" },
  palmitic: { name: "팔미틱애씨드", english: "Palmitic Acid", role: "지방산 · 비누 베이스 구성" },
  myristic: { name: "미리스틱애씨드", english: "Myristic Acid", role: "지방산 · 비누 베이스 구성" },
  sucrose: { name: "수크로오스", english: "Sucrose", role: "보습" },
  glycerin: { name: "글리세린", english: "Glycerin", role: "보습" },
  ethanol: { name: "에탄올", english: "Ethanol", role: "용매" },
  sorbitol: { name: "소르비톨", english: "Sorbitol", role: "보습" },
  maltitol: { name: "말티톨", english: "Maltitol", role: "보습" },
  sodium: { name: "소듐하이드록사이드", english: "Sodium Hydroxide", role: "비누화 · pH 조절" },
  stearic: { name: "스테아릭애씨드", english: "Stearic Acid", role: "지방산 · 비누 베이스 구성" },
  peg: { name: "피이지-60글리세릴이소스테아레이트", english: "PEG-60 Glyceryl Isostearate", role: "유화" },
  squalane: { name: "스쿠알란", english: "Squalane", role: "피부 유연 · 보습" },
  honey: { name: "꿀", english: "Honey", role: "보습" },
  collagen: { name: "가수분해콜라겐", english: "Hydrolyzed Collagen", role: "보습 · 피부 컨디셔닝" },
  rice: { name: "쌀배아오일", english: "Rice germ oil", role: "피부 유연" },
  hyaluronate: { name: "소듐하이알루로네이트", english: "Sodium Hyaluronate", role: "보습" },
  licorice: { name: "감초추출물", english: "Licorice extract", role: "피부 컨디셔닝" },
  rose: { name: "장미오일", english: "Rose oil", role: "향 · 피부 컨디셔닝" },
  dipotassium: { name: "다이포타슘글리시리제이트", english: "Dipotassium Glycyrrhizate", role: "피부 컨디셔닝" },
  ginseng: { name: "인삼추출물", english: "Ginseng extract", role: "피부 컨디셔닝" },
  mulberry: { name: "뽕나무뿌리껍질추출물", english: "Mulberry root bark extract", role: "피부 컨디셔닝" },
  reishi: { name: "영지추출물", english: "Reishi extract", role: "피부 컨디셔닝" },
  perilla: { name: "들깨추출물", english: "Perilla extract", role: "피부 컨디셔닝" },
  skullcap: { name: "황금추출물", english: "Scutellaria extract", role: "피부 컨디셔닝" },
  coix: { name: "율무추출물", english: "Coix extract", role: "피부 컨디셔닝" },
  chamomile: { name: "캐모마일추출물", english: "Chamomile extract", role: "피부 컨디셔닝" },
  caramel: { name: "캐러멜", english: "Caramel", role: "색상 부여" },
  rosemary: { name: "로즈마리추출물", english: "Rosemary extract", role: "피부 컨디셔닝" },
  tourmaline: { name: "전기석", english: "Tourmaline", role: "광물성 원료" },
  royal: { name: "로열젤리", english: "Royal Jelly", role: "보습 · 피부 컨디셔닝" },
  royalExtract: { name: "로열젤리추출물", english: "Royal Jelly Extract", role: "보습 · 피부 컨디셔닝" },
  pearl: { name: "진주", english: "Pearl", role: "원문 표기: 진주 원료" },
  titanium: { name: "티타늄디옥사이드", english: "Titanium Dioxide", role: "색상 · 불투명도 부여" },
  mica: { name: "마이카", english: "Mica", role: "광택 부여" },
  conchiolin: { name: "가수분해콘키올린", english: "Hydrolyzed Conchiolin", role: "보습 · 피부 컨디셔닝" },
  propolis: { name: "프로폴리스추출물", english: "Propolis Extract", role: "피부 컨디셔닝" },
  brownSugar: { name: "흑설탕", english: "Brown sugar", role: "원문 표기: 색상 부여 원료" },
  fragrance: { name: "향료", english: "Fragrance", role: "향 부여" },
};

const rows = (ids: string[]): Ingredient[] => ids.map((id) => {
  const item = ingredients[id];
  if (!item) throw new Error(`Unknown ingredient: ${id}`);
  return item;
});

// Source: uploaded 성분표.pdf, pages 13–17. Keep each sheet's listed order.
const beauty = ["soap", "sucroseStearate", "sucrose", "palmitic", "myristic", "glycerin", "peg", "sorbitol", "ethanol", "sodium", "water", "stearic", "collagen", "squalane", "rice"];
export const productIngredientSheets: Record<string, IngredientSheet> = {
  "junco-classic": { page: 13, quality: ["2017년 5월 9일, 본 제품은 일본식품분석센터의 식품 안전 검사에 합격했습니다."], items: rows(["soap", "sucroseStearate", "palmitic", "myristic", "sucrose", "glycerin", "ethanol", "water", "sorbitol", "sodium", "stearic", "peg", "squalane", "honey", "collagen", "rice", "hyaluronate", "licorice", "rose", "dipotassium", "ginseng", "mulberry", "reishi", "perilla", "skullcap", "coix", "chamomile", "caramel", "rosemary", "tourmaline"]) },
  "junco-classic-baby": { page: 14, quality: ["2015년 11월 12일, 본 제품은 일본식품분석센터의 식품 안전 검사에 합격했습니다."], items: rows(["water", "royal", "sucroseLaurate", "myristic", "palmitic", "glycerin", "peg", "sucrose", "stearic", "sorbitol", "maltitol", "sodium", "ethanol", "collagen", "squalane", "dipotassium"]) },
  "junco-classic-maternity": { page: 15, quality: ["2017년 5월 9일, 본 제품은 일본식품분석센터의 식품 안전 검사에 합격했습니다."], items: rows(["water", "royalExtract", "lauric", "myristic", "palmitic", "glycerin", "peg", "sucrose", "stearic", "sorbitol", "maltitol", "sodium", "ethanol", "collagen", "squalane", "pearl", "titanium", "mica", "conchiolin", "propolis", "dipotassium"]) },
  "sdc-beauty-soap": { page: 16, items: rows(beauty) },
  "junco-classic-recollection": { page: 17, items: rows([...beauty, "dipotassium", "brownSugar", "fragrance"]) },
};