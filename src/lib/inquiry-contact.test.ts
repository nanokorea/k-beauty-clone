import { test, expect } from "bun:test";
import { inquiryContact } from "./inquiry-contact";

test("member inquiries use saved name, email and contact number", () => {
  expect(inquiryContact({ full_name: "테스트 회원", email: "member@example.com", phone: "010-1234-5678" }, "account@example.com"))
    .toEqual({ name: "테스트 회원", email: "member@example.com", phone: "010-1234-5678" });
});
test("account email is available when profile contact data is missing", () => {
  expect(inquiryContact(null, "account@example.com")).toEqual({ name: "", email: "account@example.com", phone: "" });
});