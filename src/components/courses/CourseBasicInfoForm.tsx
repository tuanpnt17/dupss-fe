'use client'
import React, { useRef, useState } from "react";
import useCreateCourseStore from "@/stores/useCreateCourseStore";

const CATEGORY_OPTIONS = [
  { id: "12EBE97B-5E57-4B27-B874-2071DEF01E8C", name: "Giáo dục" },
  { id: "2E3AA3D0-7D86-4B58-9C64-CE44E48C5933", name: "Pháp luật" },
  { id: "A67EC79F-13E9-4C77-8E03-406144E377F7", name: "Cộng đồng" },
  { id: "AD37F6E8-F46E-4D62-A6FF-CF6EE0426205", name: "Tuyên truyền" },
  { id: "ED8883B1-0375-4362-B5CE-FC3AACC34594", name: "Hỗ trợ cai nghiện" },
];

interface Props {
  onNext: () => void;
}

const CourseBasicInfoForm: React.FC<Props> = ({ onNext }) => {
  const store = useCreateCourseStore();
  const [error, setError] = useState<string | null>(null);
  const [picturePreview, setPicturePreview] = useState<string>(store.pictureUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    store.setField(e.target.name as any, e.target.value);
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPicturePreview(url);
      store.setField("pictureUrl", url);
    }
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      store.setField("attachmentUrl", file.name);
    }
  };

  const removePicture = () => {
    setPicturePreview("");
    store.setField("pictureUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAttachment = () => {
    store.setField("attachmentUrl", "");
    if (attachmentInputRef.current) attachmentInputRef.current.value = "";
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store.courseName || !store.courseCode || !store.summary || !store.content || !store.categoryId) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-0">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
        <label className="block text-white font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">📚</span>
          Thông tin cơ bản về khóa học
        </label>
      </div>
      <div className="p-8 space-y-6">
        {error && <div className="text-red-600 font-medium mb-2">{error}</div>}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Tên khóa học <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="courseName"
            value={store.courseName}
            onChange={handleChange}
            className="w-full border-2 border-orange-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
            placeholder="Nhập tên khóa học..."
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Mã khóa học <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="courseCode"
            value={store.courseCode}
            onChange={handleChange}
            className="w-full border-2 border-orange-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
            placeholder="Nhập mã khóa học..."
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Tóm tắt (summary) <span className="text-red-500">*</span></label>
          <textarea
            name="summary"
            value={store.summary}
            onChange={handleChange}
            className="w-full border-2 border-orange-200 rounded-xl px-4 py-3 min-h-[60px] text-base focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
            placeholder="Nhập tóm tắt ngắn gọn về khóa học..."
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Nội dung chi tiết (content) <span className="text-red-500">*</span></label>
          <textarea
            name="content"
            value={store.content}
            onChange={handleChange}
            className="w-full border-2 border-orange-200 rounded-xl px-4 py-3 min-h-[100px] text-base focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
            placeholder="Nhập nội dung chi tiết cho khóa học..."
            required
          />
        </div>
        {/* Avatar Upload Area */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Ảnh đại diện (picture)</label>
          <div
            className="flex items-center gap-6"
          >
            <div
              className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-orange-300 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-200 cursor-pointer relative group"
              onClick={() => fileInputRef.current?.click()}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') fileInputRef.current?.click(); }}
              role="button"
              aria-label="Chọn ảnh đại diện"
            >
              {picturePreview ? (
                <>
                  <img
                    src={picturePreview}
                    alt="Preview"
                    className="w-36 h-36 object-cover rounded-lg shadow border border-orange-200"
                  />
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); removePicture(); }}
                    className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 text-red-500 hover:text-red-700 transition-all"
                    title="Xóa ảnh"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </>
              ) : (
                <>
                  <svg className="w-12 h-12 text-orange-300 mb-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <span className="text-orange-400 font-medium text-sm">Chọn ảnh</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePictureChange}
                className="hidden"
              />
            </div>
            <div className="text-xs text-gray-500">Nhấn để chọn hoặc thay đổi ảnh đại diện cho khóa học.<br />Ảnh nên có tỉ lệ 4:3 hoặc vuông.</div>
          </div>
        </div>
        {/* Attachment Upload Area */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Tệp đính kèm (attachment)</label>
          <div className="flex items-center gap-4">
            <div
              className="flex flex-col items-center justify-center w-40 h-20 border-2 border-dashed border-orange-300 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-200 cursor-pointer relative group"
              onClick={() => attachmentInputRef.current?.click()}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') attachmentInputRef.current?.click(); }}
              role="button"
              aria-label="Chọn tệp đính kèm"
            >
              {store.attachmentUrl ? (
                <>
                  <svg className="w-8 h-8 text-orange-300 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.656-5.656l-6.586 6.586" /></svg>
                  <span className="text-orange-500 font-medium text-xs truncate max-w-[120px]">{store.attachmentUrl}</span>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); removeAttachment(); }}
                    className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 text-red-500 hover:text-red-700 transition-all"
                    title="Xóa tệp"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 text-orange-300 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.656-5.656l-6.586 6.586" /></svg>
                  <span className="text-orange-400 font-medium text-xs">Chọn tệp</span>
                </>
              )}
              <input
                type="file"
                ref={attachmentInputRef}
                onChange={handleAttachmentChange}
                className="hidden"
              />
            </div>
            <div className="text-xs text-gray-500">Nhấn để chọn hoặc thay đổi tệp đính kèm.<br />Chỉ nhận các tệp nhỏ hơn 10MB.</div>
          </div>
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Danh mục (category) <span className="text-red-500">*</span></label>
          <select
            name="categoryId"
            value={store.categoryId}
            onChange={handleChange}
            className="w-full border-2 border-orange-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
            required
          >
            <option value="">Chọn danh mục</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="py-3 px-8 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl shadow-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourseBasicInfoForm; 