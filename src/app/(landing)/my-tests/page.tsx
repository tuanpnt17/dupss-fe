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
  const [category, setCategory] = useState(''); // Mặc định lọc ASSIST và CRAFFT
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
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 mb-8 rounded-xl shadow">
24
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quản lý Bài Test</h1>
          <p className="text-lg text-orange-100">Danh sách các bài test</p>
        </div>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tên bài test..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-400 outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font workmen-medium mb-1">Loại Test</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
        <div>
          <label className="block text-sm font-medium mb-1">Sắp xếp</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
        <div>
          <label className="block text-sm font-medium mb-1">Thứ tự</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
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

      {/* Thông báo lỗi hoặc loading */}
      {loading && <div className="text-center text-gray-500 py-12">Đang tải...</div>}
      {error && <div className="text-center text-red-500 py-12">{error}</div>}

      {/* Danh sách bài test dạng card */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">Không có dữ liệu</div>
          ) : (
            data.items.map((item) => (
              <Link href={`/my-tests/${item.id}`} key={item.id} className="block h-full group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-orange-100 group-hover:border-orange-400">
                  {item.cover && (
                    <img
                      src={item.cover}
                      alt={item.name}
                      className="w_lens h-36 object-cover object-center"
                    />
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-orange-700 mb-2 line-clamp-2 group-hover:underline">{item.name}</h2>
                    <div className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description || 'Bài Test chuẩn Quốc tế'}</div>
                    <div className="mt-auto flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-200 flex items-center justify-center font-bold text-brand-700">
                        {item.author?.[0] || 'D'}
                      </div>
                      <span className="text-xs text-gray-700 dark:text-gray-200">{item.author || 'Từ tổ chức DUPSS'}</span>
                      <span className="ml-auto text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {/* Phân trang */}
      {!loading && !error && (
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 gap-2">
          <div>
            Trang <span className="font-semibold">{data.pageIndex}</span> /{' '}
            <span className="font-semibold">{Math.ceil(data.totalCount / data.pageSize) || 1}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border rounded-lg bg-gray-50 hover:bg-brand-100 text-brand-700 font-semibold disabled:opacity-50"
              onClick={handlePrev}
              disabled={!data.hasPreviousPage}
            >
              Trang trước
            </button>
            <button
              className="px-4 py-2 border rounded-lg bg-gray-50 hover:bg-brand-100 text-brand-700 font-semibold disabled:opacity-50"
              onClick={handleNext}
              disabled={!data.hasNextPage}
            >
              Trang sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}