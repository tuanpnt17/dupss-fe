'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Sample course data
const courseData = {
  id: 1,
  title: 'Hiểu Biết Về Ma Túy Cho Thanh Thiếu Niên',
  description: 'Khóa học cung cấp kiến thức cơ bản về các loại ma túy, tác hại và cách phòng tránh. Học viên sẽ được trang bị những kỹ năng cần thiết để nhận biết và phòng tránh ma túy trong cuộc sống hàng ngày.',
  instructor: {
    name: 'Nguyễn Văn A',
    role: 'Chuyên gia tư vấn',
    image: '/images/instructors/instructor-1.jpg',
  },
  duration: '4 tuần',
  level: 'Cơ bản',
  format: 'Trực tuyến',
  progress: 35,
  rating: 4.8,
  totalStudents: 1250,
  lastAccessed: 'Bài 3: Nhận Biết Các Loại Ma Túy',
  modules: [
    {
      id: 1,
      title: 'Tổng Quan Về Ma Túy',
      lessons: [
        { id: 1, title: 'Giới thiệu khóa học', duration: '15 phút', completed: true },
        { id: 2, title: 'Ma túy là gì?', duration: '20 phút', completed: true },
        { id: 3, title: 'Các loại ma túy phổ biến', duration: '25 phút', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Tác Hại Của Ma Túy',
      lessons: [
        { id: 4, title: 'Tác hại về sức khỏe', duration: '30 phút', completed: false },
        { id: 5, title: 'Tác hại về tâm lý', duration: '25 phút', completed: false },
        { id: 6, title: 'Tác hại về xã hội', duration: '20 phút', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Phòng Tránh Ma Túy',
      lessons: [
        { id: 7, title: 'Kỹ năng từ chối', duration: '30 phút', completed: false },
        { id: 8, title: 'Xây dựng lối sống lành mạnh', duration: '25 phút', completed: false },
        { id: 9, title: 'Tìm kiếm sự giúp đỡ', duration: '20 phút', completed: false },
      ],
    },
  ],
  resources: [
    { id: 1, title: 'Tài liệu tham khảo', type: 'PDF', size: '2.5 MB' },
    { id: 2, title: 'Danh sách địa chỉ hỗ trợ', type: 'PDF', size: '1.2 MB' },
    { id: 3, title: 'Bài tập thực hành', type: 'DOC', size: '3.1 MB' },
  ],
  relatedCourses: [
    {
      id: 2,
      title: 'Hướng Dẫn Phụ Huynh Phòng Chống Ma Túy',
      image: '/images/courses/parents-course.jpg',
    },
    {
      id: 3,
      title: 'Kỹ Năng Tư Vấn Cho Tình Nguyện Viên',
      image: '/images/courses/volunteer-course.jpg',
    },
  ],
};

export default async function CourseDetailPage({ params }: { params?: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = params ? await params : undefined;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{courseData.title} (ID: {resolvedParams?.id})</h1>
            <p className="text-lg mb-6 opacity-90">{courseData.description}</p>
            
            {/* Instructor Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={courseData.instructor.image}
                  alt={courseData.instructor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">{courseData.instructor.name}</p>
                <p className="text-sm opacity-80">{courseData.instructor.role}</p>
              </div>
            </div>

            {/* Course Meta */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{courseData.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>{courseData.format}</span>
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
              <span className="text-sm font-medium text-orange-500">{courseData.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${courseData.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Bài học cuối: {courseData.lastAccessed}
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
                  src="/images/courses/course-preview.jpg"
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

            {/* Curriculum */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Nội dung khóa học</h2>
                <div className="space-y-4">
                  {courseData.modules.map((module) => (
                    <div key={module.id} className="border rounded-lg">
                      <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50">
                        <span className="font-semibold">{module.title}</span>
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="px-4 pb-4">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                              )}
                              <span className="text-gray-700">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-600">Đánh giá: {courseData.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-gray-600">{courseData.totalStudents} học viên</span>
                  </div>
                </div>
                <button onClick={() => router.push(`/courses/${resolvedParams?.id}/learn`)} className="w-full mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                  Tiếp tục học
                </button>
              </div>

              {/* Resources Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Tài liệu</h3>
                <div className="space-y-3">
                  {courseData.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">{resource.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">{resource.size}</span>
                    </div>
                  ))}
                </div>
              </div>

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

              {/* Related Courses */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Khóa học liên quan</h3>
                <div className="space-y-4">
                  {courseData.relatedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-gray-700">{course.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
