"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faq";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="container-site section-pad"><p className="eyebrow">FAQ</p><h1 className="section-title">Frequently asked questions.</h1><div className="mt-10 max-w-3xl">{faqs.map((faq,i) => <div key={faq.question} className="border-b border-line"><button type="button" className="flex w-full items-center justify-between py-5 text-left font-semibold" aria-expanded={open===i} onClick={() => setOpen(open===i?null:i)}>{faq.question}<ChevronDown size={18} className={open===i?"rotate-180 text-cyan":"text-slate-500"} /></button>{open===i && <p className="pb-5 text-sm leading-7 text-slate-400">{faq.answer}</p>}</div>)}</div></div>;
}