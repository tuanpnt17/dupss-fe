'use client'
import React, { useState, useEffect } from "react";
import { Button, Box, CircularProgress, Alert, Chip } from "@mui/material";
import useCreateCourseStore from "@/stores/useCreateCourseStore";
import { queuingCourseService } from "@/services/queuingCourse.service";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

// Category options for mapping
const CATEGORY_OPTIONS = [
  { id: "ED8883B1-0375-4362-B5CE-FC3AACC34594", name: "Thanh Thiếu Niên" },
  { id: "ED8883B1-0375-4362-B5CE-FC3AACC34595", name: "Phụ Huynh" },
  { id: "ED8883B1-0375-4362-B5CE-FC3AACC34596", name: "Tình Nguyện Viên" },
  { id: "ED8883B1-0375-4362-B5CE-FC3AACC34597", name: "Phục Hồi" },
];

// Helper to extract YouTube video ID
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}

interface Props {
  onBack: () => void;
  onReset: () => void;
}

const CourseReviewAndSubmit: React.FC<Props> = ({ onBack, onReset }) => {
  const store = useCreateCourseStore();
  const auth = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        router.push("/admin/courses");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [success, router]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!auth.accessToken) throw new Error("Bạn cần đăng nhập để tạo khóa học.");
      // Omit store methods and only send API fields
      const { setField, addSection, updateSection, removeSection, addStep, updateStep, removeStep, reset, ...apiData } = store;
      const res = await queuingCourseService.addQueuingCourse(auth.accessToken, apiData);
      if (res.isSuccess) {
        setSuccess(true);
        onReset();
      } else {
        setError(res.error?.message || "Tạo khóa học thất bại");
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi tạo khóa học");
    } finally {
      setLoading(false);
    }
  };

  // Helper to get category name
  const getCategoryName = (id: string) => CATEGORY_OPTIONS.find(c => c.id === id)?.name || id;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Xem lại và xác nhận thông tin khóa học</h2>
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {success && <Alert severity="success" className="mb-4">Tạo khóa học thành công! Đang chuyển hướng...</Alert>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left: Main info */}
        <div>
          <div className="mb-4">
            <span className="block text-gray-500 font-medium mb-1">Tên khóa học</span>
            <span className="text-xl font-bold text-gray-900">{store.courseName}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-500 font-medium mb-1">Mã khóa học</span>
            <span className="text-base font-semibold text-gray-800">{store.courseCode}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-500 font-medium mb-1">Tóm tắt</span>
            <span className="text-base text-gray-700 whitespace-pre-line">{store.summary}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-500 font-medium mb-1">Nội dung chi tiết</span>
            <span className="text-base text-gray-700 whitespace-pre-line">{store.content}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-500 font-medium mb-1">Danh mục</span>
            <Chip label={getCategoryName(store.categoryId)} color="warning" className="font-semibold" />
          </div>
          {store.attachmentUrl && (
            <div className="mb-4">
              <span className="block text-gray-500 font-medium mb-1">Tệp đính kèm</span>
              <span className="text-base text-blue-700 underline">{store.attachmentUrl}</span>
            </div>
          )}
        </div>
        {/* Right: Picture */}
        <div className="flex flex-col items-center justify-center">
          {store.pictureUrl ? (
            <img
              src={store.pictureUrl}
              alt="Ảnh đại diện khóa học"
              className="w-64 h-40 object-cover rounded-xl border shadow mb-2"
            />
          ) : (
            <div className="w-64 h-40 bg-orange-100 rounded-xl flex items-center justify-center text-orange-400 text-4xl font-bold">
              ?
            </div>
          )}
          <span className="text-xs text-gray-400">Ảnh đại diện khóa học</span>
        </div>
      </div>
      {/* Sections & Steps */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-100 mb-8">
        <h3 className="text-lg font-bold text-orange-600 mb-4">Nội dung khóa học</h3>
        {store.queuingCourseSections.length === 0 ? (
          <div className="text-gray-500 italic">Chưa có phần/bước nào được thêm.</div>
        ) : (
          <ol className="space-y-6">
            {store.queuingCourseSections.map((section, sIdx) => (
              <li key={sIdx} className="">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">{section.sectionNumber}</span>
                  <span className="font-semibold text-lg text-gray-900">{section.sectionName}</span>
                </div>
                {section.steps.length === 0 ? (
                  <div className="ml-10 text-gray-400 italic">Chưa có bước nào</div>
                ) : (
                  <ol className="ml-10 space-y-2">
                    {section.steps.map((step, stIdx) => (
                      <li key={stIdx} className="bg-white rounded-lg border border-orange-100 p-3 flex flex-col md:flex-row md:items-center gap-2 shadow-sm">
                        <div className="flex items-center gap-2 min-w-[90px]">
                          <span className="bg-orange-200 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">{step.stepNumber}</span>
                          <span className="font-medium text-gray-800">{step.stepSummary}</span>
                        </div>
                        <span className="text-gray-600 flex-1">{step.content}</span>
                        <div className="flex flex-col md:items-end gap-1 min-w-[120px]">
                          <span className="text-xs text-gray-500">Thời lượng: {step.duration} phút</span>
                          {step.videoURL && (
                            <span className="text-xs text-violet-700 underline break-all block">
                              {step.videoURL}
                              {getYouTubeId(step.videoURL) && (
                                <div className="mt-2">
                                  <iframe
                                    width="320"
                                    height="180"
                                    src={`https://www.youtube.com/embed/${getYouTubeId(step.videoURL)}`}
                                    title="YouTube video preview"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-lg border mt-1"
                                  ></iframe>
                                </div>
                              )}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="outlined" onClick={onBack} disabled={loading}>Quay lại</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading || success} startIcon={loading ? <CircularProgress size={20} /> : null}>
          {loading ? "Đang gửi..." : "Xác nhận & Gửi"}
        </Button>
      </div>
    </div>
  );
};

export default CourseReviewAndSubmit; 