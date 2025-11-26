import React from "react";

interface AdminDashboardFooterProps {
  collapsed: boolean;
}

const AdminDashboardFooter: React.FC<AdminDashboardFooterProps> = ({ collapsed }) => {
  return (
    <div className="border-t border-[#FFFFFF24] py-[20px] h-[50px] flex items-center justify-center">
      <p className="text-center text-sm">
        © 2025 Fcookie. All Rights Reserved
      </p>
    </div>
  );
};

export default AdminDashboardFooter;
