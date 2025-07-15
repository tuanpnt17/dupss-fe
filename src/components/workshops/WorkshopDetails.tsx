"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { workshopsService } from "@/services/workshops.service";
import { Calendar, Clock, User, Star } from "lucide-react";
import { WorkshopData } from "@/types/workshops";
import Link from "next/link";

const WorkshopDetailPage: React.FC = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState<WorkshopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        setLoading(true);
        if (typeof id !== "string") {
          throw new Error("ID không hợp lệ");
        }
        const response = await workshopsService.getWorkshopById(id);
        if (response) {
          setWorkshop(response);
        } else {
          throw new Error("Không tìm thấy workshop");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định";
        setError(`Không thể tải chi tiết workshop. Chi tiết: ${errorMessage}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkshop();
    }
  }, [id]);

  const getIntroDescription = (description: string | undefined) => {
    if (!description) return "Không có mô tả";
    const contentIndex = description.indexOf("Nội dung");
    let introText = contentIndex !== -1 ? description.substring(0, contentIndex).trim() : description.trim();
    introText = introText.replace(/•|\*|➤|-/g, "").replace(/\n\s*/g, " ").trim();
    return introText;
  };

  const splitDescriptionSections = (description: string | undefined) => {
    const sections = {
      content: "",
      purpose: "",
      activities: "",
    };
  
    if (!description) return sections;
  
    const contentIndex = description.indexOf("Nội dung");
    const purposeIndex = description.indexOf("Mục đích");
    const activitiesIndex = description.indexOf("Các hoạt động");
  
    if (contentIndex !== -1) {
      const endContentIndex = purposeIndex !== -1 ? purposeIndex : activitiesIndex !== -1 ? activitiesIndex : undefined;
      sections.content = description
        .substring(contentIndex + "Nội dung".length, endContentIndex)
        .replace(/•|\*|➤|-/g, "")
        .replace(/\n\s*/g, " ")
        .replace(/đấu\s*:$/, "")
        .trim();
    } else {
      // If no "Nội dung" marker, treat the entire description as content
      sections.content = description.replace(/•|\*|➤|-/g, "").replace(/\n\s*/g, " ").replace(/đấu\s*:$/, "").trim();
    }
  
    if (purposeIndex !== -1) {
      const endPurposeIndex = activitiesIndex !== -1 ? activitiesIndex : undefined;
      sections.purpose = description
        .substring(purposeIndex + "Mục đích".length, endPurposeIndex)
        .replace(/•|\*|➤|-/g, "")
        .replace(/\n\s*/g, " ")
        .replace(/đấu\s*:$/, "")
        .trim();
    }
  
    if (activitiesIndex !== -1) {
      sections.activities = description
        .substring(activitiesIndex + "Các hoạt động".length)
        .replace(/•|\*|➤|-/g, "")
        .replace(/\n\s*/g, " ")
        .replace(/đấu\s*:$/, "")
        .trim();
    }
  
    return sections;
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

  if (!workshop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-orange-500 text-2xl">🔍</span>
          </div>
          <p className="text-xl text-gray-600 font-medium">Không tìm thấy workshop.</p>
        </div>
      </div>
    );
  }

  const { content, purpose, activities } = splitDescriptionSections(workshop.description);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/workshops" className="hover:text-orange-600">
            Workshop
          </Link>
          <span>›</span>
          <span className="text-orange-600 font-medium">{workshop.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Hero Image */}
              <div className="relative h-80 overflow-hidden">
                {workshop.imageUrl ? (
                  <img
                    src={workshop.imageUrl}
                    alt={workshop.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 via-red-100 to-orange-200 flex items-center justify-center relative">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-orange-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    📚 Workshop
                  </span>
                </div>
                <div className="absolute bottom-6 right-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${
                      workshop.status ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                    }`}
                  >
                    {workshop.status ? "🟢 Đang hoạt động" : "🔴 Đã kết thúc"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">{workshop.title}</h1>

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
                      {new Date(workshop.startDate).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(workshop.endDate).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

               {/* Description Sections */}
               <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">📝</span>
                      </div>
                      Giới thiệu
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{getIntroDescription(workshop.description)}</p>
                  </div>

                  {content && (
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">📚</span>
                        </div>
                        Nội dung
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{content}</p>
                    </div>
                  )}

                  {purpose && (
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🎯</span>
                        </div>
                        Mục đích
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{purpose}</p>
                    </div>
                  )}

                  {activities && (
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🎮</span>
                        </div>
                        Các hoạt động
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{activities}</p>
                    </div>
                  )}

                  {!workshop.description && (
                    <div className="bg-gray-50 p-8 rounded-xl text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-orange-500 text-2xl">📄</span>
                      </div>
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
                  onClick={() => alert("Chức năng đăng ký đang được phát triển!")}
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
                        {new Date(workshop.startDate).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
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
                      <p className="text-sm text-gray-600">Thời lượng</p>
                      <p className="font-medium text-gray-900">
                        {new Date(workshop.startDate).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(workshop.endDate).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Trạng thái</p>
                      <p className={`font-medium ${workshop.status ? "text-green-600" : "text-red-600"}`}>
                        {workshop.status ? "Đang hoạt động" : "Đã kết thúc"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default WorkshopDetailPage;