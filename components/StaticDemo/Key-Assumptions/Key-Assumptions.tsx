export default function KeyAssumptions({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="py-14">

      <span className="text-xs tracking-widest text-neutral-500">
        NEXRA · ASSUMPTIONS
      </span>

      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
        Let’s examine what this idea depends on.
      </h2>

      <p className="mt-4 text-neutral-400 max-w-xl">
        Every startup idea rests on a few hidden assumptions.  
        If those assumptions fail, the idea struggles — even if the product is well built.
      </p>

      {/* Nexra reasoning */}
      <div className="mt-12 space-y-6 text-neutral-300 leading-relaxed">

        <p>
          The first assumption is that the problem you're addressing
          actually occurs frequently enough in people's lives to create
          real urgency. If the pain is occasional, users may not look
          for a dedicated solution.
        </p>

        <p>
          Another assumption is that current solutions feel frustrating
          or inefficient. If existing tools already work well enough,
          switching behavior becomes difficult.
        </p>

        <p>
          There's also a distribution assumption: that the people who
          experience this problem can be reached without unsustainable
          marketing costs or complex partnerships.
        </p>

        {/* Highlighted insight */}
        <p className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-3 rounded-md">
          If any one of these assumptions breaks — demand, dissatisfaction,
          or distribution — the idea may struggle to gain traction.
        </p>

      </div>

      {/* Exploration questions */}
      <div className="mt-12 space-y-3 text-indigo-300">

        <p className="text-xs tracking-widest text-neutral-500">
          CONTINUE EXPLORING
        </p>

        <p>• When does this problem occur most often for users?</p>
        <p>• What do people currently use instead?</p>
        <p>• How would the first 100 users realistically discover this product?</p>

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