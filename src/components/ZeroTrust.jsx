import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ZeroTrustDiagram from "./ZeroTrustDiagram";

const WHY_REASONS = [
  {
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
    title: "Lateral Movement in VMware",
    desc: "On the flat VMnet (NAT), the Kali VM moved freely to Win-Finance and Ubuntu Server — all VMs shared the same network segment with zero identity checks.",
    color: "#ef4444",
  },
  {
    icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    title: "No Identity Provider",
    desc: "Without Microsoft Entra ID, any VM on the VMnet was implicitly trusted — SMB shares, databases, and services were accessible without authentication or MFA.",
    color: "#f59e0b",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Entra ID + Conditional Access",
    desc: "With Azure Student subscription, Entra ID enforces MFA, Conditional Access policies, and device compliance — each VM access request is verified before granting entry.",
    color: "#10b981",
  },
];

/**
 * Zero Trust — Before vs After architecture comparison with rationale.
 */
export default function ZeroTrust() {
  return (
    <section id="zerotrust" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            label="Zero Trust"
            title="Zero Trust Access Architecture"
            subtitle="VMware pentest revealed critical gaps in the flat VMnet model. With Microsoft Entra ID (Azure Student), the architecture evolved to enforce identity-first access on every VM."
          />
        </ScrollReveal>

        {/* Before vs After Diagram */}
        <ScrollReveal delay={0.08}>
          <div className="mb-10 rounded-xl border border-navy-700 bg-navy-950/50 p-4 md:p-8">
            <ZeroTrustDiagram />
          </div>
        </ScrollReveal>

        {/* Why Zero Trust? */}
        <ScrollReveal delay={0.15}>
          <h3 className="mb-4 text-center font-mono text-xs tracking-widest text-gray-500 uppercase">
            Why Zero Trust Was Implemented
          </h3>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {WHY_REASONS.map((r, i) => (
            <ScrollReveal key={r.title} delay={0.18 + i * 0.06}>
              <div className="card h-full">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: r.color + "15" }}>
                  <svg className="h-5 w-5" style={{ color: r.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={r.icon} />
                  </svg>
                </div>
                <h4 className="mb-1.5 text-sm font-semibold text-white">{r.title}</h4>
                <p className="text-xs leading-relaxed text-gray-400">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
