/**
 * DisclaimerBanner — persistent floating banner visible on all pages.
 * Reminds visitors that no internal AXA data/tools were used.
 */
export default function ConfidentialityBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-amber-500/15 bg-navy-950/95 backdrop-blur-md">
      <div className="section-container flex items-center justify-center gap-2 py-2">
        <svg className="h-3.5 w-3.5 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-[10px] leading-tight text-amber-200/50 sm:text-[11px]">
          <span className="font-semibold text-amber-400/70">Confidential</span>
          {" — "}All information is confidential. No internal AXA data, systems, or proprietary tools have been used. 
          Built entirely with open-source technologies and personal lab environments.
        </p>
      </div>
    </div>
  );
}
