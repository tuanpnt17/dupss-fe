'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { testsService } from "@/services/tests.service";
import { TestData, TestQueryParams } from "@/types/tests";

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

export default function TestList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('CreatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{
    totalCount: number;
    items: TestData[];
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

  const fetchTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: TestQueryParams = {
        PageIndex: page.toString(),
        PageSize: '6',
        Search: search,
        SortBy: sort,
        SortOrder: sortOrder,
        Category: category,
      };
      const response = await testsService.getTests(params);
      if (response) setData(response);
    } catch (err: any) {
      setError(err.message || 'Không thể tải dữ liệu. Vui lòng thử lại.');
      console.error('Fetch tests error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, category, sort, sortOrder]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(Math.ceil(data.totalCount / data.pageSize), p + 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-red-400 to-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-orange-500 to-red-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Hệ thống quản lý bài test
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Danh sách bài test
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Quản lý và theo dõi các bài test của bạn một cách hiệu quả và trực quan
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-xl opacity-60"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Bộ lọc và tìm kiếm
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài test..."
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                      className="w-full border-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl px-6 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-300 shadow-inner"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 lg:space-y-0 lg:flex lg:gap-4 lg:col-span-2">
                  <select 
                    value={category} 
                    onChange={e => { setCategory(e.target.value); setPage(1); }} 
                    className="w-full border-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl px-4 py-4 text-gray-700 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-300 shadow-inner"
                  >
                    {CATEGORY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  
                  <select 
                    value={sort} 
                    onChange={e => { setSort(e.target.value); setPage(1); }} 
                    className="w-full border-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl px-4 py-4 text-gray-700 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-300 shadow-inner"
                  >
                    {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  
                  <select 
                    value={sortOrder} 
                    onChange={e => { setSortOrder(e.target.value); setPage(1); }} 
                    className="w-full border-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl px-4 py-4 text-gray-700 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-300 shadow-inner"
                  >
                    {SORT_ORDER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-red-500 rounded-full animate-spin animate-reverse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="ml-6">
                <div className="text-lg font-semibold text-gray-700">Đang tải dữ liệu...</div>
                <div className="text-sm text-gray-500">Vui lòng chờ trong giây lát</div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-red-800 font-semibold mb-1">Có lỗi xảy ra</div>
                  <div className="text-red-600">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* List */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {data.items.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mx-auto flex items-center justify-center">
                      <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-gray-600 text-xl font-medium mb-2">Chưa có bài test nào</div>
                  <div className="text-gray-400 text-sm">Thử điều chỉnh bộ lọc hoặc tạo bài test mới</div>
                </div>
              ) : (
                data.items.map((item, index) => (
                  <Link 
                    href={`/my-tests/${item.id}`} 
                    key={item.id} 
                    className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Card Background Effects */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-red-200 to-pink-200 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    {/* Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                {item.name}
                              </h3>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <span className={`px-4 py-2 text-xs font-semibold rounded-full border-2 ${
                              item.category === 'ASSIST' 
                                ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border-orange-200' 
                                : 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200'
                            }`}>
                              {item.category}
                            </span>
                          </div>
                          
                          <div className="text-xs text-gray-400 font-mono bg-gray-50 rounded-lg px-3 py-2 inline-block">
                            ID: {item.id}
                          </div>
                        </div>
                        
                        <div className="text-orange-400 group-hover:text-orange-600 transition-colors duration-300 group-hover:translate-x-1 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Xem chi tiết</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-60"></div>
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-30"></div>
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
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-2xl opacity-20"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Hiển thị <span className="font-semibold text-orange-600">{((data.pageIndex - 1) * data.pageSize) + 1} - {Math.min(data.pageIndex * data.pageSize, data.totalCount)}</span> trong tổng số <span className="font-semibold text-red-600">{data.totalCount}</span> bài test
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handlePrev} 
                      disabled={!data.hasPreviousPage} 
                      className="group px-6 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 transition-all duration-300 flex items-center gap-2 font-medium"
                    >
                      <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Trang trước
                    </button>
                    
                    <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg">
                      <span>{data.pageIndex}</span>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <span className="text-orange-100">{Math.ceil(data.totalCount / data.pageSize) || 1}</span>
                    </div>
                    
                    <button 
                      onClick={handleNext} 
                      disabled={!data.hasNextPage} 
                      className="group px-6 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 transition-all duration-300 flex items-center gap-2 font-medium"
                    >
                      Trang sau
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}