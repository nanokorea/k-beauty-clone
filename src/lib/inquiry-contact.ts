export function inquiryContact(profile: { full_name: string | null; email: string | null; phone: string | null } | null, accountEmail?: string) {
  return { name: profile?.full_name ?? "", email: profile?.email || accountEmail || "", phone: profile?.phone ?? "" };
}