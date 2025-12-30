export default function HowThink() {
  return (
<div>  
        
  {/* Section label */}
  <span className="text-xs tracking-widest text-neutral-400">
    HOW NEXRA THINKS
  </span>

  {/* Title */}
  <h2 className="mt-4 text-3xl sm:text-4xl font-semibold max-w-2xl">
    Structured reasoning over instant answers.
  </h2>

  {/* Divider */}
  <div className="w-12 h-px bg-neutral-700 my-10" />

  {/* Thinking steps */}
  <div className="space-y-12 max-w-3xl">

    {/* Step 01 */}
    <div>
      <p className="text-sm text-neutral-500 mb-2">01</p>
      <h3 className="text-xl font-medium mb-2">
        Deconstruct the idea
      </h3>
      <p className="text-neutral-300 leading-relaxed">
        Nexra breaks your idea into its core components; problem,
        audience, behavior, and constraints; to remove ambiguity
        before analysis begins.
      </p>
    </div>

    {/* Step 02 */}
    <div>
      <p className="text-sm text-neutral-500 mb-2">02</p>
      <h3 className="text-xl font-medium mb-2">
        Surface hidden assumptions
      </h3>
      <p className="text-neutral-300 leading-relaxed">
        Most ideas fail not because they’re bad,
        but because assumptions go unchallenged.
        Nexra identifies what you’re implicitly betting on.
      </p>
    </div>

    {/* Step 03 */}
    <div>
      <p className="text-sm text-neutral-500 mb-2">03</p>
      <h3 className="text-xl font-medium mb-2">
        Pressure-test decisions
      </h3>
      <p className="text-neutral-300 leading-relaxed">
        Before execution, Nexra evaluates trade-offs,
        second-order effects, and realistic outcomes;
        so you commit with eyes open.
      </p>
    </div>

  </div>
</div>  
  );
}
