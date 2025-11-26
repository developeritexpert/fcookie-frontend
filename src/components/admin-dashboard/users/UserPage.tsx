"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  avatar: string;
}

const userData: User[] = [
  { id: 1, name: "Admin", email: "john.admin@mail.com", role: "Admin", status: "Online", lastActive: "10 mins ago", avatar: "/img/user1.png" },
  { id: 2, name: "Manager", email: "sarah.m@company.com", role: "Editor", status: "Away", lastActive: "5 Days ago", avatar: "/img/user2.png" },
  { id: 3, name: "Reviewer", email: "joe.reviewer@mail.com", role: "Viewer", status: "Offline", lastActive: "13 hours ago", avatar: "/img/user3.png" },
  { id: 4, name: "Moderator", email: "allen@mail.com", role: "Editor", status: "Away", lastActive: "7 hour ago", avatar: "/img/user4.png" },
  { id: 5, name: "Manager", email: "dave@moderator.co", role: "Admin", status: "Online", lastActive: "1 hours ago", avatar: "/img/user5.png" },
  { id: 6, name: "Reviewer", email: "emma@reviewer.co", role: "Viewer", status: "Away", lastActive: "1 week ago", avatar: "/img/user6.png" },
];

export default function UserPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const filteredUsers = userData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online": return "bg-[#75DA5B]";
      case "away": return "bg-[#FFCD5C]";
      case "offline": return "bg-[#FF6B6B]";
      default: return "bg-[#F7F8F8B2]";
    }
  };

  const handleEdit = (id: number) => console.log("Edit user:", id);
  const handleRemove = (id: number) => console.log("Remove user:", id);

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[25px]">
        {/* Total User */}
        <div className="bg-[#F7F8F80A] border border-[#F7F8F81C] rounded-[7px] p-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <span className="text-[#F7F8F8B2] text-sm">Total User</span>
            <div className="w-[40px] h-[40px] bg-[#75DA5B1A] rounded-[7px] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="#75DA5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="text-[#F7F8F8] text-3xl font-semibold">{userData.length}</div>
        </div>

        {/* Active User */}
        <div className="bg-[#F7F8F80A] border border-[#F7F8F81C] rounded-[7px] p-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <span className="text-[#F7F8F8B2] text-sm">Active User</span>
            <div className="w-[40px] h-[40px] bg-[#75DA5B1A] rounded-[7px] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7ZM20 8V14M23 11H17" stroke="#75DA5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="text-[#F7F8F8] text-3xl font-semibold">{userData.filter(u => u.status === "Online").length}</div>
        </div>

        {/* Inactive Users */}
        <div className="bg-[#F7F8F80A] border border-[#F7F8F81C] rounded-[7px] p-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <span className="text-[#F7F8F8B2] text-sm">Inactive Users</span>
            <div className="w-[40px] h-[40px] bg-[#FF6B6B1A] rounded-[7px] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7ZM23 8L17 14M17 8L23 14" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="text-[#F7F8F8] text-3xl font-semibold">{userData.filter(u => u.status !== "Online").length}</div>
        </div>
      </div>

      {/* Search and Add User */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <div className="relative min-w-[250px]">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm pl-[30px] px-4 py-[10px] placeholder:text-[#F7F8F8B2] focus-visible:outline-none" 
          />
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="w-[15px] absolute left-[10px] top-1/2 -translate-y-1/2">
            <path d="M11.7073 11.7073C12.3033 11.1112 12.7761 10.4037 13.0986 9.62491C13.4212 8.84617 13.5872 8.01152 13.5872 7.16862C13.5872 6.32571 13.4212 5.49106 13.0986 4.71232C12.7761 3.93358 12.3033 3.22599 11.7073 2.62997C11.1112 2.03395 10.4037 1.56115 9.62491 1.23859C8.84617 0.916022 8.01152 0.75 7.16862 0.75C6.32571 0.75 5.49106 0.916022 4.71232 1.23859C3.93358 1.56115 3.22599 2.03395 2.62997 2.62997C1.42624 3.83369 0.75 5.46629 0.75 7.16862C0.75 8.87094 1.42624 10.5035 2.62997 11.7073C3.83369 12.911 5.46629 13.5872 7.16862 13.5872C8.87094 13.5872 10.5035 12.911 11.7073 11.7073ZM11.7073 11.7073L15.75 15.75" stroke="#F7F8F8" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <button className="flex gap-[5px] items-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-[20px] py-[10px] text-sm">
            Add New User
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="w-full overflow-x-auto rounded-[7px]">
        <table className="lg:w-full text-sm rounded-[7px]">
          <thead>
            <tr className="bg-[#fff] text-[#000] font-medium text-left">
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[150px]">User</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[200px]">Email</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">Role</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">Status</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px]">Last Active</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[150px] text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="text-[#F7F8F8B2] bg-[#F7F8F81C] hover:bg-[#F7F8F82A] transition-colors">
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#75DA5B] to-[#4DCE94] rounded-full flex items-center justify-center text-black font-semibold">
                        {/* Removed name initial */}
                            {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      {/* <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(user.status)} border-2 border-[#1a1a1a] rounded-full`}></div> */}
                    </div>
                      <span>{user.name}</span>
                  </div>
                </td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{user.email}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{user.role}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                  <span className={`inline-block px-[10px] py-[4px] rounded-[4px] text-xs ${
                    user.status === "Online" ? "bg-[#75DA5B1A] text-[#75DA5B]" :
                    user.status === "Away" ? "bg-[#FFCD5C1A] text-[#FFCD5C]" :
                    "bg-[#FF6B6B1A] text-[#FF6B6B]"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{user.lastActive}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C] text-right">
                  <div className="flex gap-2 justify-end w-full">

                    <button onClick={() => handleEdit(user.id)} className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#F7F8F815] transition-colors cursor-pointer">Edit</button>
                    <button onClick={() => handleRemove(user.id)} className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#F7F8F815] transition-colors cursor-pointer">Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded-md border-[#F7F8F81C] bg-[#F7F8F80A] hover:bg-[#F7F8F82A]"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded-md border-[#F7F8F81C] ${currentPage === i + 1 ? "bg-[#75DA5B] text-black" : "bg-[#F7F8F80A] hover:bg-[#F7F8F82A]"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded-md border-[#F7F8F81C] bg-[#F7F8F80A] hover:bg-[#F7F8F82A]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
