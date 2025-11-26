import { Metadata } from "next";
import ProductPage from "@/components/admin-dashboard/products/ProductPage";

export const metadata: Metadata = {
  title: "Admin Products | Lead Management Platform",
  description: "View and manage products, stock status, and pricing in your admin dashboard.",
};

export default function ProductsPage() {
  return <ProductPage />;
}
