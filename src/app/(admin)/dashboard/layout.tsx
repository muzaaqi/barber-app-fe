import Sidebar from "@/components/admin/sidebar";
import { SocketListener } from "../../../components/admin/socket-listener";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <SocketListener />
      <Sidebar />
      <div className="lg:ml-65">{children}</div>
    </div>
  );
}
