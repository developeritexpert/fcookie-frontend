import { Metadata } from "next";
import SettingsPage from "@/components/dashboard/settings/SettingsPage";

export const metadata: Metadata = {
  title: "Settings | Fcookie",
  description: "Manage your profile, security settings, and wallet preferences.",
};

export default function Page() {
  return <SettingsPage />;
}