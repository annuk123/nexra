import { Section } from "@/design-system/layout/Section";
export default function StructureReasoning() {
  return (
<Section>
  <h2 className="text-3xl sm:text-4xl font-semibold max-w-3xl">
    Structured reasoning, not instant answers.
  </h2>

  <p className="mt-4 text-neutral-400 max-w-2xl">
    Nexra breaks ideas into assumptions, risks, competitors, and demand signals—then maps what to build.
  </p>

  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
      <p className="text-xs text-neutral-500">Layer 1</p>
      <h3 className="mt-2 font-medium">Assumptions</h3>
      <p className="mt-2 text-sm text-neutral-400">
        Core hypotheses that must hold true.
      </p>
    </div>

    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
      <p className="text-xs text-neutral-500">Layer 2</p>
      <h3 className="mt-2 font-medium">Market & Demand</h3>
      <p className="mt-2 text-sm text-neutral-400">
        Who cares, why they care, and how big it is.
      </p>
    </div>

    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
      <p className="text-xs text-neutral-500">Layer 3</p>
      <h3 className="mt-2 font-medium">Competition</h3>
      <p className="mt-2 text-sm text-neutral-400">
        Existing solutions and differentiation gaps.
      </p>
    </div>

    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
      <p className="text-xs text-neutral-500">Layer 4</p>
      <h3 className="mt-2 font-medium">Risks & Blind Spots</h3>
      <p className="mt-2 text-sm text-neutral-400">
        Failure modes before launch.
      </p>
    </div>

  </div>

  <p className="mt-8 text-sm text-neutral-400 max-w-xl">
    This is how great founders think. Nexra makes it systematic.
  </p>
</Section>


  );
}