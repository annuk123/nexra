export default function Decision({
  onFinish,
}: {
  onFinish?: () => void;
}) {
  return (
    <div className="py-14">

      {/* Step indicator */}
      <p className="text-sm text-neutral-500">
        Step 5
      </p>

      {/* Section label */}
      <span className="text-xs tracking-widest text-neutral-500">
        DECISION
      </span>

      {/* Intro */}
      <p className="mt-4 text-neutral-400 max-w-xl">
        Based on the analysis above, here’s my recommendation.
      </p>

      <div className="mt-16 space-y-12">

        {/* Decision */}
        <div>
          <h2 className="text-2xl font-semibold">
            Refine before committing
          </h2>
          <p className="mt-4 text-neutral-300 leading-relaxed max-w-xl">
            This idea shows early promise, but several assumptions —
            particularly around distribution and differentiation —
            need validation before moving forward with confidence.
          </p>
        </div>

        {/* Next steps */}
        <div>
          <h3 className="text-lg font-medium mb-4">
            Suggested next steps
          </h3>
          <ul className="space-y-3 text-neutral-300 list-disc list-inside leading-relaxed max-w-xl">
            <li>Define a narrower initial user segment</li>
            <li>Validate the core pain through direct conversations</li>
            <li>Test whether existing alternatives truly fall short</li>
          </ul>
        </div>

      </div>

      {/* Finish */}
      <button
        onClick={onFinish}
        className="mt-16 text-sm text-neutral-500 hover:text-neutral-300 transition"
      >
        Finish →
      </button>

    </div>
  );
}
