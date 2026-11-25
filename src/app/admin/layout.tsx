import Link from "next/link";
import { LayoutDashboard, Users, CreditCard, ArrowLeft, ShieldCheck } from "lucide-react";
import { verifyAdminRequest } from "@/lib/admin";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import Logo from "@/components/layout/Logo";

export const dynamic = "force-dynamic";

const links = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Registrations", href: "/admin/registrations", icon: Users },
  { label: "Payment Verification", href: "/admin/payments", icon: CreditCard },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const auth = await verifyAdminRequest();

  if (!auth.authenticated) {
    return <AdminLoginForm />;
  }

  return (
    <div className="min-h-screen bg-[#0c0907] text-[#f0eae1] lg:flex">
      <aside className="border-b border-sand-border/20 bg-[#120d09]/85 backdrop-blur-md lg:w-64 lg:border-b-0 lg:border-r">
        <div className="p-4 lg:p-6 flex flex-col h-full justify-between">
          <div>
            <div className="mb-6">
              <Logo size="sm" />
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#8e7a68] transition hover:text-[#c89f6d]"
            >
              <ArrowLeft size={13} />
              Public Portal
            </Link>

            <div className="mt-5 border-b border-sand-border/20 pb-3">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#c89f6d]" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#c89f6d]">
                  Organiser Mode
                </span>
              </div>
              <p className="mt-1 font-serif text-sm font-normal text-[#f0eae1]">Operations Console</p>
            </div>

            <nav className="mt-4 flex gap-1.5 overflow-x-auto lg:flex-col">
              {links.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#9e8e7c] transition-colors hover:bg-sand-border/15 hover:text-[#f0eae1]"
                >
                  <Icon size={16} className="text-[#8e7a68]" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <AdminLogoutButton />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="container-site py-8 lg:px-10">{children}</div>
      </div>
    </div>
  );
}
