"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Github, CheckSquare, Send, ArrowLeft } from "lucide-react";

const links = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Team & Proposal", href: "/dashboard/team", icon: Users },
  { label: "Repository Setup", href: "/dashboard/repository", icon: Github },
  { label: "Checkpoints Log", href: "/dashboard/checkpoints", icon: CheckSquare },
  { label: "Final Submission", href: "/dashboard/submission", icon: Send },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-sand-border/30 bg-[#0d0a08]/75 backdrop-blur-md lg:w-64 lg:border-b-0 lg:border-r">
      <div className="p-4 lg:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#8e7a68] transition hover:text-[#f0eae1]"
        >
          <ArrowLeft size={13} />
          Back to Public Site
        </Link>

        <div className="mt-6 border-b border-sand-border/15 pb-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#8e7a68]">
            Workspace
          </p>
          <p className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">
            Participant Portal
          </p>
        </div>

        <nav className="mt-4 flex gap-1.5 overflow-x-auto lg:flex-col">
          {links.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all ${
                  active
                    ? "border border-[#c89f6d]/30 bg-[#c89f6d]/10 text-[#c89f6d] font-semibold"
                    : "text-[#9e8e7c] hover:bg-white/[0.04] hover:text-[#f0eae1]"
                }`}
              >
                <Icon size={16} className={active ? "text-[#c89f6d]" : "text-[#8e7a68]"} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
