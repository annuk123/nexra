import { changelog } from "@/lib/changelog";
import ChangelogItem from "@/components/changelog-item/changelog-item";

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">

      <h1 className="text-3xl font-semibold mb-4 text-zinc-300">
        Nexra Changelog
      </h1>
      <p className="text-lg text-neutral-400 mb-16">
       Nexra evolves continuously.  
This log documents how the thinking engine improves over time.
      </p>

      <div>
        {changelog.map((release) => (
          <ChangelogItem
            key={release.version}
            release={release}
          />
        ))}
      </div>

    </div>
  );
}