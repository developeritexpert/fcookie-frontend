// app/admin/filters/edit/[id]/page.tsx

import { Metadata } from "next";
import FilterFormPage from "@/components/admin-dashboard/filters/FilterFormPage";

export const metadata: Metadata = {
  title: "Edit Filter Group | Lead Management Platform",
  description: "Edit filter group in your admin dashboard.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FilterEditPage({ params }: PageProps) {
  const { id } = await params;
  return <FilterFormPage mode="edit" filterId={id} />;
}