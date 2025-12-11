// app/admin/assets/page.tsx
import { Metadata } from "next";
import AssetPage from "@/components/admin-dashboard/assets/AssetPage";

export const metadata = {
  title: "Admin Assets | Lead Management Platform",
  description: "View and manage assets in your admin dashboard.",
};

export default function AssetsPage() {
  return <AssetPage />;
}