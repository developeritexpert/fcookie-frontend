import React from "react";

interface DashboardFooterProps {
  collapsed: boolean;
}

function DashboardFooter({ collapsed }: DashboardFooterProps) {
  return (
    <div className="border-t border-[#FFFFFF24] py-[20px] h-[50px] flex items-center justify-center">
      <p className="text-center text-sm">© 2025 Fcookie. All Rights Reserved</p>
    </div>
  );
}

export default DashboardFooter;