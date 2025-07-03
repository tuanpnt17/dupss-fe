'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Calendar, User, Clock, ChevronDown } from 'lucide-react';

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'Dấu hiệu nhận biết người nghiện ma túy và cách hỗ trợ',
    description: 'Bài viết cung cấp thông tin về các dấu hiệu cảnh báo khi người thân có thể đang sử dụng ma túy và cách tiếp cận để hỗ trợ họ.',
    author: 'Dr. Nguyễn Văn An',
    authorAvatar: '/images/user/user-01.jpg',
    date: '2024-01-15',
    readTime: '5 phút',
    category: 'Giáo dục',
    tags: ['Dấu hiệu', 'Hỗ trợ', 'Gia đình']
  },
  {
    id: 2,
    title: 'Câu chuyện vượt qua cơn nghiện: Từ bóng tối đến ánh sáng',
    description: 'Chia sẻ câu chuyện cảm động của một người đã thành công vượt qua cơn nghiện ma túy và tìm lại cuộc sống ý nghĩa.',
    author: 'Mai Thị Hương',
    authorAvatar: '/images/user/user-02.jpg',
    date: '2024-01-12',
    readTime: '8 phút',
    category: 'Câu chuyện',
    tags: ['Phục hồi', 'Hy vọng', 'Thành công']
  },
  {
    id: 3,
    title: 'Tác hại của ma túy đá đối với sức khỏe tâm thần',
    description: 'Phân tích chi tiết về những tác động nghiêm trọng của ma túy đá lên não bộ và sức khỏe tâm thần của người sử dụng.',
    author: 'Dr. Trần Minh Khôi',
    authorAvatar: '/images/user/user-03.jpg',
    date: '2024-01-10',
    readTime: '6 phút',
    category: 'Sức khỏe',
    tags: ['Ma túy đá', 'Tâm thần', 'Não bộ']
  },
  {
    id: 4,
    title: 'Làm thế nào để nói chuyện với con về ma túy?',
    description: 'Hướng dẫn cho các bậc cha mẹ cách mở cuộc trò chuyện hiệu quả với con cái về chủ đề ma túy một cách phù hợp với lứa tuổi.',
    author: 'Phạm Thị Lan',
    authorAvatar: '/images/user/user-04.jpg',
    date: '2024-01-08',
    readTime: '7 phút',
    category: 'Gia đình',
    tags: ['Giao tiếp', 'Trẻ em', 'Giáo dục']
  },
  {
    id: 5,
    title: 'Các phương pháp điều trị nghiện ma túy hiện đại',
    description: 'Tổng quan về các phương pháp điều trị nghiện ma túy tiên tiến hiện nay, từ liệu pháp tâm lý đến thuốc hỗ trợ.',
    author: 'Dr. Lê Văn Bình',
    authorAvatar: '/images/user/user-05.jpg',
    date: '2024-01-05',
    readTime: '10 phút',
    category: 'Điều trị',
    tags: ['Phương pháp', 'Hiện đại', 'Điều trị']
  },
  {
    id: 6,
    title: 'Vai trò của cộng đồng trong phòng chống ma túy',
    description: 'Khám phá cách cộng đồng có thể đóng góp tích cực vào việc phòng chống ma túy và hỗ trợ người nghiện phục hồi.',
    author: 'Nguyễn Thị Mai',
    authorAvatar: '/images/user/user-06.jpg',
    date: '2024-01-03',
    readTime: '6 phút',
    category: 'Cộng đồng',
    tags: ['Cộng đồng', 'Phòng chống', 'Hỗ trợ']
  }
];

const categories = ['Tất cả', 'Giáo dục', 'Câu chuyện', 'Sức khỏe', 'Gia đình', 'Điều trị', 'Cộng đồng'];
const authors = ['Tất cả', 'Dr. Nguyễn Văn An', 'Mai Thị Hương', 'Dr. Trần Minh Khôi', 'Phạm Thị Lan', 'Dr. Lê Văn Bình', 'Nguyễn Thị Mai'];

export default function BlogListingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedAuthor, setSelectedAuthor] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(false);

  // Filter blog posts based on search and filters
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Tất cả' || post.category === selectedCategory;
      const matchesAuthor = selectedAuthor === 'Tất cả' || post.author === selectedAuthor;
      
      return matchesSearch && matchesCategory && matchesAuthor;
    });
  }, [searchTerm, selectedCategory, selectedAuthor]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog Chung Tay Chống Ma Túy
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Chia sẻ kiến thức, câu chuyện và kinh nghiệm để xây dựng cộng đồng mạnh mẽ, không ma túy
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle for Mobile */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Bộ lọc</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Panel */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tác giả
                </label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {authors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold text-orange-600">{filteredPosts.length}</span> bài viết
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Blog Card Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-xl">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                  <p className="text-orange-600 font-medium">{post.category}</p>
                </div>
              </div>

              {/* Blog Card Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <Link href={`/blogs/${post.id}`}>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>

                {/* Author and Meta Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/blogs/${post.id}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                  >
                    Đọc thêm
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
            <p className="text-gray-600 mb-4">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm bài viết phù hợp
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Tất cả');
                setSelectedAuthor('Tất cả');
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin tức</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Nhận những bài viết mới nhất về phòng chống ma túy và câu chuyện truyền cảm hứng
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
