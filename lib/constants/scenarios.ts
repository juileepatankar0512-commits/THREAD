export type PhoneMode = "chat" | "reminder" | "ticket" | "office";
export const scenarios: Array<{ number: string; title: string; italic: string; copy: string; mode: Exclude<PhoneMode, "chat"> }> = [
  { number: "02 — REMINDER", title: "Implicit references.", italic: "Resolved.", copy: "THREAD identifies the active document and the calendar context behind “this Friday.”", mode: "reminder" },
  { number: "03 — TICKET", title: "Useful context.", italic: "Right on time.", copy: "A useful next action, surfaced from an authorized, visible piece of context.", mode: "ticket" },
  { number: "04 — OFFICE KIT", title: "Move context,", italic: "not yourself.", copy: "Phone → laptop. Without losing the meaning of “that.”", mode: "office" },
];
