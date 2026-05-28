import DashboardLayout from "@/component/layout/DashboardLayout";

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}