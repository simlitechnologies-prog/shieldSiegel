import type { ContactMessage } from "@/types";

export const messages: ContactMessage[] = [
  { id: "msg-01", name: "Sarah Whitman", email: "sarah.w@email.com", phone: "+1 (555) 211-0091", subject: "Question about contract review", message: "I need help reviewing a vendor contract before signing.", status: "unread", createdAt: "2026-06-24" },
  { id: "msg-02", name: "Robert Lin", email: "robert.lin@email.com", subject: "Custody modification", message: "I'd like to discuss modifying my custody arrangement.", status: "unread", createdAt: "2026-06-23" },
  { id: "msg-03", name: "Angela Brooks", email: "angela.b@email.com", phone: "+1 (555) 778-2210", subject: "Workplace discrimination", message: "I believe I was discriminated against at my workplace.", status: "read", createdAt: "2026-06-21" },
  { id: "msg-04", name: "Felix Tanaka", email: "felix.t@email.com", subject: "Immigration status inquiry", message: "Need guidance on renewing my work visa.", status: "read", createdAt: "2026-06-19" },
  { id: "msg-05", name: "Maria Gonzalez", email: "maria.g@email.com", subject: "Real estate closing", message: "Need an attorney for an upcoming home closing.", status: "archived", createdAt: "2026-06-15" },
];
