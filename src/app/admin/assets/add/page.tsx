// app/admin/assets/add/page.tsx
import { Metadata } from "next";
import AssetFormPage from "@/components/admin-dashboard/assets/AssetFormPage";

export const metadata: Metadata = {
  title: "Add Asset | Lead Management Platform",
  description: "Add a new asset to your admin dashboard.",
};

export default function AssetAddPage() {
  return <AssetFormPage mode="add" />;
}