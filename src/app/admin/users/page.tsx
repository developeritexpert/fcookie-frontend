import { Metadata } from "next";
import UserPage from "@/components/admin-dashboard/users/UserPage";

export const metadata: Metadata = {
  title: "User Management | Admin Dashboard",
  description: "View and manage users, their roles, and activity status in your admin dashboard.",
};

export default function UsersPage() {
  return <UserPage />;
}