'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IGetStepDetail } from '@/types/steps';
import { ICourseSection } from '@/types/courses';
import { stepsService } from '@/services/steps.service';
import { coursesService } from '@/services/courses.service';
import useAuthStore from '@/stores/useAuthStore';
import { IGetStepTracking } from '@/types/steps';

export default function StepDetail({ params }: { params: { id: string, stepId: string } }) {
  const router = useRouter();
  const authStore = useAuthStore();
  const accessToken = authStore.accessToken;
  const isLoggedIn = authStore.isLoggedIn;
  const [stepDetail, setStepDetail] = useState<IGetStepDetail | null>(null);
  const [courseSections, setCourseSections] = useState<ICourseSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [marking, setMarking] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stepTracking, setStepTracking] = useState<IGetStepTracking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch step detail
        const stepResponse = await stepsService.getStepDetail(params.stepId);
        if (stepResponse && stepResponse.value) {
          setStepDetail(stepResponse.value);
          
          // Fetch course sections using the courseSectionId from step
          const sectionsResponse = await coursesService.getCourseSections(params.id);
          if (sectionsResponse && sectionsResponse.value) {
            setCourseSections(sectionsResponse.value);
            // Expand first section by default
            if (sectionsResponse.value.length > 0) {
              setExpandedSections(new Set([sectionsResponse.value[0].id]));
            }
          }
        } else {
          setError('Không thể tải thông tin bài học');
        }
        // Fetch step tracking if logged in
        if (isLoggedIn) {
          const trackingRes = await coursesService.getCourseTracking(params.id, accessToken || '');
          if (trackingRes && trackingRes.value) {
            setStepTracking(trackingRes.value);
            setCompleted(trackingRes.value.some(track => track.id === params.stepId));
          } else {
            setCompleted(false);
          }
        } else {
          setCompleted(false);
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi tải dữ liệu');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.stepId, isLoggedIn, accessToken, params.id]);

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

  const handleMarkCompleted = async () => {
    setMarking(true);
    try {
      await stepsService.markStepAsCompleted(params.stepId, accessToken || '');
      // After marking as completed, refresh step tracking and completed state
      if (isLoggedIn) {
        const trackingRes = await coursesService.getCourseTracking(params.id, accessToken || '');
        if (trackingRes && trackingRes.value) {
          setStepTracking(trackingRes.value);
          setCompleted(trackingRes.value.some(track => track.id === params.stepId));
        } else {
          setCompleted(false);
        }
      } else {
        setCompleted(false);
      }
    } finally {
      setMarking(false);
    }
  };

  // Calculate overall progress using stepTracking
  const allSteps = courseSections.flatMap(section => section.steps);
  const totalSteps = allSteps.length;
  const completedSteps = allSteps.filter(step => stepTracking.some(track => track.id === step.id)).length;
  const overallProgress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const isStepTracked = (stepId: string) => stepTracking.some(track => track.id === stepId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài học...</p>
        </div>
      </div>
    );
  }

  if (error || !stepDetail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Không tìm thấy bài học'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

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
            <h1 className="text-lg font-semibold text-gray-900">Bài học {stepDetail.stepNumber}</h1>
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
            {stepDetail.videoURL && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="relative h-64 md:h-96">
                  <iframe
                    src={getEmbedUrl(stepDetail.videoURL)}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Lesson Content */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">{stepDetail.stepSummary}</h1>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: stepDetail.content }}
                />
                {isLoggedIn && !completed && (
                  <button
                    className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    onClick={handleMarkCompleted}
                    disabled={marking}
                  >
                    {marking ? 'Đang lưu...' : 'Đánh dấu hoàn thành'}
                  </button>
                )}
                {completed && (
                  <div className="mt-6 text-green-600 font-semibold">Đã hoàn thành bài học này!</div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Quay lại</span>
              </button>
              <button
                onClick={() => router.push(`/courses/${stepDetail.courseSectionId}/step/${parseInt(stepDetail.id) + 1}`)}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors"
              >
                <span>Bài tiếp theo</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Course Progress */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Tiến độ học tập</h3>
                
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
                    Đã hoàn thành {completedSteps}/{totalSteps} bước học
                  </p>
                </div>

                {/* Course Sections */}
                <div className="space-y-4">
                  {courseSections.map((section) => {
                    const isExpanded = expandedSections.has(section.id);
                    const currentStepInSection = section.steps.find(step => step.id === params.stepId);
                    
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
                              <h4 className="font-semibold text-gray-900 text-left">{section.sectionName}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">
                                {section.steps.length} bước
                              </span>
                            </div>
                          </div>
                        </button>
                        
                        {/* Section Steps */}
                        {isExpanded && (
                          <div className="divide-y divide-gray-100">
                            {section.steps.sort((a, b) => a.stepNumber - b.stepNumber).map((step) => (
                              <div
                                key={step.id}
                                className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${
                                  step.id === params.stepId ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                                }`}
                                onClick={() => router.push(`/courses/${params.id}/step/${step.id}`)}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  {isStepTracked(step.id) ? (
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  ) : step.id === params.stepId ? (
                                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                      <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                  ) : (
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                  )}
                                    <span className={`text-sm ${step.id === params.stepId ? 'font-medium text-orange-700' : 'text-gray-700'}`}>
                                    {step.stepSummary}
                                  </span>
                                </div>
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
              {stepDetail.attachment && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Tài liệu bài học</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">Tài liệu đính kèm</span>
                      </div>
                      <a 
                        href={stepDetail.attachment} 
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

const getEmbedUrl = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};