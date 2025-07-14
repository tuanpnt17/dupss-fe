"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { apiService } from '@/app/services/blogs/apiService'; // Điều chỉnh đường dẫn nếu cần
import { Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string; // Lưu dưới dạng Markdown
  description: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchBlogById(id as string);
        setBlogPost(data);
      } catch (err) {
        setError('Không thể tải chi tiết blog.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetail();
    }
  }, [id]);

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!blogPost) return <div className="text-center py-12">Không tìm thấy blog.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Header với hình ảnh minh họa */}
          <div className="h-64 bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-3xl">{blogPost.title.charAt(0)}</span>
              </div>
            </div>
          </div>

          {/* Nội dung chi tiết */}
          <div className="p-6 lg:p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight hover:text-orange-600 transition-colors cursor-pointer">
              {blogPost.title}
            </h1>
            <p className="text-gray-600 mb-6 text-lg">{blogPost.description}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-700 font-medium">{blogPost.authorName.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Tác giả: {blogPost.authorName}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(blogPost.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                Theo dõi tác giả
              </button>
            </div>

            <div className="prose max-w-none text-gray-800 lg:prose-lg prose-headings:text-gray-900 prose-headings:font-bold prose-p:my-4 prose-ul:my-4 prose-li:ml-6 prose-li:my-2">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{blogPost.content}</ReactMarkdown>
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

export default BlogDetailPage;