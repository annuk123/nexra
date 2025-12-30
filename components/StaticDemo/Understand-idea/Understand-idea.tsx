export default function UnderstandIdea({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <div className="py-14">
      <p className="text-sm text-neutral-500">
        Step 2
      </p>
      <span className="text-xs tracking-widest text-neutral-500">
        HOW I UNDERSTAND YOUR IDEA
      </span>

      <p className="mt-4 text-neutral-400 max-w-xl">
        Here’s my current understanding. Correct anything that feels off.
      </p>

      {/* content */}
 <div className="mt-12 space-y-10"> 
  {[ 
    ["Problem", "What core issue the idea is trying to solve."], 
    ["Target user", "Who experiences this problem most acutely."], 
    ["Current behavior", "How the problem is handled today."], 
    ["Proposed change", "What your idea changes about that behavior."], 
    ["Key constraint", "The biggest limitation or risk factor."] ].map(([title, desc]) => ( <div key={title}> <h3 className="text-lg font-medium">{title}</h3> <p className="mt-2 text-neutral-400"> {desc} </p> </div> ))} 
    </div>
      <button
        onClick={onNext}
        className="mt-12 text-sm text-neutral-500 hover:text-neutral-300 transition"
      >
        Continue →
      </button>
    </div>
  );
}
