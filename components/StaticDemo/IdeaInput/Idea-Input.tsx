export default function IdeaInput({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="py-14">
      <span className="text-xs tracking-widest text-neutral-500">
        IDEA
      </span>

      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
        What are you thinking of building?
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        Explain it the way you would to a thoughtful friend. 
        Don’t worry about being perfect — clarity matters more than polish.
      </p>

      <textarea
        className="mt-10 w-full h-44 bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-neutral-100"
        placeholder="I’m thinking of building..."
      />

      <button
        onClick={onNext}
        className="mt-10 text-sm text-neutral-500 hover:text-neutral-300 transition"
      >
        Start analysis →
      </button>
    </div>
  );
}