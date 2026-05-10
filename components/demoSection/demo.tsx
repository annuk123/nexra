export default function DemoSection() {
  return (
    <section id="demo" className="py-24 px-4 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        {/* Section label + heading */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
            See it in action
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Watch Nexra challenge a real founder
          </h2>
          <p className="text-neutral-400 mt-3 text-base max-w-xl mx-auto">
            No fluff. No validation. Just the kind of thinking you wish you had
            a co-founder for.
          </p>
        </div>

        {/* Video wrapper */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
          
          {/* Subtle top bar like a browser/app chrome */}
          <div className="bg-neutral-900 px-4 py-3 flex items-center gap-2 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="ml-3 text-xs text-neutral-600 font-mono">
              nexralab.com — live session
            </span>
          </div>

          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=dfepqicgm&public_id=Video_Project_nte8uk&autoplay=true&muted=true&loop=true&controls=false&playsinline=true"
            style={{ width: "100%", aspectRatio: "640 / 360", display: "block" }}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>

        {/* Bottom note */}
        <p className="text-center text-neutral-600 text-sm mt-6">
          Real conversation. No script.
        </p>

      </div>
    </section>
  );
}
