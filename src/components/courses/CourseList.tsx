'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { coursesService } from '@/services/courses.service';
import { IGetAllCourses } from '@/types/courses';

// Course categories
const categories = [
    { id: 'all', name: 'Tất Cả' },
    { id: 'youth', name: 'Thanh Thiếu Niên' },
    { id: 'parents', name: 'Phụ Huynh' },
    { id: 'volunteers', name: 'Tình Nguyện Viên' },
    { id: 'rehabilitation', name: 'Phục Hồi' },
];

const CourseList = () => {
    const [courses, setCourses] = useState<IGetAllCourses[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await coursesService.getAllCourses();
                console.log(response);

                if (response && response.value) {
                    setCourses(response.value.items);
                } else {
                    setError('Không thể tải danh sách khóa học');
                }
            } catch (err) {
                setError('Đã xảy ra lỗi khi tải dữ liệu');
                console.error('Error fetching courses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Filter courses based on search term and category
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.summary.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || course.categoryName.toLowerCase().includes(selectedCategory);
        
        return matchesSearch && matchesCategory;
    });

    // Featured courses (first 3 courses)
    const featuredCourses = filteredCourses.slice(0, 3);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải khóa học...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
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
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Chương Trình Giáo Dục</h1>
                <p className="text-xl mb-8">
                  Khám phá các khóa học được thiết kế để nâng cao nhận thức và kỹ năng phòng chống ma túy
                </p>
              </div>
            </div>
          </section>
    
          {/* Search and Filter Section */}
          <section className="py-8 bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="w-full md:w-96">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm khóa học..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
    
                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                  <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500">
                    <option value="">Thời lượng</option>
                    <option value="short">Ngắn hạn (1-4 tuần)</option>
                    <option value="medium">Trung hạn (5-8 tuần)</option>
                    <option value="long">Dài hạn (9+ tuần)</option>
                  </select>
                  <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500">
                    <option value="">Cấp độ</option>
                    <option value="basic">Cơ bản</option>
                    <option value="intermediate">Trung cấp</option>
                    <option value="advanced">Nâng cao</option>
                  </select>
                  <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500">
                    <option value="">Hình thức</option>
                    <option value="online">Trực tuyến</option>
                    <option value="offline">Trực tiếp</option>
                    <option value="hybrid">Hỗn hợp</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
    
          {/* Category Tabs */}
          <section className="py-6 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${selectedCategory === category.id 
                        ? 'bg-orange-500 text-white' 
                        : 'hover:bg-orange-100 hover:text-orange-600'
                      }
                      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
    
          {/* Featured Courses */}
          {featuredCourses.length > 0 && (
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Khóa Học Nổi Bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                    >
                      <div className="relative h-48">
                        <Image
                          src={course.pictureURL || '/images/courses/default-course.jpg'}
                          alt={course.courseName}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                          Nổi bật
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{course.courseName}</h3>
                        <p className="text-gray-600 mb-4">{course.summary}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                            {course.totalDuration} phút
                          </span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                            {course.totalSection} phần
                          </span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                            {course.categoryName}
                          </span>
                        </div>
                        <Link
                          href={`/courses/${course.id}`}
                          className="block w-full text-center bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Xem Chi Tiết
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
    
          {/* All Courses */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Tất Cả Khóa Học ({filteredCourses.length})
              </h2>
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Không tìm thấy khóa học nào phù hợp</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                    >
                      <div className="relative h-48">
                        <Image
                          src={course.pictureURL || '/images/courses/default-course.jpg'}
                          alt={course.courseName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{course.courseName}</h3>
                        <p className="text-gray-600 mb-4">{course.summary}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                            {course.totalDuration} phút
                          </span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                            {course.totalSection} phần
                          </span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                            {course.categoryName}
                          </span>
                        </div>
                        <Link
                          href={`/courses/${course.id}`}
                          className="block w-full text-center bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Xem Chi Tiết
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      );
}

export default CourseList;