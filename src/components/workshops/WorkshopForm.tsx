import React, { useState, useEffect } from "react";

export interface WorkshopFormValues {
  title: string;
  host: string;
  startDate: string;
  endDate: string;
  status: boolean;
  intro: string;
  content: string;
  purpose: string;
  activities: string;
  imageUrl?: string;
}

interface WorkshopFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: WorkshopFormValues) => void;
  defaultValues?: Partial<WorkshopFormValues>;
  loading?: boolean;
  editing?: boolean;
}

const WorkshopForm: React.FC<WorkshopFormProps> = ({ open, onClose, onSubmit, defaultValues, loading, editing }) => {
  const [form, setForm] = useState<WorkshopFormValues>({
    title: "",
    host: "",
    startDate: "",
    endDate: "",
    status: true,
    intro: "",
    content: "",
    purpose: "",
    activities: "",
    imageUrl: "",
    ...defaultValues,
  });

  useEffect(() => {
    if (defaultValues) setForm(f => ({ ...f, ...defaultValues }));
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative border-2 border-orange-200 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-orange-600 text-2xl font-bold p-2 rounded-full hover:bg-orange-50 transition"
          onClick={onClose}
          aria-label="Đóng"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-8 text-orange-700 flex items-center gap-3">
          {editing ? "Cập nhật" : "Tạo mới"} Workshop
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Ảnh preview */}
          <div className="flex flex-col md:flex-row gap-6 items-center mb-2">
            <div className="flex-shrink-0 w-40 h-40 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center border-2 border-orange-200 overflow-hidden shadow">
              {form.imageUrl ? (
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-orange-400 text-5xl font-bold">?</span>
              )}
            </div>
            <div className="flex-1 w-full">
              <label className="block font-semibold mb-1 text-orange-700">Link ảnh (imageUrl)</label>
              <input name="imageUrl" className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400" value={form.imageUrl || ""} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1 text-orange-700">Tên workshop</label>
              <input name="title" className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-orange-700">Host</label>
              <input name="host" className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400" value={form.host} onChange={handleChange} required />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-orange-700">Ngày bắt đầu</label>
              <input name="startDate" type="date" className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400" value={form.startDate} onChange={handleChange} required />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-orange-700">Ngày kết thúc</label>
              <input name="endDate" type="date" className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400" value={form.endDate} onChange={handleChange} required />
            </div>
            <div className="col-span-2 flex items-center gap-4 mt-2">
              <label className="font-semibold text-orange-700">Trạng thái:</label>
              <select name="status" value={form.status ? "1" : "0"} onChange={e => setForm(f => ({ ...f, status: e.target.value === "1" }))} className="border-2 border-orange-200 rounded-xl px-4 py-2">
                <option value="1">Hoạt động</option>
                <option value="0">Ẩn</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1 text-orange-700">Giới thiệu</label>
              <textarea name="intro" className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400" value={form.intro} onChange={handleChange} rows={2} />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-orange-700">Nội dung</label>
              <textarea name="content" className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400" value={form.content} onChange={handleChange} rows={3} />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-orange-700">Mục đích</label>
              <textarea name="purpose" className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400" value={form.purpose} onChange={handleChange} rows={2} />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-orange-700">Các hoạt động</label>
              <textarea name="activities" className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400" value={form.activities} onChange={handleChange} rows={2} />
            </div>
          </div>
          <div className="mt-8 flex gap-4 justify-end">
            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105" disabled={loading}>{loading ? "Đang lưu..." : "Lưu"}</button>
            <button type="button" className="px-8 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition" onClick={onClose} disabled={loading}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkshopForm; 