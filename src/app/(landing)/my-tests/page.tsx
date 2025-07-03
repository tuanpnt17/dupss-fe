'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// Mock enum và data
const CATEGORY_OPTIONS = [
  { value: '', label: 'Tất cả loại' },
  { value: 'ASSIST', label: 'ASSIST' },
  { value: 'CRAFFT', label: 'CRAFFT' },
  // Thêm các loại khác nếu có
];

const SORT_OPTIONS = [
  { value: 'CreatedAt', label: 'Ngày tạo' },
  { value: 'Workshop.StartDate', label: 'Ngày bắt đầu Workshop' },
  { value: 'Workshop.EndDate', label: 'Ngày kết thúc Workshop' },
];

// Mock data
const MOCK_DATA = [
  {
    Id: '1',
    Name: 'Test 1',
    Category: 'ASSIST',
    Workshop: {
      Title: 'Workshop A',
      StartDate: '2024-06-01',
      EndDate: '2024-06-10',
    },
    CreatedAt: '2024-05-20',
    Description: 'Đây là mô tả chi tiết về Test 1. Bài test này giúp đánh giá ...',
    Author: 'Nguyễn Văn A',
    Cover: '/images/brand/brand-01.svg',
  },
  {
    Id: '2',
    Name: 'Test 2',
    Category: 'CRAFFT',
    Workshop: {
      Title: 'Workshop B',
      StartDate: '2024-07-01',
      EndDate: '2024-07-10',
    },
    CreatedAt: '2024-06-15',
    Description: 'Đây là mô tả chi tiết về Test 2. Bài test này dành cho ...',
    Author: 'Trần Thị B',
    Cover: '/images/brand/brand-02.svg',
  },
  // ... thêm mock data nếu cần
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN');
}

type TestQuestionOption = {
  id: string;
  content: string;
  value: number;
};

type TestQuestion = {
  id: string;
  content: string;
  order: number;
  options: TestQuestionOption[];
};

export default function TestManagementPage() {
  // State cho filter, search, sort, paging
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('CreatedAt');
  const [page, setPage] = useState(1);

  // Giả lập phân trang
  const pageSize = 6;
  let filtered = MOCK_DATA.filter(
    (item) =>
      (item.Name.toLowerCase().includes(search.toLowerCase()) ||
        item.Workshop.Title.toLowerCase().includes(search.toLowerCase())) &&
      (category === '' || item.Category === category)
  );
  filtered = filtered.sort((a, b) => {
    if (sort === 'CreatedAt') return b.CreatedAt.localeCompare(a.CreatedAt);
    if (sort === 'Workshop.StartDate') return b.Workshop.StartDate.localeCompare(a.Workshop.StartDate);
    if (sort === 'Workshop.EndDate') return b.Workshop.EndDate.localeCompare(a.Workshop.EndDate);
    return 0;
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Handlers
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 mb-8 rounded-xl shadow">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quản lý Bài Test</h1>
          <p className="text-lg text-orange-100">Danh sách các bài test và workshop liên quan</p>
        </div>
      </div>
      {/* Bộ lọc và tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tên bài test hoặc Workshop..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-400 outline-none"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loại Test</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
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
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Danh sách bài test dạng card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paged.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">Không có dữ liệu</div>
        ) : (
          paged.map((item) => (
            <Link href={`/my-tests/${item.Id}`} key={item.Id} className="block h-full group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-orange-100 group-hover:border-orange-400">
                {item.Cover && (
                  <img
                    src={item.Cover}
                    alt={item.Name}
                    className="w-full h-36 object-cover object-center"
                  />
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold uppercase tracking-wider">
                      {item.Category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-orange-700 mb-2 line-clamp-2 group-hover:underline">{item.Name}</h2>
                  <div className="text-gray-500 text-sm mb-2 flex flex-wrap gap-2">
                    <span className="font-semibold text-brand-600">Workshop:</span> {item.Workshop.Title}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-2">
                    <span>Bắt đầu: {formatDate(item.Workshop.StartDate)}</span>
                    <span>•</span>
                    <span>Kết thúc: {formatDate(item.Workshop.EndDate)}</span>
                  </div>
                  <div className="text-gray-600 text-sm mb-3 line-clamp-2">{item.Description}</div>
                  <div className="mt-auto flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-200 flex items-center justify-center font-bold text-brand-700">
                      {item.Author[0]}
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-200">{item.Author}</span>
                    <span className="ml-auto text-xs text-gray-400">{formatDate(item.CreatedAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Phân trang */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 gap-2">
        <div>
          Trang <span className="font-semibold">{page}</span> / <span className="font-semibold">{totalPages || 1}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border rounded-lg bg-gray-50 hover:bg-brand-100 text-brand-700 font-semibold disabled:opacity-50"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Trang trước
          </button>
          <button
            className="px-4 py-2 border rounded-lg bg-gray-50 hover:bg-brand-100 text-brand-700 font-semibold disabled:opacity-50"
            onClick={handleNext}
            disabled={page === totalPages || totalPages === 0}
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
}