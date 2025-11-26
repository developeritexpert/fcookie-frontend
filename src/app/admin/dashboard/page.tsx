import { Metadata } from "next";
import AdminDashboardPage from "@/components/admin-dashboard/dashboard/AdminDashboardPage";

export const metadata: Metadata = {
  title: "Admin Dashboard | Lead Management Platform",
  description:
    "View your admin dashboard with user statistics, revenue data, and lead management insights.",
};

export default function DashboardPage() {
  return <AdminDashboardPage />;
}
