export default function IdeaInput({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="py-14">
      <p className="text-sm text-neutral-500">
        Step 1
      </p>
      <span className="text-xs tracking-widest text-neutral-500">
        IDEA INPUT
      </span>

      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
        Describe your startup idea.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        Write it the way you’d explain it to a thoughtful friend.
        Clarity matters more than polish.
      </p>

      <textarea
        className="mt-10 w-full h-44 bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-neutral-100"
        placeholder="I’m thinking of building…"
      />

      <button
        onClick={onNext}
        className="mt-10 text-sm text-neutral-500 hover:text-neutral-300 transition"
      >
        Continue →
      </button>
    </div>
  );
}
