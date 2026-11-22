import Link from "next/link";
import { LayoutDashboard, Users, Github, ClipboardCheck, Gavel, CreditCard } from "lucide-react";

const links=[["Overview","/admin",LayoutDashboard],["Registrations","/admin/registrations",Users],["Repositories","/admin/repositories",Github],["Checkpoints","/admin/checkpoints",ClipboardCheck],["Judging","/admin/judging",Gavel],["Payments","/admin/payments",CreditCard]];
export default function AdminLayout({children}:{children:React.ReactNode}) {
 return <div className="min-h-[700px] lg:flex"><aside className="border-b border-line bg-[#0b101d] lg:w-60 lg:border-b-0 lg:border-r"><div className="p-4"><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin demo</p><nav className="mt-4 flex gap-2 overflow-x-auto lg:flex-col">{links.map(([label,href,Icon])=>{const I=Icon as typeof LayoutDashboard;return <Link key={String(href)} href={String(href)} className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400"><I size={17}/>{String(label)}</Link>})}</nav></div></aside><div className="min-w-0 flex-1"><div className="container-site py-8 lg:px-10">{children}</div></div></div>;
}