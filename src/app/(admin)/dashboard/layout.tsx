import { Suspense } from "react";
export const dynamic = 'force-dynamic';
import Sidebar from "@/components/admin/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Sidebar />
      <Suspense fallback={<div className="p-10 text-center">Loading dashboard data...</div>}>
          {children}
      </Suspense>
    </div>
  );
}
