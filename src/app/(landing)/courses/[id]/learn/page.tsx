'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample lesson data
const lessonData = {
  id: 3,
  title: 'Các loại ma túy phổ biến',
  content: `
    <h2 class="text-2xl font-bold mb-4">Các loại ma túy phổ biến</h2>
    <p class="mb-4">Ma túy có thể được phân loại theo nhiều cách khác nhau. Dưới đây là một số loại ma túy phổ biến và tác hại của chúng:</p>
    
    <h3 class="text-xl font-semibold mb-3">1. Ma túy tổng hợp</h3>
    <ul class="list-disc pl-6 mb-4">
      <li>Methamphetamine (ma túy đá)</li>
      <li>MDMA (thuốc lắc)</li>
      <li>Ketamine</li>
    </ul>
    
    <h3 class="text-xl font-semibold mb-3">2. Ma túy tự nhiên</h3>
    <ul class="list-disc pl-6 mb-4">
      <li>Cần sa</li>
      <li>Thuốc phiện</li>
      <li>Cocain</li>
    </ul>
    
    <h3 class="text-xl font-semibold mb-3">3. Các chất gây nghiện khác</h3>
    <ul class="list-disc pl-6 mb-4">
      <li>Rượu</li>
      <li>Thuốc lá</li>
      <li>Thuốc an thần</li>
    </ul>
  `,
  videoUrl: 'https://www.youtube.com/embed/example',
  duration: '25 phút',
  resources: [
    { id: 1, title: 'Tài liệu tham khảo', type: 'PDF', size: '2.5 MB' },
    { id: 2, title: 'Bài tập thực hành', type: 'DOC', size: '1.8 MB' },
  ],
  nextLesson: {
    id: 4,
    title: 'Tác hại về sức khỏe',
  },
  prevLesson: {
    id: 2,
    title: 'Ma túy là gì?',
  },
};

// Course sections data with progress
const courseSections = [
  {
    id: 1,
    title: 'Tổng Quan Về Ma Túy',
    totalLessons: 3,
    completedLessons: 2,
    lessons: [
      { id: 1, title: 'Giới thiệu khóa học', duration: '15 phút', completed: true, current: false },
      { id: 2, title: 'Ma túy là gì?', duration: '20 phút', completed: true, current: false },
      { id: 3, title: 'Các loại ma túy phổ biến', duration: '25 phút', completed: false, current: true },
    ],
  },
  {
    id: 2,
    title: 'Tác Hại Của Ma Túy',
    totalLessons: 3,
    completedLessons: 0,
    lessons: [
      { id: 4, title: 'Tác hại về sức khỏe', duration: '30 phút', completed: false, current: false },
      { id: 5, title: 'Tác hại về tâm lý', duration: '25 phút', completed: false, current: false },
      { id: 6, title: 'Tác hại về xã hội', duration: '20 phút', completed: false, current: false },
    ],
  },
  {
    id: 3,
    title: 'Phòng Tránh Ma Túy',
    totalLessons: 3,
    completedLessons: 0,
    lessons: [
      { id: 7, title: 'Kỹ năng từ chối', duration: '30 phút', completed: false, current: false },
      { id: 8, title: 'Xây dựng lối sống lành mạnh', duration: '25 phút', completed: false, current: false },
      { id: 9, title: 'Tìm kiếm sự giúp đỡ', duration: '20 phút', completed: false, current: false },
    ],
  },
];

// Calculate overall progress
const totalLessons = courseSections.reduce((sum, section) => sum + section.totalLessons, 0);
const completedLessons = courseSections.reduce((sum, section) => sum + section.completedLessons, 0);
const overallProgress = Math.round((completedLessons / totalLessons) * 100);

export default function LearnPage({ params }: { params: { id: string } }) {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]); // Start with first section expanded

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Navigation Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href={`/courses/${params.id}`}
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Hiểu Biết Về Ma Túy Cho Thanh Thiếu Niên</h1>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-orange-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-orange-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-64 md:h-96">
                <iframe
                  src={lessonData.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Lesson Content */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">{lessonData.title}</h1>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: lessonData.content }}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Link
                href={`/courses/${params.id}/learn/${lessonData.prevLesson.id}`}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Bài trước: {lessonData.prevLesson.title}</span>
              </Link>
              <Link
                href={`/courses/${params.id}/learn/${lessonData.nextLesson.id}`}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors"
              >
                <span>Bài tiếp: {lessonData.nextLesson.title}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Course Progress */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Tiến độ khóa học</h3>
                
                {/* Overall Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Tổng tiến độ</span>
                    <span className="text-sm font-medium text-orange-500">{overallProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Đã hoàn thành {completedLessons}/{totalLessons} bài học
                  </p>
                </div>

                {/* Course Sections */}
                <div className="space-y-4">
                  {courseSections.map((section) => {
                    const isExpanded = expandedSections.includes(section.id);
                    return (
                      <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Section Header */}
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full bg-gray-50 px-4 py-3 border-b border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <svg 
                                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-90' : ''
                                }`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                              <h4 className="font-semibold text-gray-900 text-left">{section.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">
                                {section.completedLessons}/{section.totalLessons}
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                                  style={{ 
                                    width: `${section.totalLessons > 0 ? (section.completedLessons / section.totalLessons) * 100 : 0}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </button>
                        
                        {/* Section Lessons */}
                        {isExpanded && (
                          <div className="divide-y divide-gray-100">
                            {section.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${
                                  lesson.current ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                                }`}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  {lesson.completed ? (
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  ) : lesson.current ? (
                                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                      <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                  ) : (
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                  )}
                                  <span className={`text-sm ${lesson.current ? 'font-medium text-orange-700' : 'text-gray-700'}`}>
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Tài liệu bài học</h3>
                <div className="space-y-3">
                  {lessonData.resources.map((resource) => (
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

              {/* Notes */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Ghi chú</h3>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Thêm ghi chú cho bài học này..."
                ></textarea>
                <button className="mt-3 w-full bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Lưu ghi chú
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 