import { Metadata } from "next";
import CategoryFormPage from "@/components/admin-dashboard/categories/CategoryFormPage";

export const metadata: Metadata = {
  title: "Add Category | Lead Management Platform",
  description: "Add a new category to your admin dashboard.",
};

export default function CategoryAddPage() {
  return <CategoryFormPage mode="add" />;
}