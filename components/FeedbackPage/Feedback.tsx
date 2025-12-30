"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


export default function Feedback() {
  const submitFeedback = useMutation(api.feedback.submitFeedback);

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [form, setForm] = useState({
    reasonForJoining: "",
    hardestPart: "",
    decisionProcess: "",
    usefulness: "",
    confusion: "",
  });
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitFeedback({
        ...form,
        source: "post-decision",
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-xl">
        <p className="text-neutral-300">
          Thank you for sharing your thoughts.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          We read every response carefully.
        </p>
      </div>
    );
  }

  return (
    <div >
      <span className="text-xs tracking-widest text-neutral-400">FEEDBACK</span>

      <h2 className="mt-4 text-neutral-200 text-3xl sm:text-4xl font-semibold max-w-xl">
        Help us build Nexra the right way.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        We’re building Nexra carefully. Your answers help us avoid building the
        wrong thing. This is optional and takes 2–3 minutes.
      </p>

      <form onSubmit={handleSubmit} className="mt-16 space-y-14 max-w-xl">
        {/* Q1 */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-500">
            What made you join the Nexra waitlist today?
          </label>
          <Textarea
            required
            value={form.reasonForJoining}
            onChange={(e) =>
            setForm({ ...form, reasonForJoining: e.target.value })
          }
            placeholder="One or two sentences is enough."
            className="h-32 text-neutral-400"
          />
        </div>

        {/* Q2 */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-500">
            What part of evaluating startup ideas feels hardest for you right
            now?
          </label>
          <Textarea value={form.hardestPart}
          onChange={(e) =>
            setForm({ ...form, hardestPart: e.target.value })
          } className="h-32 text-neutral-400" />
        </div>

        {/* Q3 */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-500">
            How do you currently decide whether to pursue an idea or drop it?
          </label>
          <Textarea 
          value={form.decisionProcess}
          onChange={(e) =>
          setForm({ ...form, decisionProcess: e.target.value })
          }
          className="h-32 text-neutral-400" />
        </div>

        {/* Q4 */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-500">
            What would make a tool like Nexra genuinely useful for you?
          </label>
          <Textarea 
          value={form.usefulness}
          onChange={(e) =>
            setForm({ ...form, usefulness: e.target.value })
          } 
          className="h-32 text-neutral-400" />
        </div>

        {/* Q5 */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-500">
            Anything that felt unclear, missing, or confusing?
          </label>
          <Textarea 
          value={form.confusion}
          onChange={(e) =>
            setForm({ ...form, confusion: e.target.value })
          } 
          className="h-32 text-neutral-400" />
        </div>

        <Button
        type="submit"
          variant="ghost"
          className="p-3 text-neutral-300 "
        >
          Submit feedback →
        </Button>
        
        {status === "error" && (
        <p className="text-sm text-neutral-500">
          Something went wrong. Please try again.
        </p>
      )}
      </form>

      <p className="mt-10 text-xs text-neutral-500 max-w-md">
        We read every response carefully. No automated replies. No spam.
      </p>
    </div>
  );
}
