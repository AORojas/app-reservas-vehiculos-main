function ProjectCard({ project }) {
  if (project.comingSoon) {
    return (
      <article className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(8,15,32,0.82))] p-4 md:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_30%)] opacity-80" />
        <div className="relative space-y-4">
          <div className="overflow-hidden rounded-[1.45rem] border border-dashed border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(8,15,32,0.88))]">
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#161b24] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-500/60" />
              </div>
              <div className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-xs text-slate-500">
                <span className="block truncate">nuevo-proyecto.dev</span>
              </div>
            </div>
            <div className="flex aspect-[1.7/1] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),rgba(8,15,28,0.72)_48%,rgba(8,15,28,0.92)_100%)] px-6 text-center">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Proximo caso</p>
                <p className="text-lg font-semibold text-slate-300">Espacio para proyecto real</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(8,15,32,0.9))] p-4 md:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)] opacity-80" />
      <div className="relative space-y-4">
        {project.image ? (
          <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#0a0f1b] shadow-[0_20px_55px_rgba(2,6,23,0.45)]">
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#161b24] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
              </div>
              <div className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-xs text-slate-300">
                <span className="block truncate">
                  {project.liveUrl
                    ?.replace(/^https?:\/\//, "")
                    .replace(/\/$/, "") || "juegosrapidos.netlify.app"}
                </span>
              </div>
            </div>

            <div className="relative aspect-[1.7/1] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),rgba(8,15,28,0.72)_48%,rgba(8,15,28,0.92)_100%)]">
              <img
                src={project.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-125 object-cover object-center opacity-40 blur-2xl"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_42%),linear-gradient(180deg,rgba(8,15,28,0.08),rgba(8,15,28,0.38))]" />
              <img
                src={project.image}
                alt={`Vista previa de ${project.title}`}
                className="relative z-10 block h-full w-full object-contain object-center"
              />
              <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(2,6,23,0.14))]" />
            </div>
          </div>
        ) : null}

        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
