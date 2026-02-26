/**
 * SectionHeading — Reusable section title with label, heading and optional subtext.
 */
export default function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-14 max-w-3xl">
      {label && (
        <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 font-mono text-xs tracking-widest text-accent-light uppercase">
          {label}
        </span>
      )}
      <h2 className="mt-2 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-gray-400">{subtitle}</p>
      )}
    </div>
  );
}
