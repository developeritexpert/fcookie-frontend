"use client";

import { useState } from "react";
import Link from "next/link";

interface Option {
  value: string;
  label: string;
}

interface Product {
  id: number;
  productName: string;
  price: string;
  sku: string;
  stock: string;
  status: string;
  image: string;
}

const options: Option[] = [
  { value: "all", label: "All" },
  { value: "in-stock", label: "In Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
  { value: "re-stocking", label: "Re-stocking" },
];

const tableData: Product[] = [
  { id: 1, productName: "2019 Topos Supreme Quad Autographs", price: "$18,000", sku: "AT234", stock: "120", status: "In Stock", image: "/img/product1.png" },
  { id: 2, productName: "2019 Topos Heritage Real One Autographs", price: "$15,517", sku: "N5678", stock: "0", status: "Out of Stock", image: "/img/product2.png" },
  { id: 3, productName: "2005 SP Signature Autograph Interedible Inscription", price: "$2,760", sku: "S9801", stock: "20", status: "Re-stocking", image: "/img/product3.png" },
  { id: 4, productName: "2019 Ramin One and One Roskie Jersey Autograph", price: "$2,249", sku: "L4321", stock: "78", status: "In Stock", image: "/img/product4.png" },
  { id: 5, productName: "2019 Domuss Optic Roskie Signature Fast Break Gold Pfrom", price: "$2,000", sku: "L8765", stock: "55", status: "In Stock", image: "/img/product5.png" },
  { id: 6, productName: "2019 Ramin One and One Roskie Dual Jersey Autographs", price: "$1,149", sku: "S2222", stock: "0", status: "Out of Stock", image: "/img/product6.png" },
  { id: 7, productName: "2000 Bowman Chrome", price: "$1,098", sku: "C9001", stock: "48", status: "In Stock", image: "/img/product7.png" },
  { id: 8, productName: "2018 Ramin Domuss Prost Prost Black Laser", price: "$2,000", sku: "A9679", stock: "10", status: "Re-stocking", image: "/img/product8.png" },
  { id: 9, productName: "2017 Ramin Contenters' Horizontal Variation Roskie Ticket", price: "$989", sku: "M1357", stock: "0", status: "Out of Stock", image: "/img/product9.png" },
  { id: 10, productName: "2009 SP Game Used Signature Fairtics", price: "$989", sku: "K4410", stock: "12", status: "In Stock", image: "/img/product10.png" },
];

export default function ProductPage() {
  const [selected, setSelected] = useState<Option>({ label: "All", value: "all" });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in stock": return "text-[#75DA5B]";
      case "out of stock": return "text-[#FF6B6B]";
      case "re-stocking": return "text-[#FFCD5C]";
      default: return "text-[#F7F8F8B2]";
    }
  };

  const handleEdit = (id: number) => console.log("Edit product:", id);
  const handleRemove = (id: number) => console.log("Remove product:", id);

  return (
    <div>
      {/* Search and Add Product */}
      <div className="flex flex-col sm:flex-row itmes-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <div className="relative min-w-[250px]">
          <input type="text" placeholder="Search..." className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm pl-[30px] px-4 py-[10px] placeholder:text-[#F7F8F8B2] focus-visible:outline-none" />
          {/* Search Icon */}
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[15px] absolute left-[10px] top-1/2 -translate-y-1/2">
            <path d="M11.7073 11.7073C12.3033 11.1112 12.7761 10.4037 13.0986 9.62491C13.4212 8.84617 13.5872 8.01152 13.5872 7.16862C13.5872 6.32571 13.4212 5.49106 13.0986 4.71232C12.7761 3.93358 12.3033 3.22599 11.7073 2.62997C11.1112 2.03395 10.4037 1.56115 9.62491 1.23859C8.84617 0.916022 8.01152 0.75 7.16862 0.75C6.32571 0.75 5.49106 0.916022 4.71232 1.23859C3.93358 1.56115 3.22599 2.03395 2.62997 2.62997C1.42624 3.83369 0.75 5.46629 0.75 7.16862C0.75 8.87094 1.42624 10.5035 2.62997 11.7073C3.83369 12.911 5.46629 13.5872 7.16862 13.5872C8.87094 13.5872 10.5035 12.911 11.7073 11.7073ZM11.7073 11.7073L15.75 15.75" stroke="#F7F8F8" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <button className="flex gap-[5px] items-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-[20px] py-[10px] text-sm">
            {/* Plus Icon */}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.62402 0.255859C7.91001 0.284359 8.17878 0.411199 8.38379 0.616211C8.61821 0.850631 8.75 1.16848 8.75 1.5V6.25H13.5C13.8315 6.25 14.1494 6.38179 14.3838 6.61621C14.6182 6.85063 14.75 7.16848 14.75 7.5C14.75 7.83152 14.6182 8.14937 14.3838 8.38379C14.1494 8.61821 13.8315 8.75 13.5 8.75H8.75V13.5C8.75 13.8315 8.61821 14.1494 8.38379 14.3838C8.14937 14.6182 7.83152 14.75 7.5 14.75C7.16848 14.75 6.85063 14.6182 6.61621 14.3838C6.38179 14.1494 6.25 13.8315 6.25 13.5V8.75H1.5C1.16848 8.75 0.850631 8.61821 0.616211 8.38379C0.381791 8.14937 0.25 7.83152 0.25 7.5C0.25 7.16848 0.381791 6.85063 0.616211 6.61621C0.850631 6.38179 1.16848 6.25 1.5 6.25H6.25V1.5C6.25 1.16848 6.38179 0.850631 6.61621 0.616211C6.85063 0.38179 7.16848 0.25 7.5 0.25L7.62402 0.255859Z" fill="black" stroke="black" strokeWidth="0.5" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="w-full overflow-x-auto rounded-[7px]">
        <table className="lg:w-full text-sm rounded-[7px]">
          <thead>
            <tr className="bg-[#fff] text-[#000] font-medium text-left">
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[150px]">Product Name</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px] md:min-w-[150px]">Price</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px] md:min-w-[150px]">SKU</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px] md:min-w-[150px]">Stock</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px] md:min-w-[150px]">Status</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[150px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id} className="text-[#F7F8F8B2] bg-[#F7F8F81C] hover:bg-[#F7F8F82A] transition-colors">
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                  <div className="flex items-center gap-3">
                    <div className="border border-[#F7F8F81C] rounded-[7px] p-2">
                      <img src={item.image} alt={item.productName} className="w-10 h-10 rounded-[7px] object-contain" />
                    </div>
                    <span>{item.productName}</span>
                  </div>
                </td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{item.price}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{item.sku}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{item.stock}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                  <span className={getStatusColor(item.status)}>{item.status}</span>
                </td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                  <div className="flex gap-2">
                    <Link href="/admin/product-edit" onClick={() => handleEdit(item.id)} className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#F7F8F815] transition-colors cursor-pointer">Edit</Link>
                    <button onClick={() => handleRemove(item.id)} className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#F7F8F815] transition-colors cursor-pointer">Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
