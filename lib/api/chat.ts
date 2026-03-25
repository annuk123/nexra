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
  limit: number | null;
}

export type NexraMode = "balanced" | "strict" | "supportive";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nexra_access_token");
}

export function isSignedIn(): boolean {
  return !!getAccessToken();
}

// ── Non-streaming (kept as fallback) ──────────────────────

export async function thinkWithNexra(
  messages: ChatMessage[],
  mode: NexraMode = "balanced",
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
    body: JSON.stringify({ messages, mode }),
  });

  if (res.status === 429) {
    const data = await res.json();
    throw new Error(data.detail?.message ?? "Session limit reached");
  }

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}

// ── Streaming ─────────────────────────────────────────────

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;        // called for each text chunk
  onDone: (meta: {                         // called when stream completes
    sessions_remaining: number | null;
    limit: number | null;
  }) => void;
  onError: (message: string) => void;      // called on error
}

export async function thinkWithNexraStream(
  messages: ChatMessage[],
  mode: NexraMode = "balanced",
  callbacks: StreamCallbacks,
): Promise<void> {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;

  try {
    res = await fetch(`${API_URL}/chat/think/stream`, {
      method: "POST",
      headers,
      body: JSON.stringify({ messages, mode }),
    });
  } catch {
    callbacks.onError("Connection failed. Try again.");
    return;
  }

  if (res.status === 429) {
    const data = await res.json();
    throw new Error(data.detail?.message ?? "Session limit reached");
  }

  if (!res.ok) {
    callbacks.onError("Something went wrong. Try again.");
    return;
  }

  const reader = res.body?.getReader();
  if (!reader) {
    callbacks.onError("Streaming not supported.");
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE events are separated by double newlines
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? ""; // keep incomplete event in buffer

    for (const event of events) {
      const line = event.trim();
      if (!line.startsWith("data: ")) continue;

      try {
        const data = JSON.parse(line.slice(6)); // strip "data: "

        if (data.type === "chunk") {
          callbacks.onChunk(data.content);
        } else if (data.type === "message") {
          // Full message in one shot (greetings, edge cases)
          callbacks.onChunk(data.content);
        } else if (data.type === "done") {
          callbacks.onDone({
            sessions_remaining: data.sessions_remaining,
            limit: data.limit,
          });
        } else if (data.type === "error") {
          callbacks.onError(data.content);
        }
      } catch {
        // Malformed event — skip
      }
    }
  }
}

// ── Auth ──────────────────────────────────────────────────

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
  document.cookie = "nexra_access_token=; path=/; max-age=0";
  window.location.href = "/";
}