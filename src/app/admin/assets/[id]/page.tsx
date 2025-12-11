// app/admin/assets/[id]/page.tsx
import { Metadata } from "next";
import AssetDetailPage from "@/components/admin-dashboard/assets/AssetDetailPage";

export const metadata: Metadata = {
  title: "Asset Details | Lead Management Platform",
  description: "View asset details in your admin dashboard.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AssetViewPage({ params }: PageProps) {
  const { id } = await params;
  return <AssetDetailPage assetId={id} />;
}