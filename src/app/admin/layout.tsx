import DashboardLayout from "@/component/layout/DashboardLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
  
}