import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

export default function FAQPreview() {
  const questions = [
    { label: "Solo vs Squad participation rules", href: "/faq" },
    { label: "GitHub repository & official collaborator access", href: "/faq" },
    { label: "Certificates, ranking verification & prize distribution", href: "/faq" },
  ];

  return (
    <div className="rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/30">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
          <HelpCircle size={18} />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8e7a68]">
          Common Questions
        </p>
      </div>
      <h3 className="mt-5 font-serif text-3xl font-normal text-[#f0eae1]">
        Know the event before you build.
      </h3>
      <div className="mt-5 divide-y divide-sand-border/15 text-sm">
        {questions.map((q) => (
          <Link
            key={q.label}
            href={q.href}
            className="group flex items-center justify-between py-3.5 text-[#9e8e7c] transition-colors hover:text-[#f0eae1]"
          >
            <span>{q.label}</span>
            <ArrowRight size={15} className="text-[#8e7a68] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#c89f6d]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
