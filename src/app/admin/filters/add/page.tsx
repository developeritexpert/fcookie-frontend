// app/admin/filters/add/page.tsx

import { Metadata } from "next";
import FilterFormPage from "@/components/admin-dashboard/filters/FilterFormPage";

export const metadata: Metadata = {
  title: "Add Filter Group | Lead Management Platform",
  description: "Add a new filter group to your admin dashboard.",
};

export default function FilterAddPage() {
  return <FilterFormPage mode="add" />;
}