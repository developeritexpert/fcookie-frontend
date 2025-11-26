import { Metadata } from "next";
import RewardsPage from "@/components/admin-dashboard/rewards/RewardsPage";

export const metadata: Metadata = {
  title: "Rewards Management | Admin Dashboard",
  description: "View and manage rewards, types, values, and redemption status in your admin dashboard.",
};

export default function RewardsManagementPage() {
  return <RewardsPage />;
}