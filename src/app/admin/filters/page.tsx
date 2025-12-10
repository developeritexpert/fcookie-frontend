// app/admin/filters/page.tsx

import { Metadata } from "next";
import FilterPage from "@/components/admin-dashboard/filters/FilterPage";

export const metadata: Metadata = {
  title: "Admin Filters | Lead Management Platform",
  description: "View and manage filters in your admin dashboard.",
};

export default function FiltersPage() {
  return <FilterPage />;
}