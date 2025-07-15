"use client";
import React, { useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { blogsService } from "@/services/blogs.service";

interface ContentBlock {
  type: "heading" | "paragraph" | "list" | "quote" | "bold" | "italic";
  value: string;
}

interface CreateBlogProps {
  onCreated?: () => void;
}

export default function CreateBlog({ onCreated }: CreateBlogProps) {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const [form, setForm] = useState({
    title: "",
  });
  const [descriptionList, setDescriptionList] = useState<string[]>([""]);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    { type: "heading", value: "" },
    { type: "paragraph", value: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Description logic giữ nguyên
  const handleDescriptionChange = (idx: number, value: string) => {
    setDescriptionList((prev) => prev.map((desc, i) => (i === idx ? value : desc)));
  };
  const addDescriptionField = () => {
    setDescriptionList((prev) => [...prev, ""]);
  };
  const removeDescriptionField = (idx: number) => {
    setDescriptionList((prev) => prev.filter((_, i) => i !== idx));
  };

  // Content block logic
  const handleContentBlockChange = (idx: number, value: string) => {
    setContentBlocks((prev) => prev.map((block, i) => (i === idx ? { ...block, value } : block)));
  };
  const handleContentBlockTypeChange = (idx: number, type: ContentBlock["type"]) => {
    setContentBlocks((prev) => prev.map((block, i) => (i === idx ? { ...block, type } : block)));
  };
  const addContentBlock = () => {
    setContentBlocks((prev) => [...prev, { type: "paragraph", value: "" }]);
  };
  const removeContentBlock = (idx: number) => {
    setContentBlocks((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!user || !accessToken) {
      setError("Bạn cần đăng nhập để tạo blog.");
      return;
    }
    setLoading(true);
    try {
      // Ghép description
      const description = descriptionList
        .filter((desc) => desc.trim() !== "")
        .map((desc) => desc.trim().startsWith("⭐") ? desc.trim() : `⭐ ${desc.trim()}`)
        .join("\n");
      // Ghép content thành markdown
      const content = contentBlocks
        .filter((block) => block.value.trim() !== "")
        .map((block, idx) => {
          switch (block.type) {
            case "heading":
              return `# ${block.value.trim()}`;
            case "list":
              return `- ${block.value.trim()}`;
            case "quote":
              return `> ${block.value.trim()}`;
            case "bold":
              return `**${block.value.trim()}**`;
            case "italic":
              return `*${block.value.trim()}*`;
            default:
              return block.value.trim();
          }
        })
        .join("\n\n");
      const res = await blogsService.createBlog({
        ...form,
        description,
        content,
        authorId: user.userId,
      }, accessToken);
      if (res.isSuccess) {
        setSuccess(true);
        setForm({ title: "" });
        setDescriptionList([""]);
        setContentBlocks([{ type: "heading", value: "" }, { type: "paragraph", value: "" }]);
        if (onCreated) onCreated();
      } else {
        setError(res.error?.message || "Tạo blog thất bại");
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi tạo blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            Tạo Blog Mới
          </h1>
          <p className="text-gray-600 text-lg">Chia sẻ câu chuyện của bạn với thế giới</p>
        </div>

        {/* Notification Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg flex items-center gap-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">!</span>
            </div>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-green-700 font-medium">Tạo blog thành công! 🎉</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
            <label className="block text-white font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">📝</span>
              Tiêu đề Blog
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border-0 rounded-xl px-4 py-3 text-lg font-medium bg-white bg-opacity-95 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
              placeholder="Nhập tiêu đề hấp dẫn cho blog của bạn..."
              required
            />
          </div>

          {/* Description Section */}
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-100">
            <label className="block text-gray-800 font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white text-sm">💫</span>
              Mô tả ngắn gọn
            </label>
            <div className="space-y-3">
              {descriptionList.map((desc, idx) => (
                <div key={idx} className="group">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      {idx + 1}
                    </div>
                    <textarea
                      className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 min-h-[50px] resize-none focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 placeholder-gray-400"
                      value={desc}
                      onChange={e => handleDescriptionChange(idx, e.target.value)}
                      placeholder={`Ý chính thứ ${idx + 1}...`}
                      required
                    />
                    {descriptionList.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeDescriptionField(idx)} 
                        className="flex-shrink-0 w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600 font-bold transition-all duration-200 hover:scale-110"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addDescriptionField} 
                className="w-full py-3 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 font-semibold hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="text-xl">+</span>
                Thêm ý mới
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <label className="block text-gray-800 font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white text-sm">📚</span>
              Nội dung chi tiết
            </label>
            
            <div className="space-y-4">
              {contentBlocks.map((block, idx) => (
                <div key={idx} className="group bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-orange-200 transition-all duration-200">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0">
                      <select
                        value={block.type}
                        onChange={e => handleContentBlockTypeChange(idx, e.target.value as ContentBlock["type"])}
                        className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 min-w-[120px]"
                      >
                        <option value="heading">📝 Tiêu đề</option>
                        <option value="paragraph">📄 Đoạn văn</option>
                        <option value="list">📋 Danh sách</option>
                        <option value="quote">💬 Trích dẫn</option>
                        <option value="bold">🔥 In đậm</option>
                        <option value="italic">✨ In nghiêng</option>
                      </select>
                    </div>
                    <textarea
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 min-h-[80px] resize-none font-mono text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-white"
                      value={block.value}
                      onChange={e => handleContentBlockChange(idx, e.target.value)}
                      placeholder={
                        block.type === "heading"
                          ? "Nhập tiêu đề phần..."
                          : block.type === "list"
                          ? "Nhập điểm danh sách..."
                          : block.type === "quote"
                          ? "Nhập trích dẫn..."
                          : block.type === "bold"
                          ? "Nhập text in đậm..."
                          : block.type === "italic"
                          ? "Nhập text in nghiêng..."
                          : "Nhập nội dung đoạn văn..."
                      }
                      required
                    />
                    {contentBlocks.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeContentBlock(idx)} 
                        className="flex-shrink-0 w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600 font-bold transition-all duration-200 hover:scale-110"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={addContentBlock} 
                className="w-full py-4 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 font-semibold hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="text-xl">+</span>
                Thêm đoạn nội dung
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">💡 Gợi ý định dạng Markdown:</p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="px-2 py-1 bg-blue-100 rounded font-mono"># Tiêu đề</span>
                <span className="px-2 py-1 bg-blue-100 rounded font-mono">- Danh sách</span>
                <span className="px-2 py-1 bg-blue-100 rounded font-mono">&gt; Trích dẫn</span>
                <span className="px-2 py-1 bg-blue-100 rounded font-mono">**In đậm**</span>
                <span className="px-2 py-1 bg-blue-100 rounded font-mono">*In nghiêng*</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-t border-gray-100">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl shadow-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang tạo blog...
                </>
              ) : (
                <>
                  <span className="text-xl">🚀</span>
                  Xuất bản blog
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}