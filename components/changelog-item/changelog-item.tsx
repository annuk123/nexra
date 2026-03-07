type Release = {
  version: string;
  title: string;
  date: string;
  items: string[];
};

export default function ChangelogItem({ release }: { release: Release }) {
  return (
    <div className="relative pl-8 pb-12">

      {/* timeline dot */}
      <span className="absolute left-0 top-1.5 w-3 h-3 bg-neutral-300 rounded-full"></span>

      {/* vertical line */}
      <span className="absolute left-1.25 top-4 bottom-0 w-px bg-neutral-800"></span>

      <h3 className="text-lg font-semibold text-zinc-300 mb-1">
        V{release.version} — {release.title}
      </h3>

      <p className="text-sm text-neutral-500 mb-4">
        {release.date}
      </p>

      <ul className="space-y-1 text-sm text-neutral-300">
        {release.items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>

    </div>
  );
}