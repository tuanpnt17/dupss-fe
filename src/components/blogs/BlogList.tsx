// app/components/BlogList.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
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
} from "lucide-react";
import { blogsService } from "@/services/blogs.service";
import { IBlog } from "@/types/blogs";

interface BlogResponse {
  totalCount: number;
  items: IBlog[];
  pageIndex: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export default function BlogList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedAuthor, setSelectedAuthor] = useState("Tất cả");
  const [showFilters, setShowFilters] = useState(false);
  const [blogData, setBlogData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = {
          PageIndex: pageIndex.toString(),
          PageSize: "9",
          Search: searchTerm || undefined,
          SortBy: "createdAt",
          SortOrder: "desc",
          AuthorId: selectedAuthor !== "Tất cả" ? selectedAuthor : undefined,
          Title: undefined,
        };
        const data = await blogsService.getBlogs(params);
        setBlogData(data || null);
      } catch (err) {
        setError("Không thể tải dữ liệu blog.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, selectedAuthor, pageIndex]);

  const filteredPosts = useMemo(() => {
    return blogData?.items.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.description || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAuthor = selectedAuthor === "Tất cả" || post.authorName === selectedAuthor;

      return matchesSearch && matchesAuthor;
    }) || [];
  }, [searchTerm, selectedAuthor, blogData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-orange-600 font-medium">Đang tải...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <p className="text-xl text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
              Blog Chung Tay Chống Ma Túy
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 font-light leading-relaxed">
              Chia sẻ kiến thức, câu chuyện và kinh nghiệm để xây dựng cộng đồng mạnh mẽ, không ma túy
            </p>
            <div className="flex items-center justify-center space-x-4 text-orange-200">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Cộng đồng</span>
              </div>
              <div className="w-1 h-1 bg-orange-200 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Cập nhật hàng ngày</span>
              </div>
              <div className="w-1 h-1 bg-orange-200 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Đọc nhanh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-10 border border-orange-100">
          <div className="relative mb-8">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-orange-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg placeholder-orange-300"
            />
          </div>

          <div className="md:hidden mb-6">
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

          <div className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Danh mục</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gradient-to-r from-white to-orange-50"
                  disabled
                >
                  {["Tất cả", "Giáo dục", "Câu chuyện", "Sức khỏe", "Gia đình", "Điều trị", "Cộng đồng"].map(
                    (category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Tác giả</label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gradient-to-r from-white to-orange-50"
                >
                  {[
                    "Tất cả",
                    ...new Set(blogData?.items.map((post) => post.authorName)),
                  ].map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
            <p className="text-gray-600 text-lg">
              Tìm thấy{" "}
              <span className="font-bold text-2xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {blogData?.totalCount || 0}
              </span>{" "}
              bài viết
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-100"
            >
              <div className="h-52 bg-gradient-to-br from-orange-100 via-red-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
                <div className="text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-white font-bold text-2xl">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                  <p className="text-orange-600 font-semibold text-lg">{"Chưa có category"}</p>
                </div>
              </div>

              <div className="p-8">
                <Link href={`/blogs/${post.id}`}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {post.description || "Chưa có mô tả"}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold">
                        {post.authorName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {"Tác giả: " + post.authorName}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{"Chưa có readTime"}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <Link
                    href={`/blogs/${post.id}`}
                    className="inline-flex items-center text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Đọc thêm
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
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Search className="h-12 w-12 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy bài viết
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm bài viết phù hợp
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Tất cả");
                setSelectedAuthor("Tất cả");
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Pagination */}
        {blogData && (
          <div className="mt-12 flex justify-center items-center space-x-6">
            <button
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
              disabled={!blogData.hasPreviousPage}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-orange-600 rounded-xl disabled:opacity-50 hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed border border-orange-200"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Trước</span>
            </button>

            <div className="bg-white px-6 py-3 rounded-xl shadow-lg border border-orange-200">
              <span className="text-gray-600 font-medium">
                Trang{" "}
                <span className="text-orange-600 font-bold">{blogData.pageIndex}</span>{" "}
                /{" "}
                <span className="text-orange-600 font-bold">
                  {Math.ceil(blogData.totalCount / blogData.pageSize)}
                </span>
              </span>
            </div>

            <button
              onClick={() => setPageIndex((prev) => prev + 1)}
              disabled={!blogData.hasNextPage}
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
            Đăng ký nhận tin tức
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Nhận những bài viết mới nhất về phòng chống ma túy và câu chuyện truyền cảm hứng
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
}