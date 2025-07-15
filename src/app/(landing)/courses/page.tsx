import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogsService } from '@/services/blogs.service';

// Course categories
const categories = [
  { id: 'all', name: 'Tất Cả' },
  { id: 'youth', name: 'Thanh Thiếu Niên' },
  { id: 'parents', name: 'Phụ Huynh' },
  { id: 'volunteers', name: 'Tình Nguyện Viên' },
  { id: 'rehabilitation', name: 'Phục Hồi' },
];

// Sample course data
const courses = [
  {
    id: 1,
    title: 'Hiểu Biết Về Ma Túy Cho Thanh Thiếu Niên',
    description: 'Khóa học cung cấp kiến thức cơ bản về các loại ma túy, tác hại và cách phòng tránh.',
    duration: '4 tuần',
    level: 'Cơ bản',
    format: 'Trực tuyến',
    category: 'youth',
    image: '/images/courses/youth-course.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Hướng Dẫn Phụ Huynh Phòng Chống Ma Túy',
    description: 'Học cách nhận biết dấu hiệu và giao tiếp hiệu quả với con về vấn đề ma túy.',
    duration: '6 tuần',
    level: 'Trung cấp',
    format: 'Hỗn hợp',
    category: 'parents',
    image: '/images/courses/parents-course.jpg',
  },
  {
    id: 3,
    title: 'Kỹ Năng Tư Vấn Cho Tình Nguyện Viên',
    description: 'Đào tạo kỹ năng tư vấn và hỗ trợ người nghiện ma túy.',
    duration: '8 tuần',
    level: 'Nâng cao',
    format: 'Trực tiếp',
    category: 'volunteers',
    image: '/images/courses/volunteer-course.jpg',
  },
  {
    id: 4,
    title: 'Phương Pháp Phục Hồi Tâm Lý',
    description: 'Các phương pháp và kỹ thuật hỗ trợ phục hồi tâm lý cho người cai nghiện.',
    duration: '10 tuần',
    level: 'Nâng cao',
    format: 'Hỗn hợp',
    category: 'rehabilitation',
    image: '/images/courses/rehab-course.jpg',
  },
];

export default async function CoursesPage() {

  const blogs = await blogsService.getBlogs();
  console.log(blogs);

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
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors
                  hover:bg-orange-100 hover:text-orange-600
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Khóa Học Nổi Bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses
              .filter((course) => course.featured)
              .map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <div className="relative h-48">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                      Nổi bật
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                        {course.duration}
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                        {course.level}
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                        {course.format}
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

      {/* All Courses */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tất Cả Khóa Học</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                      {course.duration}
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                      {course.level}
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                      {course.format}
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
    </div>
  );
}
