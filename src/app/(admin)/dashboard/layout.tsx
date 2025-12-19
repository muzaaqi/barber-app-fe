import Sidebar from "@/components/admin/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}