export default function RealityCheck({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="py-14">

      {/* Step indicator */}
      <p className="text-sm text-neutral-500">
        Step 4
      </p>

      {/* Section label */}
      <span className="text-xs tracking-widest text-neutral-500">
        REALITY CHECK
      </span>

      {/* Intro */}
      <p className="mt-4 text-neutral-400 max-w-xl">
        Here’s a grounded look at how this idea holds up in practice.
      </p>

      <div className="mt-16 space-y-16 max-w-xl">

        {/* Strengths */}
        <div>
          <h3 className="text-lg font-medium mb-4">
            Strengths
          </h3>
          <ul className="space-y-3 text-neutral-300 list-disc list-inside leading-relaxed">
            <li>Clear and relatable user pain</li>
            <li>Simple behavior change required</li>
            <li>Problem–solution fit is easy to explain</li>
          </ul>
        </div>

        {/* Weaknesses */}
        <div>
          <h3 className="text-lg font-medium mb-4">
            Weaknesses
          </h3>
          <ul className="space-y-3 text-neutral-300 list-disc list-inside leading-relaxed">
            <li>Existing alternatives already serve this need</li>
            <li>Distribution strategy is not yet clear</li>
            <li>Switching cost for users may be higher than expected</li>
          </ul>
        </div>

        {/* Conditions */}
        <div>
          <h3 className="text-lg font-medium mb-4">
            Conditions for success
          </h3>
          <ul className="space-y-3 text-neutral-300 list-disc list-inside leading-relaxed">
            <li>You identify a narrow initial user segment</li>
            <li>You discover a low-cost distribution channel</li>
            <li>You differentiate on a single, meaningful axis</li>
          </ul>
        </div>

      </div>

      {/* Continue */}
      <button
        onClick={onNext}
        className="mt-16 text-sm text-neutral-500 hover:text-neutral-300 transition"
      >
        Continue →
      </button>

    </div>
  );
}
