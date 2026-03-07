export default function Decision({
  onFinish,
}: {
  onFinish?: () => void;
}) {
  return (
    <div className="py-14">

      <span className="text-xs tracking-widest text-neutral-500">
        NEXRA · DECISION
      </span>

      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
        Here’s how this idea looks overall.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        After walking through the problem, assumptions, and real-world dynamics,
        this is the direction that seems most reasonable.
      </p>

      <div className="mt-12 space-y-10 max-w-xl text-neutral-300 leading-relaxed">

        {/* Verdict */}
        <div>
          <h3 className="text-xl font-semibold">
            Refine before committing
          </h3>

          <p className="mt-4">
            The idea shows early promise, particularly in how clearly the
            problem can be explained. However, the path to reaching users
            and differentiating from existing solutions still needs clarity.
          </p>

          <p className="mt-4">
            Without validating those pieces first, building the full product
            would carry unnecessary risk.
          </p>
        </div>

        {/* Highlight insight */}
        <p className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-3 rounded-md">
          The idea itself isn’t the biggest uncertainty — distribution is.
          If you discover a reliable path to early users, the concept becomes
          significantly stronger.
        </p>

        {/* Next moves */}
        <div>
          <h4 className="text-lg font-medium mb-4">
            What I would test next
          </h4>

          <ul className="space-y-3 list-disc list-inside">
            <li>Define a narrow group of early adopters</li>
            <li>Talk directly with potential users to confirm the pain</li>
            <li>Understand why existing tools fail for them</li>
            <li>Explore how the first 100 users could realistically find the product</li>
          </ul>
        </div>

      </div>

      <button
        onClick={onFinish}
        className="mt-16 text-sm text-neutral-500 hover:text-neutral-300 transition"
      >
        Analyze another idea →
      </button>

    </div>
  );
}