import Link from "next/link";
import { LayoutDashboard, Users, Github, ClipboardCheck, Gavel, CreditCard, ArrowLeft } from "lucide-react";

const links = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Registrations", href: "/admin/registrations", icon: Users },
  { label: "Repositories", href: "/admin/repositories", icon: Github },
  { label: "Checkpoints", href: "/admin/checkpoints", icon: ClipboardCheck },
  { label: "Judging", href: "/admin/judging", icon: Gavel },
  { label: "Prize Ops", href: "/admin/payments", icon: CreditCard },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[700px] lg:flex">
      <aside className="border-b border-sand-border/30 bg-[#0d0a08]/75 backdrop-blur-md lg:w-64 lg:border-b-0 lg:border-r">
        <div className="p-4 lg:p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-sand-muted transition hover:text-espresso"
          >
            <ArrowLeft size={13} />
            Public Site
          </Link>

          <div className="mt-5 border-b border-sand-border/30 pb-3">
            <span className="badge-sand">Admin Console</span>
            <p className="mt-2 font-heading text-sm font-semibold text-espresso">Operations Demo</p>
          </div>

          <nav className="mt-4 flex gap-1.5 overflow-x-auto lg:flex-col">
            {links.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-espresso-body transition-colors hover:bg-sand/15 hover:text-espresso"
              >
                <Icon size={16} className="text-sand-muted" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="container-site py-8 lg:px-10">{children}</div>
      </div>
    </div>
  );
}
