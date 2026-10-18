import { test } from "node:test";
import assert from "node:assert/strict";
import { inquiryContact } from "./inquiry-contact";

test("member inquiries use saved name, email and contact number", () => {
  assert.deepEqual(inquiryContact({ full_name: "테스트 회원", email: "member@example.com", phone: "010-1234-5678" }, "account@example.com"),
    { name: "테스트 회원", email: "member@example.com", phone: "010-1234-5678" });
});
test("account email is available when profile contact data is missing", () => {
  assert.deepEqual(inquiryContact(null, "account@example.com"), { name: "", email: "account@example.com", phone: "" });
});