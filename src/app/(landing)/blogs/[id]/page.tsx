"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiService } from '@/app/services/blogs/apiService';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  description: string;
  authorId: string;
  authorName: string; // Thay authorId bằng authorName
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{blogPost.title}</h1>
      <p className="text-gray-600 mb-4">{blogPost.description}</p>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Tác giả: {blogPost.authorName}</p> {/* Sử dụng authorName */}
        <p className="text-sm text-gray-500">
          Ngày đăng: {new Date(blogPost.createdAt).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
    </div>
  );
};

export default BlogDetailPage;