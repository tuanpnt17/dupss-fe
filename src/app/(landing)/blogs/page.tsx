"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, Calendar, User, Clock, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { apiService } from "@/app/services/blogs/apiService";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  description: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

interface BlogResponse {
  totalCount: number;
  items: BlogPost[];
  pageIndex: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export default function BlogListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedAuthor, setSelectedAuthor] = useState("Tất cả");
  const [showFilters, setShowFilters] = useState(false);
  const [blogData, setBlogData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(1); // Thêm state cho pageIndex

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
        const data = await apiService.fetchBlogs(params);
        setBlogData(data);
      } catch (err) {
        setError("Không thể tải dữ liệu blog.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, selectedAuthor, pageIndex]); // Thêm pageIndex vào dependency

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

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog Chung Tay Chống Ma Túy</h1>
            <p className="text-xl text-orange-100 mb-8">
              Chia sẻ kiến thức, câu chuyện và kinh nghiệm để xây dựng cộng đồng mạnh mẽ, không ma túy
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Bộ lọc</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>
          <div className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled
                >
                  {["Tất cả", "Giáo dục", "Câu chuyện", "Sức khỏe", "Gia đình", "Điều trị", "Cộng đồng"].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tác giả</label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {["Tất cả", ...new Set(blogData?.items.map((post) => post.authorName))].map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold text-orange-600">{blogData?.totalCount || 0}</span> bài viết
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-xl">{post.title.charAt(0)}</span>
                  </div>
                  <p className="text-orange-600 font-medium">{'Chưa có category'}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {[]}
                </div>
                <Link href={`/blogs/${post.id}`}>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.description || 'Chưa có mô tả'}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">{post.authorName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{'Tác giả: ' + post.authorName}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{'Chưa có readTime'}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/blogs/${post.id}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                  >
                    Đọc thêm
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
            <p className="text-gray-600 mb-4">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm bài viết phù hợp
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Tất cả");
                setSelectedAuthor("Tất cả");
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
        {/* Thêm phân trang */}
        {blogData && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
              disabled={!blogData.hasPreviousPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-gray-600">
              Trang {blogData.pageIndex} / {Math.ceil(blogData.totalCount / blogData.pageSize)}
            </span>
            <button
              onClick={() => setPageIndex((prev) => prev + 1)}
              disabled={!blogData.hasNextPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin tức</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Nhận những bài viết mới nhất về phòng chống ma túy và câu chuyện truyền cảm hứng
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}