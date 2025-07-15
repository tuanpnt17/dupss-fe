"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
} from "lucide-react";
import { workshopsService } from "@/services/workshops.service";
import { WorkshopData, WorkshopQueryParams } from "@/types/workshops";

const WorkshopList: React.FC = () => {
  const [workshops, setWorkshops] = useState<WorkshopData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHost, setSelectedHost] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params: WorkshopQueryParams = {
          PageIndex: pageIndex.toString(),
          PageSize: pageSize.toString(),
          Search: searchTerm || undefined,
          SortBy: "startDate",
          SortOrder: "desc",
          Host: selectedHost !== "Tất cả" ? selectedHost : undefined,
          Status: selectedStatus !== "Tất cả" ? selectedStatus : undefined,
        };
        console.log("Fetching with params:", params);
        const response: IModelPaginate<WorkshopData> | null = await workshopsService.getWorkshops(params);
        console.log("API Response:", response);
        if (response && response.items) {
          setWorkshops(response.items);
          setTotalCount(response.totalCount);
        } else {
          setWorkshops([]);
          setTotalCount(0);
          setError("Dữ liệu trả về không hợp lệ.");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định";
        setError(`Không thể tải dữ liệu workshop. Chi tiết: ${errorMessage}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageIndex, pageSize, searchTerm, selectedHost, selectedStatus]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / pageSize)) {
      setPageIndex(newPage);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPageIndex(1);
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getIntroDescription = (description: string | undefined) => {
    if (!description) return "Không có mô tả";
    const contentIndex = description.indexOf("Nội dung");
    let introText = contentIndex !== -1 ? description.substring(0, contentIndex).trim() : description.trim();
    introText = introText.replace(/•|\*|➤|-/g, "").replace(/\n\s*/g, " ").trim();
    return introText;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-orange-600 font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <p className="text-xl text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
              Workshop Chung Tay Phát Triển
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 font-light leading-relaxed">
              Tham gia các workshop chất lượng để nâng cao kỹ năng và xây dựng cộng đồng vững mạnh
            </p>
            <div className="flex items-center justify-center space-x-4 text-orange-200">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Cộng đồng</span>
              </div>
              <div className="w-1 h-1 bg-orange-200 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Cập nhật thường xuyên</span>
              </div>
              <div className="w-1 h-1 bg-orange-200 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Thời gian linh hoạt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <form onSubmit={handleSearch} className="relative w-full md:w-auto">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-orange-400 h-6 w-6" />
                <input
                  type="text"
                  placeholder="Tìm kiếm workshop..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPageIndex(1);
                  }}
                  className="w-full pl-16 pr-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg placeholder-orange-300"
                />
              </form>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Filter className="h-5 w-5" />
                <span className="font-medium">Bộ lọc</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Hiển thị: {totalCount} workshops</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Chủ trì</label>
                <select
                  value={selectedHost}
                  onChange={(e) => {
                    setSelectedHost(e.target.value);
                    setPageIndex(1);
                  }}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gradient-to-r from-white to-orange-50"
                >
                  <option value="Tất cả">Tất cả</option>
                  {[...new Set(workshops.map((workshop) => workshop.host))].map((host) => (
                    <option key={host} value={host}>
                      {host}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Trạng thái</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setPageIndex(1);
                  }}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gradient-to-r from-white to-orange-50"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="true">Hoạt động</option>
                  <option value="false">Kết thúc</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Workshop Cards */}
        {workshops.length > 0 ? (
          <div
            className={`grid gap-8 mb-12 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {workshops.map((workshop) => (
              <article
                key={workshop.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-100 ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "md:w-80 md:flex-shrink-0" : ""
                  }`}
                >
                  {workshop.imageUrl ? (
                    <img
                      src={workshop.imageUrl}
                      alt={workshop.title}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                        viewMode === "list" ? "h-48 md:h-full" : "h-52"
                      }`}
                    />
                  ) : (
                    <div
                      className={`h-52 bg-gradient-to-br from-orange-100 via-red-100 to-orange-200 flex items-center justify-center relative ${
                        viewMode === "list" ? "h-48 md:h-full" : "h-52"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
                      <div className="text-center relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <span className="text-white font-bold text-2xl">
                            {workshop.title.charAt(0)}
                          </span>
                        </div>
                        <p className="text-orange-600 font-semibold text-lg">Chưa có hình ảnh</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                        workshop.status
                          ? "bg-green-500/90 text-white"
                          : "bg-red-500/90 text-white"
                      }`}
                    >
                      {workshop.status ? "🟢 Hoạt động" : "🔴 Kết thúc"}
                    </span>
                  </div>
                </div>

                <div className={`p-8 flex-1 ${viewMode === "list" ? "flex flex-col justify-between" : ""}`}>
                  <div>
                    <Link href={`/workshops/${workshop.id}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                        {workshop.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm">
                      {getIntroDescription(workshop.description)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span>
                        {formatDate(workshop.startDate)} - {formatDate(workshop.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <User className="h-4 w-4 text-red-500" />
                      <span>Chủ trì: {workshop.host}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span>
                        {new Date(workshop.startDate).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(workshop.endDate).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="pt-6 border-t border-gray-100">
                      <Link
                        href={`/workshops/${workshop.id}`}
                        className="inline-flex items-center text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Xem chi tiết
                        <svg
                          className="ml-2 h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-orange-100">
            <div className="w-32 h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Search className="h-12 w-12 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy workshop</h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm workshop phù hợp
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedHost("Tất cả");
                setSelectedStatus("Tất cả");
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalCount > 0 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-orange-600 rounded-xl disabled:opacity-50 hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed border border-orange-200"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Trước</span>
            </button>

            <div className="flex items-center space-x-1">
              {[...Array(Math.min(5, Math.ceil(totalCount / pageSize)))].map((_, i) => {
                const pageNum = pageIndex - 2 + i > 0 ? pageIndex - 2 + i : 1;
                if (pageNum > Math.ceil(totalCount / pageSize)) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                      pageNum === pageIndex
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex >= Math.ceil(totalCount / pageSize)}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-orange-600 rounded-xl disabled:opacity-50 hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed border border-orange-200"
            >
              <span className="font-medium">Sau</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
            Đăng ký nhận thông tin workshop
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Nhận thông tin mới nhất về các workshop và sự kiện sắp tới
          </p>
          <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 placeholder-gray-400 text-lg"
            />
            <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopList;