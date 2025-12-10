// app/admin/filters/values/add/page.tsx

import { Metadata } from "next";
import FilterValueFormPage from "@/components/admin-dashboard/filters/FilterValueFormPage";

export const metadata: Metadata = {
  title: "Add Filter Value | Lead Management Platform",
  description: "Add a new filter value to your admin dashboard.",
};

export default function FilterValueAddPage() {
  return <FilterValueFormPage mode="add" />;
}