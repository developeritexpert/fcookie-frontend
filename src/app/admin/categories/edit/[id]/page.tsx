import { Metadata } from "next";
import CategoryFormPage from "@/components/admin-dashboard/categories/CategoryFormPage";

export const metadata: Metadata = {
  title: "Edit Category | Lead Management Platform",
  description: "Edit category in your admin dashboard.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryEditPage({ params }: PageProps) {
  const { id } = await params;

  return <CategoryFormPage mode="edit" categoryId={id} />;
}
