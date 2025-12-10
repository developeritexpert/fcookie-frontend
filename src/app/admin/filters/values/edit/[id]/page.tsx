// app/admin/filters/values/edit/[id]/page.tsx

import { Metadata } from "next";
import FilterValueFormPage from "@/components/admin-dashboard/filters/FilterValueFormPage";

export const metadata: Metadata = {
  title: "Edit Filter Value | Lead Management Platform",
  description: "Edit filter value in your admin dashboard.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FilterValueEditPage({ params }: PageProps) {
  const { id } = await params;
  return <FilterValueFormPage mode="edit" valueId={id} />;
}