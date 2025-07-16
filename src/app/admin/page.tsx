import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title: "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text mb-2">
              Dashboard Analytics
            </h1>
            <p className="text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Real-time data updates
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full p-3 shadow-lg border border-orange-100">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7H4l5-5v5z" />
              </svg>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-400 hover:to-red-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Metrics and Monthly Sales */}
        <div className="col-span-12 xl:col-span-7 space-y-6">
          {/* Enhanced Metrics Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100/50 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
              <h2 className="text-xl font-bold text-white mb-2">Performance Metrics</h2>
              <p className="text-orange-100">Track your business growth</p>
            </div>
            <div className="p-6">
              <EcommerceMetrics />
            </div>
          </div>

          {/* Enhanced Monthly Sales Chart */}
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100/50 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
              <h2 className="text-xl font-bold text-white mb-2">Monthly Sales Trends</h2>
              <p className="text-red-100">Analyze your sales performance</p>
            </div>
            <div className="p-6">
              <MonthlySalesChart />
            </div>
          </div>
        </div>

        {/* Monthly Target */}
        <div className="col-span-12 xl:col-span-5">
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100/50 overflow-hidden h-full">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
              <h2 className="text-xl font-bold text-white mb-2">Monthly Target</h2>
              <p className="text-orange-100">Goal tracking & progress</p>
            </div>
            <div className="p-6">
              <MonthlyTarget />
            </div>
          </div>
        </div>

        {/* Statistics Chart - Full Width */}
        <div className="col-span-12">
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100/50 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Detailed Statistics</h2>
                  <p className="text-red-100">Comprehensive data analysis</p>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <StatisticsChart />
            </div>
          </div>
        </div>

        {/* Demographic Card */}
        <div className="col-span-12 xl:col-span-5">
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100/50 overflow-hidden h-full">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
              <h2 className="text-xl font-bold text-white mb-2">Demographics</h2>
              <p className="text-orange-100">Customer insights & analysis</p>
            </div>
            <div className="p-6">
              <DemographicCard />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="col-span-12 xl:col-span-7">
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100/50 overflow-hidden h-full">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Recent Orders</h2>
                  <p className="text-red-100">Latest transaction activity</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                    Live
                  </span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <RecentOrders />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl hover:from-orange-400 hover:to-red-400 transition-all duration-300 transform hover:scale-110 hover:shadow-3xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-20 animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}