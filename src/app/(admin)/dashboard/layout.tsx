import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Sidebar />
      <div className="ml-15">{children}</div>
    </div>
  );
}
