// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// export type ChatMessage = {
//   role: "user" | "assistant";
//   content: string;
// };

// export async function thinkWithNexra(
//   messages: ChatMessage[]
// ): Promise<{ message: string }> {
//   const res = await fetch(`${API_BASE_URL}/chat/think`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ messages }),
//   });

//   if (!res.ok) {
//     throw new Error("Nexra failed to respond.");
//   }

//   return res.json();
// }


// lib/api/chat.ts

// lib/api/chat.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatThinkOut {
  message: string;
  sessions_remaining: number | null;
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nexra_access_token");
}

export function isSignedIn(): boolean {
  return !!getAccessToken();
}

export async function thinkWithNexra(
  messages: ChatMessage[]
): Promise<ChatThinkOut> {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/chat/think`, {
    method: "POST",
    headers,
    body: JSON.stringify({ messages }),
  });

  // Handle session limit
  if (res.status === 429) {
    const data = await res.json();
    throw new Error(data.detail?.message ?? "Session limit reached");
  }

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}

// Pass redirect so FastAPI carries it through the OAuth flow
// FastAPI will append it to the callback redirect URL
export function signInWithGoogle(redirect = "/thinking-engine-v2.0") {
  const params = new URLSearchParams({ redirect });
  window.location.href = `${API_URL}/auth/google?${params}`;
}

export function signInWithGitHub(redirect = "/thinking-engine-v2.0") {
  const params = new URLSearchParams({ redirect });
  window.location.href = `${API_URL}/auth/github?${params}`;
}

export function signOut() {
  localStorage.removeItem("nexra_access_token");
  localStorage.removeItem("nexra_refresh_token");
  window.location.href = "/";
}