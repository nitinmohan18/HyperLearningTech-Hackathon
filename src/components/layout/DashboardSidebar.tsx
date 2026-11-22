"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Github, CheckSquare, Send, ArrowLeft } from "lucide-react";

const links=[["Overview","/dashboard",LayoutDashboard],["Team","/dashboard/team",Users],["Repository","/dashboard/repository",Github],["Checkpoints","/dashboard/checkpoints",CheckSquare],["Submission","/dashboard/submission",Send]];
export default function DashboardSidebar(){
 const pathname=usePathname();
 return <aside className="border-b border-line bg-[#0b101d] lg:w-64 lg:border-b-0 lg:border-r"><div className="p-4"><Link href="/" className="flex items-center gap-2 text-xs text-slate-400"><ArrowLeft size={14}/>Public site</Link><nav className="mt-5 flex gap-2 overflow-x-auto lg:flex-col">{links.map(([label,href,Icon])=>{const active=pathname===href; const I=Icon as typeof LayoutDashboard; return <Link key={String(href)} href={String(href)} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${active?"bg-electric/10 text-white":"text-slate-400"}`}><I size={17}/>{String(label)}</Link>})}</nav></div></aside>;
}