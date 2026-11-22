import DashboardSidebar from "@/components/layout/DashboardSidebar";
export default function DashboardLayout({children}:{children:React.ReactNode}) {
 return <div className="min-h-[700px] lg:flex"><DashboardSidebar/><div className="min-w-0 flex-1"><div className="container-site py-8 lg:px-10 lg:py-10">{children}</div></div></div>;
}