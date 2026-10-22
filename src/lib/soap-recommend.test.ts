import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ensureFlagship, normalizeRecommendations } from "./soap-recommend";

describe("ensureFlagship", () => {
  it("adds JUNCO CLASSIC SOAP when there is room", () => {
    const result = ensureFlagship([{ slug: "junco-classic-baby", reason: "a" }], "대표");
    assert.deepEqual(result.map((r) => r.slug), ["junco-classic-baby", "junco-classic"]);
  });

  it("replaces the last of 3 recommendations with JUNCO CLASSIC SOAP", () => {
    const result = ensureFlagship(
      [
        { slug: "junco-classic-pure-collagen", reason: "a" },
        { slug: "junco-classic-baby", reason: "b" },
        { slug: "sdc-beauty-soap", reason: "c" },
      ],
      "대표",
    );
    assert.deepEqual(result.map((r) => r.slug), ["junco-classic-pure-collagen", "junco-classic-baby", "junco-classic"]);
  });

  it("keeps the list unchanged when JUNCO CLASSIC SOAP is already recommended", () => {
    const recs = [{ slug: "junco-classic-baby", reason: "a" }, { slug: "junco-classic", reason: "b" }];
    assert.deepEqual(ensureFlagship(recs, "대표"), recs);
  });
});

const slugs = ["junco-classic", "junco-classic-baby", "sdc-beauty-soap", "junco-classic-recollection"];

describe("normalizeRecommendations", () => {
  it("drops products that are not sold on the site", () => {
    const result = normalizeRecommendations([{ slug: "other-brand", reason: "x" }, { slug: "junco-classic", reason: "보습" }], slugs);
    assert.deepEqual(result.map((r) => r.slug), ["junco-classic"]);
  });

  it("recommends at most 3 products without duplicates", () => {
    const result = normalizeRecommendations(
      [
        { slug: "junco-classic", reason: "a" },
        { slug: "junco-classic", reason: "b" },
        { slug: "junco-classic-baby", reason: "c" },
        { slug: "sdc-beauty-soap", reason: "d" },
        { slug: "junco-classic-recollection", reason: "e" },
      ],
      slugs,
    );
    assert.deepEqual(result.map((r) => r.slug), ["junco-classic", "junco-classic-baby", "sdc-beauty-soap"]);
  });

  it("drops recommendations without a reason", () => {
    assert.deepEqual(normalizeRecommendations([{ slug: "junco-classic", reason: "  " }], slugs), []);
  });
});
