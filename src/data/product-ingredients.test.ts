import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { productIngredientSheets } from "./product-ingredients";

describe("Supplied ingredient sheet assignments", () => {
  test("Baby uses page 14's 16 ingredients including royal jelly, not maternity additions", () => {
    const sheet = productIngredientSheets["junco-classic-baby"];
    assert.equal(sheet?.page, 14);
    assert.equal(sheet?.items?.length, 16);
    assert.equal(sheet?.items[0]?.english, "Water");
    assert.equal(sheet?.items[1]?.english, "Royal Jelly");
    assert.equal(sheet?.items.some((item) => item.english === "Propolis Extract"), false);
  });
  test("Maternity uses page 15 including conchiolin and propolis", () => {
    const sheet = productIngredientSheets["junco-classic-maternity"];
    assert.equal(sheet?.page, 15);
    assert.equal(sheet?.items?.length, 21);
    assert.equal(sheet?.items[18]?.english, "Hydrolyzed Conchiolin");
    assert.equal(sheet?.items[19]?.english, "Propolis Extract");
  });
  test("SDC and Recollection retain separate lists on pages 16 and 17", () => {
    assert.equal(productIngredientSheets["sdc-beauty-soap"]?.items?.length, 15);
    assert.equal(productIngredientSheets["junco-classic-recollection"]?.items?.length, 18);
    assert.equal(productIngredientSheets["junco-classic-recollection"]?.items[17]?.english, "Fragrance");
    assert.equal(productIngredientSheets["sdc-beauty-soap"]?.items.some((item) => item.english === "Fragrance"), false);
  });
  test("Products absent from the supplied document remain unpopulated", () => {
    assert.equal(productIngredientSheets["junco-classic-pure-collagen"], undefined);
    assert.equal(productIngredientSheets["junco-classic-clear-kakitannin"], undefined);
  });
  test("Quality history lives only in the ingredient sheets, not the detail pages", () => {
    const passed = "일본식품분석센터의 식품 안전 검사에 합격했습니다.";
    assert.equal(productIngredientSheets["junco-classic"]?.quality?.[0]?.includes(passed) && productIngredientSheets["junco-classic"]?.quality?.[0]?.includes("2017년 5월 9일"), true);
    assert.equal(productIngredientSheets["junco-classic-maternity"]?.quality?.[0]?.includes("2017년 5월 9일"), true);
    assert.equal(productIngredientSheets["junco-classic-baby"]?.quality?.[0]?.includes("2015년 11월 12일"), true);
    assert.equal(productIngredientSheets["sdc-beauty-soap"]?.quality, undefined);
  });
});