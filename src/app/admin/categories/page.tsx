import { Metadata } from "next";
import CategoryPage from "@/components/admin-dashboard/categories/CategoryPage";

export const metadata: Metadata = {
  title: "Admin Categories | Lead Management Platform",
  description: "View and manage categories in your admin dashboard.",
};

export default function CategoriesPage() {
  return <CategoryPage />;
}