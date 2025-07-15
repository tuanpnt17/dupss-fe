"use client";
import React, { useEffect, useState } from "react";
import { workshopsService } from "@/services/workshops.service";
import { WorkshopData } from "@/types/workshops";
import WorkshopForm, { WorkshopFormValues } from './WorkshopForm';
import { 
  Plus, 
  Edit3, 
  Calendar, 
  User, 
  Eye, 
  EyeOff, 
  Search, 
  Filter,
  BookOpen,
  Clock,
  Settings,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

const defaultForm = { title: "", description: "", host: "", startDate: "", endDate: "", status: true };

const ManageWorkshops: React.FC = () => {
  const [workshops, setWorkshops] = useState<WorkshopData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formDefault, setFormDefault] = useState<Partial<WorkshopFormValues> | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  const fetchWorkshops = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await workshopsService.getWorkshops();
      setWorkshops(res?.items || []);
    } catch (err: any) {
      setError("Không thể tải danh sách workshop.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWorkshops(); }, []);

  const handleEdit = (w: WorkshopData) => {
    setFormDefault({
      title: w.title,
      host: w.host,
      startDate: w.startDate ? new Date(w.startDate).toISOString().slice(0, 10) : "",
      endDate: w.endDate ? new Date(w.endDate).toISOString().slice(0, 10) : "",
      status: w.status,
      imageUrl: w.imageUrl,
      ...splitDescriptionToForm(w.description)
    });
    setEditingId(w.id);
    setShowForm(true);
  };

  const handleCreate = () => {
    setFormDefault(undefined);
    setEditingId(null);
    setShowForm(true);
  };

  function splitDescriptionToForm(description?: string) {
    if (!description) return {};
    const intro = description.split('Nội dung')[0]?.trim() || '';
    const content = description.includes('Nội dung') ? description.split('Nội dung')[1].split('Mục đích')[0]?.trim() : '';
    const purpose = description.includes('Mục đích') ? description.split('Mục đích')[1].split('Các hoạt động')[0]?.trim() : '';
    const activities = description.includes('Các hoạt động') ? description.split('Các hoạt động')[1]?.trim() : '';
    return { intro, content, purpose, activities };
  }

  function joinFormToDescription(form: WorkshopFormValues) {
    let desc = '';
    if (form.intro) desc += form.intro + '\n';
    if (form.content) desc += '\nNội dung\n' + form.content;
    if (form.purpose) desc += '\nMục đích\n' + form.purpose;
    if (form.activities) desc += '\nCác hoạt động\n' + form.activities;
    return desc.trim();
  }

  const handleFormSubmit = async (values: WorkshopFormValues) => {
    setSaving(true);
    try {
      const data = {
        ...values,
        description: joinFormToDescription(values),
        startDate: values.startDate ? new Date(values.startDate) : new Date(),
        endDate: values.endDate ? new Date(values.endDate) : new Date(),
      };
      if (editingId) {
        await workshopsService.updateWorkshop(editingId, data);
      } else {
        await workshopsService.createWorkshop(data);
      }
      setShowForm(false);
      fetchWorkshops();
    } catch {
      alert("Có lỗi khi lưu workshop!");
    } finally {
      setSaving(false);
    }
  };

  // Filter workshops based on search term and status
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.host.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && workshop.status) ||
                         (filterStatus === "inactive" && !workshop.status);
    return matchesSearch && matchesStatus;
  });

  const formatDate = (date: string | Date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isUpcoming = (startDate: string | Date) => {
    if (!startDate) return false;
    return new Date(startDate) > new Date();
  };

  const isPast = (endDate: string | Date) => {
    if (!endDate) return false;
    return new Date(endDate) < new Date();
  };

  const getStatusBadge = (workshop: WorkshopData) => {
    if (!workshop.status) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          <EyeOff className="w-3 h-3" />
          Ẩn
        </span>
      );
    }
    
    if (isPast(workshop.endDate)) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          <Clock className="w-3 h-3" />
          Đã kết thúc
        </span>
      );
    }
    
    if (isUpcoming(workshop.startDate)) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          <Calendar className="w-3 h-3" />
          Sắp diễn ra
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        <Eye className="w-3 h-3" />
        Đang diễn ra
      </span>
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <span className="ml-4 text-gray-600 text-lg">Đang tải danh sách workshop...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
          <div className="flex items-center justify-center text-red-600">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <Settings className="w-6 h-6" />
            </div>
            <span className="text-lg font-medium">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Quản lý Workshop</h1>
              <p className="text-orange-100">Tạo và quản lý các workshop giáo dục</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-orange-100">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">{workshops.length} workshop</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm workshop..."
                className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Đã ẩn</option>
              </select>
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Tạo workshop mới
          </button>
        </div>
      </div>

      {/* Workshops Table/Cards */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
        {filteredWorkshops.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Không có workshop nào</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== "all" 
                ? "Không tìm thấy workshop phù hợp với bộ lọc" 
                : "Hãy tạo workshop đầu tiên của bạn"}
            </p>
            {(!searchTerm && filterStatus === "all") && (
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Tạo workshop mới
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-200">
                    <th className="text-left p-6 font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Tên workshop
                      </div>
                    </th>
                    <th className="text-left p-6 font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Host
                      </div>
                    </th>
                    <th className="text-left p-6 font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Thời gian
                      </div>
                    </th>
                    <th className="text-left p-6 font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Trạng thái
                      </div>
                    </th>
                    <th className="text-left p-6 font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Thao tác
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkshops.map((workshop, index) => (
                    <tr 
                      key={workshop.id} 
                      className={`border-b border-orange-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-orange-25'
                      }`}
                    >
                      <td className="p-6">
                        <div className="font-semibold text-gray-800 mb-1">{workshop.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {workshop.description?.substring(0, 80)}...
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {workshop.host.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-700">{workshop.host}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-700">
                            {formatDate(workshop.startDate)}
                          </div>
                          <div className="text-sm text-gray-500">
                            đến {formatDate(workshop.endDate)}
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        {getStatusBadge(workshop)}
                      </td>
                      <td className="p-6">
                        <button
                          onClick={() => handleEdit(workshop)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                        >
                          <Edit3 className="w-4 h-4" />
                          Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4 space-y-4">
              {filteredWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{workshop.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <User className="w-4 h-4" />
                        <span>{workshop.host}</span>
                      </div>
                    </div>
                    {getStatusBadge(workshop)}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(workshop.startDate)}</span>
                    </div>
                    <span>-</span>
                    <span>{formatDate(workshop.endDate)}</span>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleEdit(workshop)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                    >
                      <Edit3 className="w-4 h-4" />
                      Sửa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Workshop Form Modal */}
      <WorkshopForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        defaultValues={formDefault}
        loading={saving}
        editing={!!editingId}
      />
    </div>
  );
};

export default ManageWorkshops;