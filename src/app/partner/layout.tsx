import DashboardLayout from "@/component/layout/DashboardLayout";

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}