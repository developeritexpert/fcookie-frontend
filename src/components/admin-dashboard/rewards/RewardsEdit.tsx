"use client";

import { useState } from "react";
import Image from "next/image";
import CustomDropdown from "@/components/layout/DashboardCustomDropdown";
import { DropdownOption } from "@/components/layout/DashboardCustomDropdown";

export default function RewardEdit() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [rewardType, setRewardType] = useState<string>("");
    const [rewardProb, setRewardProb] = useState<string>("");
    const [rewardStatus, setRewardStatus] = useState<string>("");

    const rewardTypeOptions: DropdownOption[] = [
        { value: "physical", label: "Physical" },
        { value: "digital", label: "Digital" },
        { value: "discount", label: "Discount" },
        { value: "cashback", label: "Cashback" },
    ];
    const rewardProbabilityOptions: DropdownOption[] = [
        { value: "0%", label: "0" },
        { value: "50%", label: "50%" },
        { value: "100%", label: "100%" },
    ];
    const rewardStatusOptions: DropdownOption[] = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Reward saved");
    };

    const handleCancel = () => {
        console.log("Cancelled");
    };

    const handleRemoveReward = () => {
        console.log("Reward removed");
    };

    return (

        <div className="border border-[#F7F8F81A] bg-[#F7F8F80A] rounded-[7px] p-[20px]">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-[28px] font-semibold mb-6">Edit Reward</h1>

                <div className="">
                    {/* First Row: Reward Name and Reward Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Reward Name"
                                className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent  rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0"
                            />
                        </div>
                        <div>
                            <CustomDropdown
                                options={rewardTypeOptions}
                                value={rewardType}
                                onChange={setRewardType}
                                placeholder="Reward Type"
                            />
                        </div>
                    </div>

                    {/* Second Row: Value and Probability */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <input
                                type="number"
                                placeholder="Value"
                                className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent  rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0"
                            />
                        </div>
                        <div>
                            <CustomDropdown
                                options={rewardProbabilityOptions}
                                value={rewardProb}
                                onChange={setRewardProb}
                                placeholder="Probability (%)"
                            />
                        </div>
                    </div>

                    {/* Third Row: Expiry and Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <input
                                type="number"
                                placeholder="Expiry (Days)"
                                min="0"
                                className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent  rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0"
                            />
                        </div>
                        <div>
                            <CustomDropdown
                                options={rewardStatusOptions}
                                value={rewardStatus}
                                onChange={setRewardStatus}
                                placeholder="Status"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Reward Icon / Image Section */}
            <div className="mb-8">
                <h2 className="text-[22px] font-semibold mb-4">Reward Icon / Image</h2>

                <div className="">
                    <label className="cursor-pointer block">
                        <div className="flex flex-col items-center justify-center gap-[20px] hover:bg-[#F7F8F80E] border border-dashed border-[#F7F8F81C] rounded-[7px] p-[30px] bg-[#F7F8F80A] transition-colors ">
                            {selectedImage ? (
                                <div className="relative">
                                    <Image
                                        src={selectedImage}
                                        alt="Reward icon"
                                        width={100}
                                        height={100}
                                        className="w-[80px] h-[80px] object-cover rounded-[7px]"
                                    />
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="border text-sm border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[5px] px-[20px] text-[#F7F8F8B2]">
                                        Select To Upload
                                    </p>
                                    <div className="">
                                        <Image
                                            src="/icons/upload.png"
                                            alt="Upload"
                                            width={40}
                                            height={40}
                                            className="w-[25px] opacity-70"
                                        />
                                    </div>
                                    <p className="text-[#F7F8F8B2] text-sm">or drag your image here</p>
                                </>
                            )}
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
                <textarea
                    rows={6}
                    placeholder="Description"
                    className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 resize-none"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center flex-wrap justify-between gap-[20px]">
                <div className="flex items-center gap-[20px]">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="flex gap-2 items-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-3 md:px-6 py-3 text-sm hover:opacity-90 transition-opacity"
                    >
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] font-semibold px-3 md:px-6 py-3 text-sm hover:bg-[#F7F8F815] transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleRemoveReward}
                    className="border border-[#FF6B6B] text-[#fff] bg-[#FF6B6B] rounded-[7px] font-semibold px-3 md:px-6 py-3 text-sm hover:bg-[#FF6B6B25] hover:text-[#FF6B6B] transition-colors"
                >
                    Remove Reward
                </button>
            </div>
        </div>
    );
}