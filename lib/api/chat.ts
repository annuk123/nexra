const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function thinkWithNexra(
  messages: ChatMessage[]
): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/chat/think`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    throw new Error("Nexra failed to respond.");
  }

  return res.json();
}