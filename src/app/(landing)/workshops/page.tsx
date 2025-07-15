// app/workshops/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiService } from '@/app/services/workshops/apiService';
import { Calendar, Clock, User, ArrowRight, Search, Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkshopData {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  host: string;
  status: boolean;
}

interface WorkshopApiResponse {
  totalCount: number;
  items: WorkshopData[];
  pageIndex: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const WorkshopListPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [workshops, setWorkshops] = useState<WorkshopData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(parseInt(searchParams.get('pageIndex') || '1'));
  const [pageSize] = useState(parseInt(searchParams.get('pageSize') || '10'));
  const [search, setSearch] = useState(searchParams.get('Search') || '');
  const [host, setHost] = useState(searchParams.get('Host') || '');
  const [status, setStatus] = useState<string | ''>(searchParams.get('Status') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('SortBy') || 'createdAt');
  const [sortOrder, setSortOrder] = useState(searchParams.get('SortOrder') || 'desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const params = {
          PageIndex: pageIndex.toString(),
          PageSize: pageSize.toString(),
          Search: search,
          SortBy: sortBy,
          SortOrder: sortOrder,
          Host: host,
          Status: status,
        };
        console.log('API Call Params:', params);
        const data: WorkshopApiResponse = await apiService.fetchWorkshops(params);
        console.log('API Response:', data);
        if (data && data.items) {
          setWorkshops(data.items);
          setTotalCount(data.totalCount);
        } else {
          setWorkshops([]);
          setTotalCount(0);
          setError('Dữ liệu trả về không hợp lệ từ API.');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
        setError(`Không thể tải danh sách workshop. Chi tiết: ${errorMessage}`);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [pageIndex, pageSize, search, host, status, sortBy, sortOrder]);

  useEffect(() => {
    // Update URL with query parameters
    const query = new URLSearchParams({
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString(),
      ...(search && { Search: search }),
      ...(sortBy && { SortBy: sortBy }),
      ...(sortOrder && { SortOrder: sortOrder }),
      ...(host && { Host: host }),
      ...(status && { Status: status }),
    }).toString();
    router.push(`/workshops?${query}`, { scroll: false });
  }, [pageIndex, pageSize, search, sortBy, sortOrder, host, status, router]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / pageSize)) {
      setPageIndex(newPage);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPageIndex(1); // Reset to first page on new search
  };

  const handleFilterChange = () => {
    setPageIndex(1); // Reset to first page on filter change
  };

  const getIntroDescription = (description: string | undefined) => {
    if (!description) return 'Không có mô tả';
    const contentIndex = description.indexOf('Nội dung');
    let introText = contentIndex !== -1 ? description.substring(0, contentIndex).trim() : description.trim();
    introText = introText.replace(/•|\*|➤|-/g, '').replace(/\n\s*/g, ' ').trim();
    return introText;
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-6"></div>
        <p className="text-orange-700 font-medium text-lg">Đang tải workshops...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h3>
        <p className="text-red-600 font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
        >
          Thử lại
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎯 <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Workshop</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá những workshop chất lượng cao để nâng cao kỹ năng và kiến thức của bạn
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <form onSubmit={handleSearch} className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm workshop..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPageIndex(1);
                  }}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none w-full"
                />
              </form>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Lọc</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Hiển thị: {totalCount} workshops</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chủ trì</label>
                <input
                  type="text"
                  placeholder="Tìm theo người chủ trì..."
                  value={host}
                  onChange={(e) => {
                    setHost(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                >
                  <option value="">Tất cả</option>
                  <option value="true">Hoạt động</option>
                  <option value="false">Kết thúc</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp theo</label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                >
                  <option value="createdAt">Ngày tạo</option>
                  <option value="title">Tiêu đề</option>
                  <option value="startdate">Ngày bắt đầu</option>
                  <option value="enddate">Ngày kết thúc</option>
                  <option value="host">Chủ trì</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                >
                  <option value="desc">Giảm dần</option>
                  <option value="asc">Tăng dần</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Workshop Cards */}
        {workshops.length > 0 ? (
          <div className={`grid gap-6 mb-12 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
              >
                {/* Image Section */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'md:w-80 md:flex-shrink-0' : ''
                }`}>
                  {workshop.imageUrl ? (
                    <img
                      src={workshop.imageUrl}
                      alt={workshop.title}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                        viewMode === 'list' ? 'h-48 md:h-full' : 'h-48'
                      }`}
                    />
                  ) : (
                    <div className={`w-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center ${
                      viewMode === 'list' ? 'h-48 md:h-full' : 'h-48'
                    }`}>
                      <div className="text-white text-4xl">🎯</div>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                      workshop.status 
                        ? 'bg-green-500/90 text-white' 
                        : 'bg-red-500/90 text-white'
                    }`}>
                      {workshop.status ? '🟢 Hoạt động' : '🔴 Kết thúc'}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`p-6 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {workshop.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {getIntroDescription(workshop.description)}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span>
                        {new Date(workshop.startDate).toLocaleDateString('vi-VN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })} - {new Date(workshop.endDate).toLocaleDateString('vi-VN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <User className="h-4 w-4 text-red-500" />
                      <span>Chủ trì: {workshop.host}</span>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <a
                        href={`/workshops/${workshop.id}`}
                        className="inline-flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                      >
                        <span>Xem chi tiết</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có workshop nào</h3>
            <p className="text-gray-600">Vui lòng quay lại sau hoặc thử tìm kiếm với từ khóa khác</p>
          </div>
        )}

        {/* Pagination */}
        {totalCount > 0 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 1}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Trước</span>
            </button>
            
            <div className="flex items-center space-x-1">
              {[...Array(Math.min(5, Math.ceil(totalCount / pageSize)))].map((_, i) => {
                const pageNum = pageIndex - 2 + i > 0 ? pageIndex - 2 + i : 1;
                if (pageNum > Math.ceil(totalCount / pageSize)) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                      pageNum === pageIndex
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex >= Math.ceil(totalCount / pageSize)}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <span>Tiếp</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopListPage;