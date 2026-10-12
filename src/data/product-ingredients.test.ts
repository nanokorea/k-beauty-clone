import { describe, expect, test } from "bun:test";
import { productIngredientSheets } from "./product-ingredients";

describe("Supplied ingredient sheet assignments", () => {
  test("Baby uses page 14's 16 ingredients including royal jelly, not maternity additions", () => {
    const sheet = productIngredientSheets["junco-classic-baby"];
    expect(sheet?.page).toBe(14);
    expect(sheet?.items).toHaveLength(16);
    expect(sheet?.items[0]?.english).toBe("Water");
    expect(sheet?.items[1]?.english).toBe("Royal Jelly");
    expect(sheet?.items.some((item) => item.english === "Propolis Extract")).toBe(false);
  });
  test("Maternity uses page 15 including conchiolin and propolis", () => {
    const sheet = productIngredientSheets["junco-classic-maternity"];
    expect(sheet?.page).toBe(15);
    expect(sheet?.items).toHaveLength(21);
    expect(sheet?.items[18]?.english).toBe("Hydrolyzed Conchiolin");
    expect(sheet?.items[19]?.english).toBe("Propolis Extract");
  });
  test("SDC and Recollection retain separate lists on pages 16 and 17", () => {
    expect(productIngredientSheets["sdc-beauty-soap"]?.items).toHaveLength(15);
    expect(productIngredientSheets["junco-classic-recollection"]?.items).toHaveLength(18);
    expect(productIngredientSheets["junco-classic-recollection"]?.items[17]?.english).toBe("Fragrance");
    expect(productIngredientSheets["sdc-beauty-soap"]?.items.some((item) => item.english === "Fragrance")).toBe(false);
  });
  test("Products absent from the supplied document remain unpopulated", () => {
    expect(productIngredientSheets["junco-classic-pure-collagen"]).toBeUndefined();
    expect(productIngredientSheets["junco-classic-clear-kakitannin"]).toBeUndefined();
  });
});