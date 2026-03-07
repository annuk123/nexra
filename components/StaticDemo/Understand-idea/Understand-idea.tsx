export default function UnderstandIdea({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="py-14">

      <span className="text-xs tracking-widest text-neutral-500">
        NEXRA · UNDERSTANDING
      </span>

      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
        Let me think through your idea.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        I'm reflecting on what you described and mapping the core dynamics of the idea.
        If something feels off, you can clarify before we go deeper.
      </p>

      {/* Nexra reasoning output */}
      <div className="mt-12 space-y-6 text-neutral-300 leading-relaxed">

        <p>
          From what you described, the core of the idea seems to revolve around a
          friction point in how people currently handle a specific problem.
          The opportunity appears to come from simplifying or restructuring that behavior.
        </p>

        <p>
          One thing I'm trying to clarify is whether the real leverage is in
          the product itself or in the distribution channel used to reach users.
        </p>

        <p className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-3 rounded-md">
          The interesting question here is whether the value comes from solving
          a new problem — or solving an existing problem significantly better.
        </p>

        <p>
          I'm also wondering how users currently deal with this problem today.
          Understanding the existing behavior often reveals where the true
          friction lives.
        </p>

      </div>

      {/* Nexra probing questions */}
      <div className="mt-12 space-y-3 text-indigo-300">

        <p className="text-xs tracking-widest text-neutral-500">
          CONTINUE EXPLORING
        </p>

        <p>• What specific moment triggers the need for this product?</p>
        <p>• What would make someone switch from their current solution?</p>
        <p>• Is the problem frequent enough to create real demand?</p>

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