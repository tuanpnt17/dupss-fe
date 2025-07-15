'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IGetCourseDetail, ICourseSection } from '@/types/courses';
import { coursesService } from '@/services/courses.service';

const CourseDetail = ({ courseDetail }: { courseDetail: IGetCourseDetail }) => {
  const router = useRouter();
  const [sections, setSections] = useState<ICourseSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        const response = await coursesService.getCourseSections(courseDetail.id);
        
        if (response && response.value) {
          setSections(response.value);
          // Expand first section by default
          if (response.value.length > 0) {
            setExpandedSections(new Set([response.value[0].id]));
          }
        } else {
          setError('Không thể tải nội dung khóa học');
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi tải dữ liệu');
        console.error('Error fetching sections:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [courseDetail.id]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  // Calculate progress based on completed steps (mock data for now)
  const progress = 35; // This would come from user progress API
  const lastAccessed = sections.length > 0 && sections[0].steps.length > 0 
    ? sections[0].steps[0].stepSummary 
    : 'Chưa bắt đầu';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{courseDetail.courseName}</h1>
            <p className="text-lg mb-6 opacity-90">{courseDetail.summary}</p>
            
            {/* Course Meta */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{courseDetail.totalDuration} phút</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{courseDetail.totalSection} phần</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>{courseDetail.totalStep} bước</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="bg-white py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Tiến độ khóa học</span>
              <span className="text-sm font-medium text-orange-500">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Bài học cuối: {lastAccessed}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Preview Video */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-64 md:h-96">
                <Image
                  src={courseDetail.pictureURL || '/images/courses/default-course.jpg'}
                  alt="Course Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transition-colors">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Nội dung khóa học</h2>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: courseDetail.content }} />
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Cấu trúc khóa học</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải nội dung...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                    >
                      Thử lại
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sections.map((section) => (
                      <div key={section.id} className="border rounded-lg">
                        <button 
                          onClick={() => toggleSection(section.id)} 
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                        >
                          <span className="font-semibold">{section.sectionName}</span>
                          <svg 
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedSections.has(section.id) ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {expandedSections.has(section.id) && (
                          <div className="px-4 pb-4">
                            {section.steps.map((step) => (
                              <div
                                key={step.id}
                                className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded cursor-pointer"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                  <span className="text-gray-700">{step.stepSummary}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Course Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Thông tin khóa học</h3>
                <div className="space-y-4">
                  {courseDetail.ratingAverage && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-600">Đánh giá: {courseDetail.ratingAverage.toFixed(1)}/5 ({courseDetail.ratingCount} đánh giá)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-gray-600">Mã khóa học: {courseDetail.courseCode}</span>
                  </div>
                </div>
                <button 
                  onClick={() => router.push(`/courses/${courseDetail.id}/step/1`)} 
                  className="w-full mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Bắt đầu học
                </button>
              </div>

              {/* Resources Card */}
              {courseDetail.attachment && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Tài liệu</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">Tài liệu đính kèm</span>
                      </div>
                      <a 
                        href={courseDetail.attachment} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-600"
                      >
                        Tải xuống
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Certificate Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Chứng chỉ</h3>
                <p className="text-gray-600 mb-4">
                  Hoàn thành khóa học để nhận chứng chỉ xác nhận kiến thức và kỹ năng của bạn.
                </p>
                <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Xem mẫu chứng chỉ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;