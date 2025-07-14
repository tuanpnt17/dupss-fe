// app/workshops/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiService } from '@/app/services/workshops/apiService';
import { Calendar, Clock, User, MapPin, Star } from 'lucide-react';

interface WorkshopResponse {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  host: string;
  status: boolean;
}

const WorkshopDetailPage: React.FC = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState<WorkshopResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        setLoading(true);
        if (typeof id === 'string') {
          const data = await apiService.fetchWorkshopById(id);
          setWorkshop(data);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
        setError(`Không thể tải chi tiết workshop. Chi tiết: ${errorMessage}`);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkshop();
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-orange-700 font-medium">Đang tải...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-4">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    </div>
  );
  
  if (!workshop) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-4">
        <div className="text-gray-400 text-5xl mb-4">🔍</div>
        <p className="text-gray-600 font-medium">Không tìm thấy workshop.</p>
      </div>
    </div>
  );

  // Hàm phân chia mô tả thành các phần
  const splitDescription = (text: string) => {
    const sections = {
      intro: '',
      content: '',
      purpose: '',
      activities: '',
    };

    // Lấy phần giới thiệu (trước "Nội dung")
    const contentIndex = text.indexOf('Nội dung');
    if (contentIndex !== -1) {
      sections.intro = text.substring(0, contentIndex).trim();
    } else {
      sections.intro = text.trim();
    }

    // Tách "Nội dung"
    const purposeIndex = text.indexOf('Mục đích');
    if (contentIndex !== -1 && purposeIndex !== -1) {
      sections.content = text.substring(contentIndex + 'Nội dung'.length, purposeIndex).trim();
    } else if (contentIndex !== -1) {
      sections.content = text.substring(contentIndex + 'Nội dung'.length).trim();
    }

    // Tách "Mục đích"
    const activitiesIndex = text.indexOf('Các hoạt động');
    if (purposeIndex !== -1 && activitiesIndex !== -1) {
      sections.purpose = text.substring(purposeIndex + 'Mục đích'.length, activitiesIndex).trim();
    } else if (purposeIndex !== -1) {
      sections.purpose = text.substring(purposeIndex + 'Mục đích'.length).trim();
    }

    // Tách "Các hoạt động"
    if (activitiesIndex !== -1) {
      sections.activities = text.substring(activitiesIndex + 'Các hoạt động'.length).trim();
    }

    // Loại bỏ ký tự đặc biệt và xuống dòng thừa
    Object.keys(sections).forEach(key => {
      sections[key as keyof typeof sections] = sections[key as keyof typeof sections]
        .replace(/•|\*|➤|-/g, '') // Loại bỏ ký hiệu
        .replace(/\n\s*/g, ' ') // Loại bỏ xuống dòng và khoảng trắng thừa
        .trim();
    });

    return sections;
  };

  const sections = splitDescription(workshop.description || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header với breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <span>Workshop</span>
            <span>›</span>
            <span className="text-orange-600 font-medium">Chi tiết</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Hero Image */}
              <div className="relative h-80 overflow-hidden">
                {workshop.imageUrl ? (
                  <img
                    src={workshop.imageUrl}
                    alt={workshop.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                    <div className="text-white text-6xl">🎯</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-orange-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    📚 Workshop
                  </span>
                </div>
                <div className="absolute bottom-6 right-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${
                    workshop.status 
                      ? 'bg-green-500/90 text-white' 
                      : 'bg-red-500/90 text-white'
                  }`}>
                    {workshop.status ? '🟢 Đang hoạt động' : '🔴 Đã kết thúc'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  {workshop.title}
                </h1>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <div className="flex items-center space-x-3 mb-2">
                      <User className="h-5 w-5 text-orange-600" />
                      <h3 className="font-semibold text-gray-900">Chủ trì</h3>
                    </div>
                    <p className="text-gray-700">{workshop.host}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-red-500">
                    <div className="flex items-center space-x-3 mb-2">
                      <Calendar className="h-5 w-5 text-red-600" />
                      <h3 className="font-semibold text-gray-900">Thời gian</h3>
                    </div>
                    <p className="text-gray-700 text-sm">
                      {new Date(workshop.startDate).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })} - {new Date(workshop.endDate).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Description Sections */}
                <div className="space-y-8">
                  {sections.intro && (
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">📝</span>
                        </div>
                        Giới thiệu
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{sections.intro}</p>
                    </div>
                  )}

                  {sections.content && (
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">📚</span>
                        </div>
                        Nội dung
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{sections.content}</p>
                    </div>
                  )}

                  {sections.purpose && (
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🎯</span>
                        </div>
                        Mục đích
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{sections.purpose}</p>
                    </div>
                  )}

                  {sections.activities && (
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🎮</span>
                        </div>
                        Các hoạt động
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{sections.activities}</p>
                    </div>
                  )}

                  {!sections.intro && !sections.content && !sections.purpose && !sections.activities && (
                    <div className="bg-gray-50 p-8 rounded-xl text-center">
                      <div className="text-gray-400 text-4xl mb-4">📄</div>
                      <p className="text-gray-600">Chưa có mô tả chi tiết</p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Registration Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tham gia ngay</h3>
                  <p className="text-gray-600 text-sm">Đăng ký để không bỏ lỡ workshop này</p>
                </div>
                
                <button
                  onClick={() => alert('Chức năng đăng ký đang được phát triển!')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  🚀 Đăng ký Workshop
                </button>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin nhanh</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Thời gian</p>
                      <p className="font-medium text-gray-900">
                        {new Date(workshop.startDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Chủ trì</p>
                      <p className="font-medium text-gray-900">{workshop.host}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Trạng thái</p>
                      <p className={`font-medium ${workshop.status ? 'text-green-600' : 'text-red-600'}`}>
                        {workshop.status ? 'Đang hoạt động' : 'Đã kết thúc'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetailPage;