import { Metadata } from "next";
import DashboardPage from "@/components/dashboard/DashboardPage/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard | Fcookie",
  description: "View your dashboard with collectibles, rewards, and activity insights.",
};

export default function Page() {
  return <DashboardPage />;
}