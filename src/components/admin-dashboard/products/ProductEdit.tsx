"use client";

import { useState } from "react";
import Image from "next/image";

interface Option {
    value: string;
    label: string;
}

export default function ProductEditPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
                            </div>
                            <div>
                                <h1 className="text-[22px] leading-[1.2] font-semibold max-w-[400px] mb-[10px]">2023 Bowman University Chrome Purple Mini Diamond Refractor</h1>
                                <p className="text-sm">Shedeur Sanders #16</p>
                                <p className="text-sm">PSA 9  • 240/399</p>
                            </div>
                        </div>
                    </div>

                    {/* Multiple File Upload */}
                    <div className="border border-[#F7F8F81C] rounded-[7px] p-[20px] bg-[#F7F8F80A] mb-8">
                        <h3 className="text-lg font-medium mb-4">File Upload</h3>
                        <label className="cursor-pointer mb-[30px] block">
                            <div className="flex items-center justify-center gap-2 border-dashed border-[#F7F8F81C] rounded-[7px] p-4 bg-[#F7F8F815] hover:bg-[#F7F8F825] transition-colors">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.62402 0.255859C7.91001 0.284359 8.17878 0.411199 8.38379 0.616211C8.61821 0.850631 8.75 1.16848 8.75 1.5V6.25H13.5C13.8315 6.25 14.1494 6.38179 14.3838 6.61621C14.6182 6.85063 14.75 7.16848 14.75 7.5C14.75 7.83152 14.6182 8.14937 14.3838 8.38379C14.1494 8.61821 13.8315 8.75 13.5 8.75H8.75V13.5C8.75 13.8315 8.61821 14.1494 8.3838 14.3838C8.14937 14.6182 7.83152 14.75 7.5 14.75C7.16848 14.75 6.85063 14.6182 6.61621 14.3838C6.38179 14.1494 6.25 13.8315 6.25 13.5V8.75H1.5C1.16848 8.75 0.850631 8.61821 0.616211 8.38379C0.381791 8.14937 0.25 7.83152 0.25 7.5C0.25 7.16848 0.381791 6.85063 0.616211 6.61621C0.850631 6.38179 1.16848 6.25 1.5 6.25H6.25V1.5C6.25 1.16848 6.38179 0.850631 6.61621 0.616211C6.85063 0.38179 7.16848 0.25 7.5 0.25L7.62402 0.255859Z" fill="#F7F8F8B2" stroke="#F7F8F8B2" strokeWidth="0.5" />
                                </svg>
                                <span>Upload Files</span>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                multiple
                                onChange={handleFileUpload}
                            />
                        </label>
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
                                        className="text-red-500 hover:text-red-400 bg-[#fff] p-2 rounded-full inline absolute right-[-5px] top-[-5px] leading-[0.6]"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                        </div>
                    </div>


                    <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A]">
                        <div className="text-2xl font-medium mb-8">Basic Information</div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Title */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Product Title</label>
                                <input
                                    type="text"
                                    defaultValue="2023 Bowman University Chrome Purple Mini Diamond Refractor Shedeur Sanders #16 PSA 9 • 240/399"
                                    className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-none"
                                />
                            </div>

                            {/* Category and Base Price */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <select className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 focus-visible:outline-none">
                                        {categoryOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Base Price (USD)</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Status and Visibility */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Status</label>
                                    <select className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 focus-visible:outline-none">
                                        {statusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Visibility</label>
                                    <select className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 focus-visible:outline-none">
                                        {visibilityOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Owned By */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Owned By</label>
                                <input
                                    type="text"
                                    placeholder="Enter owner name"
                                    className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-none"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    rows={6}
                                    placeholder="Enter product description..."
                                    className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-none resize-none"
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
                                    className="border border-[#FF6B6B] bg-[#FF6B6B1A] text-[#FF6B6B] rounded-[7px] font-semibold px-6 py-3 text-sm hover:bg-[#FF6B6B25] transition-colors"
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