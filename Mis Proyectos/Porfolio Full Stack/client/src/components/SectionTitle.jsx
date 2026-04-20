function SectionTitle({ eyebrow, title }) {
  return (
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.3em] text-brand-200">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
    </div>
  );
}

export default SectionTitle;

