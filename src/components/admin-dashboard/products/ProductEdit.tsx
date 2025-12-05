"use client";

import { useState } from "react";
import Image from "next/image";
import CustomDropdown from "@/components/layout/DashboardCustomDropdown";
import { DropdownOption } from "@/components/layout/DashboardCustomDropdown";


interface Option {
    value: string;
    label: string;
}

export default function ProductEditPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [categoryOpt, setCategoryOpt] = useState<string>("");
    const [statusOpt, setStatusOpt] = useState<string>("");
    const [visibilityOpt, setVisibilityOpt] = useState<string>("");

    const statusOptions: Option[] = [
        { value: "draft", label: "Draft" },
        { value: "published", label: "Published" },
        { value: "archived", label: "Archived" },
    ];

    const visibilityOptions: Option[] = [
        { value: "public", label: "Public" },
        { value: "private", label: "Private" },
        { value: "hidden", label: "Hidden" },
    ];

    const categoryOptions: Option[] = [
        { value: "cards", label: "Trading Cards" },
        { value: "memorabilia", label: "Memorabilia" },
        { value: "accessories", label: "Accessories" },
    ];

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const handleRemoveFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Product saved");
    };

    const handleCancel = () => {
        console.log("Cancelled");
    };

    const handleRemoveProduct = () => {
        console.log("Product removed");
    };

    return (
        <div className="min-h-screen">
            <div className="">
                {/* Left Column - Product Image */}
                <div>
                    {/* Main Product Image */}
                    <div className="mb-8">
                        <div className="border border-[#F7F8F81A] bg-[#F7F8F80A] rounded-[7px] p-[20px] flex gap-[20px] items-center">
                            <div className="relative border border-[#F7F8F81C] rounded-[7px] py-[10px] px-[20px] bg-[#F7F8F80A]">
                                <Image
                                    src="/img/slider-img1.png"
                                    alt="Average Rewards"
                                    width={150}
                                    height={150}
                                    className="w-[40px] lg:w-[60px]"
                                />
                                <span className="bg-white rounded-full inline-block p-1 absolute right-[-10px] top-[-10px] cursor-pointer">
                                    <Image
                                        src="/icons/pencil.png"
                                        alt="Edit"
                                        width={20}
                                        height={20}
                                        className="w-[15px]"
                                    />
                                </span>
                            </div>
                            <div>
                                <h1 className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] font-semibold max-w-[400px] mb-[10px]">2023 Bowman University Chrome Purple Mini Diamond Refractor</h1>
                                <p className="text-sm">Shedeur Sanders #16</p>
                                <p className="text-sm">PSA 9  • 240/399</p>
                            </div>
                        </div>
                    </div>

                    {/* Multiple File Upload */}
                    <div className="border border-[#F7F8F81C] rounded-[7px] p-[20px] bg-[#F7F8F80A] mb-8">
                        <h3 className="text-lg font-semibold mb-4">File Upload</h3>
                        <label className="cursor-pointer mb-[30px] block">
                            <div className="flex flex-col items-center justify-center gap-[20px] hover:bg-[#F7F8F80E] border border-dashed border-[#F7F8F81C] rounded-[7px] p-[30px] bg-[#F7F8F80A] transition-colors">
                                <p className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[5px] px-[20px] text-[#F7F8F8B2]">Select To Upload</p>
                                <Image
                                    src="/icons/upload.png"
                                    alt="Upload"
                                    width={50}
                                    height={50}
                                    className="w-[25px]"
                                />
                                <p className="text-[#F7F8F8B2]">or drag your image here</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                multiple
                                onChange={handleFileUpload}
                            />
                        </label>
                        {uploadedFiles[0] && (
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Multiple File Upload</h4>
                                <div className="flex flex-wrap gap-[10px] items-stretch">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between bg-[#F7F8F815] p-3 rounded-[7px] relative">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#F7F8F82A] rounded-[7px] flex items-center justify-center">
                                                    <span className="text-xs">IMG</span>
                                                </div>
                                                <div>
                                                    <div className="text-sm">{file.name}</div>
                                                    <div className="text-xs text-[#F7F8F870]">
                                                        {(file.size / 1024).toFixed(2)} KB
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFile(index)}
                                                className="text-red-500 text-xl hover:text-red-400 bg-[#fff] p-1 rounded-full inline absolute right-[-5px] top-[-5px] leading-[0.6]"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A]">
                        <div className="text-lg font-semibold mb-4">Basic Information</div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Title and Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Product Title"
                                        className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0"
                                    />
                                </div>
                                <div>
                                    <CustomDropdown
                                        options={categoryOptions}
                                        value={categoryOpt}
                                        onChange={setCategoryOpt}
                                        placeholder="Category"
                                    />
                                </div>
                            </div>

                            {/*Base Price and Status*/}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Base Price (USD)"
                                        className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0"
                                    />
                                </div>
                                <div>
                                   <CustomDropdown
                                        options={statusOptions}
                                        value={statusOpt}
                                        onChange={setStatusOpt}
                                        placeholder="Status"
                                    />
                                </div>
                            </div>

                            {/* Visibility and Owned BY */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <CustomDropdown
                                        options={visibilityOptions}
                                        value={visibilityOpt}
                                        onChange={setVisibilityOpt}
                                        placeholder="Visibility"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Owned By"
                                        className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <textarea
                                    rows={6}
                                    placeholder="Description"
                                    className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between gap-[20px]">
                                <div className="flex items-center gap-[20px]">
                                    <button
                                        type="submit"
                                        className="flex gap-2 items-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-6 py-3 text-sm hover:opacity-90 transition-opacity"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] font-semibold px-6 py-3 text-sm hover:bg-[#F7F8F815] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleRemoveProduct}
                                    className="border border-[#FF6B6B] text-[#fff] duration-400 bg-[#FF6B6B] rounded-[7px] font-semibold px-6 py-3 text-sm hover:bg-[#FF6B6B25] transition-colors"
                                >
                                    Remove Product
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
}