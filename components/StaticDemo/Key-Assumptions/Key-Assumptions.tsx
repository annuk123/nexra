export default function KeyAssumptions({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="py-14">

      {/* Step indicator */}
      <p className="text-sm text-neutral-500">
        Step 3
      </p>

      {/* Section label */}
      <span className="text-xs tracking-widest text-neutral-500">
        KEY ASSUMPTIONS
      </span>

      {/* Intro */}
      <p className="mt-4 text-neutral-400 max-w-xl">
        For this idea to work, the following must be true:
      </p>

      {/* Assumptions */}
      <ol className="mt-12 space-y-8 list-decimal list-inside text-neutral-300 leading-relaxed">
        <li>
          Users experience this problem frequently enough to care.
        </li>
        <li>
          Existing alternatives feel insufficient or frustrating.
        </li>
        <li>
          You can reach these users without unsustainable costs.
        </li>
      </ol>

      {/* Warning */}
      <p className="mt-10 text-sm text-neutral-500 max-w-xl">
        If any of these fail, the idea struggles.
      </p>

      {/* Continue */}
      <button
        onClick={onNext}
        className="mt-12 text-sm text-neutral-500 hover:text-neutral-300 transition"
      >
        Continue →
      </button>

    </div>
  );
}
