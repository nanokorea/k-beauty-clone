import historyMaternity from "@/assets/history-maternity.jpg.asset.json";
import historyRecollection from "@/assets/history-recollection.jpg.asset.json";
import historyBaby from "@/assets/history-baby.jpg.asset.json";
import historyMasha from "@/assets/history-masha.jpg.asset.json";
import historyTalisa from "@/assets/history-talisa.jpg.asset.json";
import historyJunoa from "@/assets/history-junoa.jpg.asset.json";
import historyJunco from "@/assets/history-junco.jpg.asset.json";
import historySdc from "@/assets/history-sdc.jpg.asset.json";

const productHistory = [
  {
    name: "SDC BEAUTY SOAP",
    image: historySdc.url,
    launched: "1983",
  },
  {
    name: "JUNCO CLASSIC SOAP",
    image: historyJunco.url,
    launched: "1995",
  },
  {
    name: "PENELOPI MOON JUNOA",
    image: historyJunoa.url,
    launched: "2010",
  },
  {
    name: "PENELOPI MOON TALISA",
    image: historyTalisa.url,
    launched: "2010",
  },
  {
    name: "PENELOPI MOON MASHA",
    image: historyMasha.url,
    launched: "2012",
  },
  {
    name: "JUNCO CLASSIC BABY",
    image: historyBaby.url,
    launched: "2013",
  },
  {
    name: "RECOLLECTION",
    image: historyRecollection.url,
    launched: "2015",
  },
  {
    name: "JUNCO CLASSIC MATERNITY",
    image: historyMaternity.url,
    launched: "2016",
  },
];

const corporateHistory = [
  {
    year: "1972. 07",
    body: "교에이 유화 주식회사를 설립하고 투명 비누의 제조·판매를 시작하였습니다.",
  },
  {
    year: "1987. 02",
    body: "주식회사 SDC(요코하마시 나카구 노게초)와 합병하였습니다.",
  },
  {
    year: "1996",
    body: "주식회사 SDC(요코하마)에서 분리 독립하였습니다. 기초 화장품, 그중에서도 투명 수제 비누 생산에 있어 전통 제법을 새롭게 바꾸는 과감한 시도를 이어갔습니다. 끊임없는 연구로 독자적인 배합과 기술, 공정을 완성하였고, 이를 바탕으로 태어난 새로운 제품은 민감성 피부(피부염을 포함)를 가진 분들도 안심하고 쓸 수 있는 비누를 목표로 삼았습니다. 당사의 제품은 여러 의과대학 피부과 전문의들의 신뢰를 받았으며, 팩처럼 피부를 가꾸는 세안 비누로서 다수의 유명 화장품 브랜드로부터 수제 비누 제품의 개발과 생산을 의뢰받았습니다.",
  },
];

export type HistoryEvent = {
  date: string;
  title: string;
  image?: string;
  body?: string;
};

// Chronological oldest first starting from 1972 founding.
export const historyEvents: HistoryEvent[] = [
  ...productHistory.map((item) => ({
    date: item.launched,
    title: item.name,
    image: item.image,
  })),
  ...corporateHistory.map((item) => ({
    date: item.year,
    title: item.year === "1972. 07" ? "교에이 유화(현 SDC) 설립" : item.year === "1987. 02" ? "SDC와의 합병" : "분리 독립 및 새로운 연구",
    body: item.body,
  })),
].sort((a, b) => a.date.localeCompare(b.date));
