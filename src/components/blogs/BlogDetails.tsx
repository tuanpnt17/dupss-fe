"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { blogsService } from "../../services/blogs.service";
import { IBlog } from "../../types/blogs";
import { Calendar } from "lucide-react";
import Link from "next/link";

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        console.log("Blog ID from params:", id);
        if (typeof id === "string") {
          const data = await blogsService.getBlogById(id);
          console.log("API response for blog:", data);
          setBlog(data || null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định";
        setError(`Không thể tải chi tiết blog. Chi tiết: ${errorMessage}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-orange-600 font-medium">Đang tải...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <p className="text-xl text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">Không tìm thấy blog.</div>
      </div>
    );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Header với hình ảnh minh họa */}
          <div className="h-64 bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-3xl">{blog.title.charAt(0)}</span>
              </div>
            </div>
          </div>

          {/* Nội dung chi tiết */}
          <div className="p-6 lg:p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight hover:text-orange-600 transition-colors cursor-pointer">
              {blog.title}
            </h1>
            <p className="text-gray-600 mb-6 text-lg">{blog.description || "Không có mô tả"}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <span className="text-white font-medium">{blog.authorName.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Tác giả: {blog.authorName}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>
              </div>
              <Link
                href={`/author/${blog.authorId}`} // Giả định có trang author
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Theo dõi tác giả
              </Link>
            </div>

            <div className="prose max-w-none text-gray-800 lg:prose-lg prose-headings:text-gray-900 prose-headings:font-bold prose-p:my-4 prose-ul:my-4 prose-li:ml-6 prose-li:my-2">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
            </div>
          </div>

          {/* Phần tương tác */}
          <div className="p-6 lg:p-8 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <span>Thích</span>
                  <span className="text-sm">12</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <span>Bình luận</span>
                  <span className="text-sm">8</span>
                </button>
              </div>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
                Chia sẻ
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;