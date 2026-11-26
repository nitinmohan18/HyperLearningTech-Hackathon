import { Gift } from "lucide-react";

export default function HiddenSurprises() {
  return (
    <div className="rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/30">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
          <Gift size={18} />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8e7a68]">
          Hidden Surprises
        </p>
      </div>
      <h3 className="mt-5 font-serif text-3xl font-normal text-[#f0eae1]">
        Promising work deserves <span className="font-serif italic text-[#c89f6d]">recognition.</span>
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-[#9e8e7c]">
        Additional surprise rewards may conditionally be offered if the event achieves more than 75% ROI. These rewards are not guaranteed. Exact categories, recipients, and formats are intentionally undisclosed to keep the focus purely on builder creativity and passion.
      </p>
    </div>
  );
}
