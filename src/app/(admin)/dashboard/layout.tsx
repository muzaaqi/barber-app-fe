import Sidebar from "@/components/admin/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Sidebar />
      <div className="lg:ml-65">{children}</div>
    </div>
  );
}
