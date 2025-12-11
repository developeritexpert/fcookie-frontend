// app/admin/assets/edit/[id]/page.tsx
import { Metadata } from "next";
import AssetFormPage from "@/components/admin-dashboard/assets/AssetFormPage";

export const metadata: Metadata = {
  title: "Edit Asset | Lead Management Platform",
  description: "Edit asset in your admin dashboard.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AssetEditPage({ params }: PageProps) {
  const { id } = await params;
  return <AssetFormPage mode="edit" assetId={id} />;
}