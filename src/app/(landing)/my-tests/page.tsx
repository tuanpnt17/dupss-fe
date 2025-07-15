'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/app/services/tests/apiService';

// Enum và options cho filter
const CATEGORY_OPTIONS = [
  { value: '', label: 'Tất cả loại' },
  { value: '1', label: 'ASSIST' },
  { value: '2', label: 'CRAFFT' },
];

const SORT_OPTIONS = [
  { value: 'CreatedAt', label: 'Ngày tạo' },
];

const SORT_ORDER_OPTIONS = [
  { value: 'asc', label: 'Tăng dần' },
  { value: 'desc', label: 'Giảm dần' },
];

function formatDate(dateStr?: string) {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('vi-VN');
}

export default function TestManagementPage() {
  // State cho filter, search, sort, paging và data
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('CreatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{
    totalCount: number;
    items: any[];
    pageIndex: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }>({
    totalCount: 0,
    items: [],
    pageIndex: 1,
    pageSize: 6,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm lấy dữ liệu từ API
  const fetchTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        PageIndex: page.toString(),
        PageSize: '6',
        Search: search,
        SortBy: sort,
        SortOrder: sortOrder,
        Category: category,
      };
      const response = await apiService.fetchTests(params);
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Không thể tải dữ liệu. Vui lòng thử lại.');
      console.error('Fetch tests error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi page, search, category, sort hoặc sortOrder thay đổi
  useEffect(() => {
    fetchTests();
  }, [page, search, category, sort, sortOrder]);

  // Handlers cho phân trang
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(Math.ceil(data.totalCount / data.pageSize), p + 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-2xl shadow-2xl mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative px-8 py-16 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Quản lý Bài Test
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Khám phá và quản lý bộ sưu tập bài test chuyên nghiệp của bạn
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium">
                Tổng cộng {data.totalCount} bài test
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Tìm kiếm
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nhập tên bài test..."
                  className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📂 Loại Test
              </label>
              <select
                className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📊 Sắp xếp
              </label>
              <select
                className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔄 Thứ tự
              </label>
              <select
                className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setPage(1);
                }}
              >
                {SORT_ORDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-red-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Đang tải dữ liệu...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Test Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.items.length === 0 ? (
              <div className="col-span-full">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-16 text-center border border-white/20">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Không có bài test nào</h3>
                  <p className="text-gray-500">Thử thay đổi tiêu chí tìm kiếm hoặc bộ lọc</p>
                </div>
              </div>
            ) : (
              data.items.map((item, index) => (
                <Link href={`/my-tests/${item.id}`} key={item.id} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 group-hover:border-orange-200 group-hover:bg-white group-hover:scale-105 transform">
                    <div className="relative">
                      {item.cover ? (
                        <img
                          src={item.cover}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center">
                          <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-orange-700 text-xs font-bold uppercase tracking-wider shadow-lg">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.description || 'Bài Test chuẩn Quốc tế với chất lượng đánh giá cao'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">
                              {item.author?.[0]?.toUpperCase() || 'D'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {item.author || 'DUPSS'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(item.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && data.totalCount > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-sm">Trang</span>
                <span className="font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                  {data.pageIndex}
                </span>
                <span className="text-sm">trên</span>
                <span className="font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                  {Math.ceil(data.totalCount / data.pageSize) || 1}
                </span>
              </div>
              
              <div className="flex gap-3">
                <button
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 text-gray-700 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  onClick={handlePrev}
                  disabled={!data.hasPreviousPage}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Trang trước
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  onClick={handleNext}
                  disabled={!data.hasNextPage}
                >
                  Trang sau
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}