## Nexra — Founder Strategy Document (Serious Founder Version)

### 1) Vision
Nexra is an AI co-founder assistant that helps founders make clear decisions about startup ideas, strategy, and execution. It is not a chatbot, idea generator, or novelty tool. Nexra’s north star is **decision clarity and founder-level thinking**.

Long-term vision: Nexra becomes a persistent AI founder brain that understands markets, remembers decisions, and evolves with the startup.

---

### 2) Product Roadmap (Single Source of Truth)

####  V1 — Rule-Based Decision Engine (Already Live)
**Purpose:** Validate the core decision framework and founder workflows without heavy AI infra.

**Features:**
- Idea Analyze (structured evaluation)
- Verdict (KILL / ITERATE / BUILD)
- Next Steps (clear execution guidance)

**Goal:** Prove that founders value structured decision-making.

---

####  V2 — Lean AI Co-founder (Core Product Phase)
**Purpose:** Make Nexra feel like a real AI co-founder, not a tool.

**Core Modules:**
- Decision Engine v2 (hybrid rules + AI reasoning)
- OpenAI Narration (founder-style explanation of decisions)
- Founder Profiles (persona-based thinking: YC-style, Indie hacker, VC-backed, etc.)
- Debate Mode (AI argues both sides of an idea)
- Strategy Builder (template-driven plans for GTM, MVP, growth, etc.)

**Goal:** Position Nexra as a thinking partner, not just an analyzer.

---

####  V3 — AI Infra Product (Heavy, Long-Term)
**Purpose:** Turn Nexra into a market-aware intelligence system.

**Infra Features:**
- Market Snapshot (automatic industry overview)
- Competitor Discovery (crawl + AI summarization)
- Market Sizing Heuristics (TAM/SAM/SOM approximations)
- Web + API Data Ingestion (live signals)
- Vector DB Memory (long-term memory per startup)
- Long-term Learning (Nexra evolves with the startup)

**Goal:** Nexra becomes persistent startup intelligence infrastructure.

---

### 3) What NOT to Build (Founder Discipline)
To stay serious and YC-level:
- No generic chat UI clones
- No meme AI name generators in core product
- No bloated feature list without a clear founder workflow
- No heavy infra before V2 traction
- No consumer entertainment features in main Nexra product

Viral features (like Nexra Roast) must live in **separate microsites**, not core Nexra.

---

### 4) Positioning Narrative (Founder-Level)
**Nexra is not another AI SaaS tool.**
It is a **decision engine for founders**.

Tagline ideas:
- “Your AI Co-founder for Startup Decisions”
- “From Idea to Verdict”
- “Think Like a YC Partner”

---

### 5) Monetization Strategy
- Free: Basic analyze + verdict
- Pro: Debate Mode, Strategy Builder, Narration
- Premium: Market Snapshot, Competitor Discovery, Memory

Long-term: Nexra as subscription founder OS.

---

### 6) Founder Operating Principles
1. Decision clarity > AI gimmicks
2. Structured thinking > Chatty responses
3. Shipping > Perfect infra
4. YC-style discipline over indie chaos
5. Viral side tools should funnel into Nexra core

---

### 7) Milestones
**V1:** Prove founders use verdict-based decision-making.
**V2:** Make founders feel Nexra is a real thinking partner.
**V3:** Become AI market intelligence infrastructure.

---

### 8) Long-Term North Star
Nexra becomes:
- Persistent AI co-founder
- Market-aware strategist
- Memory-driven startup brain

Founders should feel: *“I don’t make big startup decisions without Nexra.”*





# Nexra — Project Context

## What it is
AI thinking partner for solo founders, indie hackers, early-stage builders.
Thinks WITH the founder, not at them. 
Positioning: "the co-founder you don't have at 11pm"

## Stack
- Frontend: Next.js 16 (Vercel) — nexralab.com
- Backend: FastAPI (Digital Ocean App Platform) — api.nexralab.com
- Database: Postgres (Docker local, DO managed in prod)
- AI: OpenAI gpt-4.1-mini
- Waitlist: Convex
- Auth: Custom OAuth (Google + GitHub) → JWT

## Key files
- app/auth/router.py — OAuth routes
- app/auth/dependencies.py — get_current_user
- app/auth/jwt.py — token create/decode
- app/api/chat.py — /chat/think endpoint
- app/domain/reasoning/narrator.py — OpenAI call
- app/domain/reasoning/personality.py — Nexra's identity
- app/domain/reasoning/conversation.py — history builder
- lib/api/chat.ts — frontend API calls
- middleware.ts — route protection

## Auth flow
Google/GitHub → FastAPI OAuth → JWT → 
/auth/callback (Next.js) → localStorage + cookie → 
middleware checks cookie → thinking engine

## Current state (v2)
✓ Auth (Google + GitHub)
✓ Conversation mode (multi-turn)
✓ Session counting (5/day, server-side)
✓ Postgres DB
✓ annu@nexralab.com email set up

## V3 planned
- Auto token refresh
- Persistent conversation history across sessions
- Founder memory layer
- Pricing / Stripe
- Dashboard

## Prompt architecture
- personality.py — Nexra's identity, convictions, what it knows
- narrator.py — first turn vs follow-up prompts
- Two modes: build_narration_prompt (turn 1), build_followup_prompt (follow-ups)
- Modes: balanced / strict / supportive

## Known issues / tech debt
- localStorage auth (should move to httpOnly cookies in v3)
- No token refresh yet (60min expiry)
- isLikelyIdea() frontend gate is basic
