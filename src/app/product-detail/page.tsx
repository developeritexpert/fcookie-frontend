"use client";

import React, { useState } from "react";
import { Heart, Share2, ChevronRight, X } from "lucide-react";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("1M");

  const productImages = [
    "/img/market-card1.png",
    "/img/market-card1.png",
    "/img/market-card1.png",
    "/img/market-card1.png",
  ];

  const relatedProducts = [
    {
      title: "2023 Panini Prizm Zion Williamson Concourse Ball White Pink Prizm",
      price: "$34.00",
      image: "/img/market-card1.png",
    },
    {
      title: "2021 Panini Chronicles Optic Spalding Beige Gold",
      price: "$50.00",
      image: "/img/market-card2.png",
    },
    {
      title: "2007 Topps Select Rookie Norm Purple Pulse Foil Patch",
      price: "$299.99",
      image: "/img/market-card3.png",
    },
    {
      title: "2020 Panini Prizm Lebron Summer",
      price: "$75",
      image: "/img/market-card4.png",
    },
  ];

  const recentTransactions = [
    { date: "November 6, 2025", grade: "PSA 9 (Population 1003)", price: "$190.50" },
    { date: "November 6, 2025", grade: "", price: "$167.50" },
    { date: "November 7, 2025", grade: "", price: "$150.00" },
    { date: "November 6, 2025", grade: "", price: "$155.00" },
    { date: "November 6, 2025", grade: "", price: "$170.00" },
  ];

  const activityHistory = [
    { type: "Sold", amount: "$192.50", time: "1 week ago", from: "dtcantracollective2", to: "ooarooooo123729" },
    { type: "Mint", amount: "$25.00", time: "1 week ago", from: "fc000c...2000", to: "storaxpure41005" },
  ];

  const tabs = ["1D", "1W", "1M", "3M", "1Y", "5Y", "All", "9.5"];

  return (
    <div className="min-h-screen text-white">
      {/* Header */}

      {/* Breadcrumb */}
      <div className=" container px-6  text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <a href="#" className="hover:text-white transition">Home</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition">Marketplace</a>
          <span>|</span>
          <span className="text-white">2024 Bowman Draft Chrome Prospect Autograph Orange Refractor</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-12 max-w-[1600px] mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-12 flex items-center justify-center min-h-[500px] relative">
              <button 
                onClick={() => setIsWatchlisted(!isWatchlisted)}
                className="absolute top-6 left-6 bg-[#1a1a1a] hover:bg-[#252525] p-3 rounded-lg transition"
              >
                <Heart className={`w-5 h-5 ${isWatchlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
              <span className="absolute top-6 left-20 bg-[#1a1a1a] px-3 py-2 rounded-lg text-sm">
                3 Watching
              </span>
              <button className="absolute top-6 right-6 bg-[#1a1a1a] hover:bg-[#252525] p-3 rounded-lg transition">
                <Share2 className="w-5 h-5 text-gray-400" />
              </button>
              <img
                src={productImages[selectedImage]}
                alt="Product"
                className="max-w-[280px] max-h-[400px] object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-[#0f0f0f] border-2 ${
                    selectedImage === idx ? 'border-[#f59e0b]' : 'border-[#1a1a1a]'
                  } rounded-xl p-4 flex items-center justify-center h-[100px] hover:border-[#f59e0b] transition`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3">
                2024 Bowman Draft Chrome Prospect Autograph Orange Refractor
              </h1>
              <p className="text-gray-400 flex items-center gap-2">
                Owned by <span className="text-[#f59e0b]">fcookie</span>
              </p>
            </div>

            {/* Price & Cert */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="text-[#10b981]">✓</span> PSA - 07258565
              </span>
            </div>

            {/* Listed Price */}
            <div className="border-t border-b border-[#1a1a1a] py-6">
              <p className="text-sm text-gray-400 mb-2">Listed for</p>
              <p className="text-5xl font-bold text-white mb-1">$2,690</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-black py-4 px-6 rounded-xl font-semibold text-lg transition"
              >
                Buy Now
              </button>
              <button 
                onClick={() => setShowOfferModal(true)}
                className="flex-1 bg-transparent border-2 border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-black py-4 px-6 rounded-xl font-semibold text-lg transition"
              >
                Make an Offer
              </button>
            </div>

            {/* Top Offer */}
            <div className="text-sm text-gray-400">
              Top offer: <span className="text-white">$129.85</span>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-[#10b981]">✓</span> Authenticity guarantee
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-[#10b981]">✓</span> Handled and insured by fcookie
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-[#10b981]">✓</span> Order-digitally, redeem anytime
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="border-t border-[#1a1a1a] pt-6">
              <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
              
              {/* Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                      selectedTab === tab
                        ? 'bg-[#f59e0b] text-black'
                        : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#252525]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Transaction List */}
              <div className="space-y-3">
                {recentTransactions.map((transaction, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 hover:border-[#252525] transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{transaction.date}</p>
                        {transaction.grade && (
                          <p className="text-sm text-gray-400 mt-1">{transaction.grade}</p>
                        )}
                      </div>
                      <p className="text-[#f59e0b] font-semibold text-lg">{transaction.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-[#f59e0b] hover:text-[#d97706] font-medium text-sm flex items-center justify-center gap-2 transition">
                View All Transactions
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm">PSA</span>
                <span className="bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm">9 RAY</span>
                <span className="bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm">Pokémon</span>
                <span className="bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm">2023</span>
                <span className="bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm">English</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                2024 Bowman Draft Chrome Prospect Autograph Orange Refractor
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                <div>
                  <p className="text-gray-400">Standard</p>
                  <p className="text-white">URC-721 based on the blockchain</p>
                </div>
                <div>
                  <p className="text-gray-400">Chain</p>
                  <p className="text-white">Polygon</p>
                </div>
                <div>
                  <p className="text-gray-400">Token ID</p>
                  <p className="text-white">165387...3114</p>
                </div>
                <div>
                  <p className="text-gray-400">Contract Address</p>
                  <p className="text-white">0x528...aCA0</p>
                </div>
                <div>
                  <p className="text-gray-400">Owner Address</p>
                  <p className="text-white">0x5647...CCSA</p>
                </div>
                <div>
                  <p className="text-gray-400">3PG LGR</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Activity History</h3>
            <div className="space-y-4">
              {activityHistory.map((activity, idx) => (
                <div
                  key={idx}
                  className="border border-[#1a1a1a] rounded-xl p-4 hover:border-[#252525] transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        activity.type === 'Sold' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {activity.type}
                      </span>
                      <span className="text-lg font-bold">{activity.amount}</span>
                    </div>
                    <button className="text-gray-400 hover:text-white transition">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div>
                      <span>from</span> <span className="text-white">{activity.from}</span> 
                      <span className="mx-2">→</span> 
                      <span>to</span> <span className="text-white">{activity.to}</span>
                    </div>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Similar listings</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item, index) => (
              <div
                key={index}
                className="group bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#f59e0b] hover:shadow-xl hover:shadow-[#f59e0b]/20 transition-all cursor-pointer"
              >
                <div className="w-full h-[240px] flex items-center justify-center mb-6 bg-[#1a1a1a] rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white mb-2 line-clamp-2 min-h-[40px]">
                    {item.title}
                  </h4>
                  <p className="text-lg font-bold text-[#f59e0b]">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0  backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6">Login to Continue</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f59e0b]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f59e0b]"
                />
              </div>
              
              <button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-black py-3 rounded-lg font-semibold transition">
                Login
              </button>
              
              <p className="text-center text-sm text-gray-400">
                Don't have an account? <a href="#" className="text-[#f59e0b] hover:underline">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Make Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowOfferModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6">Make an Offer</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Offer</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Listed price: $2,690</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                <textarea
                  placeholder="Add a message to the seller..."
                  rows={4}
                  className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f59e0b] resize-none"
                />
              </div>
              
              <button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-black py-3 rounded-lg font-semibold transition">
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}