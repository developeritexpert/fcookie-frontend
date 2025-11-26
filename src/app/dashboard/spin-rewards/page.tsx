import { Metadata } from "next";
import SpinRewardsPage from "@/components/dashboard/spin-rewards/SpinRewardsPage";

export const metadata: Metadata = {
  title: "Spin Rewards | Fcookie",
  description: "Spin to win rewards and track your reward history.",
};

export default function Page() {
  return <SpinRewardsPage />;
}