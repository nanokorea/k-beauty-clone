import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { historyEvents } from "./product-history";

describe("Product history chronology", () => {
  test("Starts with July 1972 founding", () => {
    assert.equal(historyEvents[0]?.date, "1972. 07");
    assert.equal(historyEvents[0]?.body, "교에이 유화 주식회사를 설립하고 투명 비누의 제조·판매를 시작하였습니다.");
  });
  test("SDC BEAUTY SOAP is the earliest product", () => {
    const first = historyEvents.find((event) => event.image);
    assert.equal(first?.title, "SDC BEAUTY SOAP");
    assert.equal(first?.date, "1983");
  });
  test("Every event appears oldest first, using launch dates for products", () => {
    assert.deepEqual(historyEvents.map((event) => event.date), ["1972. 07", "1983", "1987. 02", "1995", "1996", "2010", "2010", "2012", "2013", "2015", "2016"]);
  });
});