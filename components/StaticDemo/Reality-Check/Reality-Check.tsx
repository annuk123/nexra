export default function RealityCheck({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="py-14">

      <span className="text-xs tracking-widest text-neutral-500">
        NEXRA · REALITY CHECK
      </span>

      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
        Let’s look at this idea in the real world.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        Ideas often look strong in isolation. The real question is how they behave
        when they meet existing user habits, competitors, and distribution realities.
      </p>

      {/* Nexra reasoning */}
      <div className="mt-12 space-y-6 text-neutral-300 leading-relaxed max-w-xl">

        <p>
          One encouraging signal is that the problem appears easy to explain.
          When founders can describe the pain clearly, it often means users
          already recognize it in their daily workflow.
        </p>

        <p>
          However, the existence of existing alternatives introduces a challenge.
          Even imperfect tools can dominate simply because users are familiar
          with them. Convincing people to switch behavior usually requires a
          clear and immediate improvement.
        </p>

        <p>
          Another factor is distribution. Even strong ideas struggle if the
          path to the first hundred users is unclear. The product itself might
          work well, but discovery becomes the bottleneck.
        </p>

        {/* Highlight insight */}
        <p className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-3 rounded-md">
          The tension here is between a clear problem and uncertain distribution.
          Many startups fail not because the idea is wrong, but because they
          never reach the right early users.
        </p>

        <p>
          If this idea succeeds, it will likely happen by focusing on a narrow
          initial group of users and solving their version of the problem
          significantly better than existing solutions.
        </p>

      </div>

      {/* Continue exploring */}
      <div className="mt-12 space-y-3 text-indigo-300 max-w-xl">

        <p className="text-xs tracking-widest text-neutral-500">
          CONTINUE EXPLORING
        </p>

        <p>• Who would feel the strongest urgency to try this first?</p>
        <p>• What would make someone abandon their current solution?</p>
        <p>• How could the first 100 users realistically discover this?</p>

      </div>

      <button
        onClick={onNext}
        className="mt-12 text-sm text-neutral-500 hover:text-neutral-300 transition"
      >
        Continue thinking →
      </button>

    </div>
  );
}