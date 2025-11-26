import { Metadata } from "next";
import OrdersPage from "@/components/dashboard/orders/OrdersPage";

export const metadata: Metadata = {
  title: "Orders | Fcookie",
  description: "Manage and track your orders and shipments.",
};

export default function Page() {
  return <OrdersPage />;
}