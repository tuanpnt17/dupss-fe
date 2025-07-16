'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';
import ChatIcon from '@/icons/chat.svg';

export default function LandingPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role === 'Admin') {
      router.replace('/admin');
    }
  }, [user, router]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/AiChat/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        setError('Phản hồi máy chủ không hợp lệ.');
        setLoading(false);
        setInput('');
        return;
      }
      if (!res.ok) {
        setError(data?.message || data?.error || 'Lỗi máy chủ.');
      } else {
        setMessages((prev) => [...prev, { role: 'ai', text: data.response || data.message || '...' }]);
      }
    } catch (e: any) {
      setError(e?.message || 'Không thể kết nối đến máy chủ.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section - Enhanced with animated gradient */}
      <section className="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-300 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fadeIn">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium mb-6">
                🤝 Cộng đồng hỗ trợ 24/7
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
                Chung Tay 
                <span className="bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
                  Chống Ma Túy
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed opacity-90 max-w-3xl mx-auto">
              Xây dựng cộng đồng mạnh mẽ, không ma túy thông qua hỗ trợ chuyên nghiệp, 
              giáo dục toàn diện và hành động thiết thực.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="#get-involved"
                className="group bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <span>Tham Gia Ngay</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#stories"
                className="group bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 backdrop-blur-sm"
              >
                Câu Chuyện Thành Công
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Enhanced with modern cards */}
      <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-800 rounded-full px-6 py-2 text-sm font-semibold mb-6">
              SỨ MỆNH CỦA CHÚNG TÔI
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Xây Dựng Tương Lai 
              <span className="text-orange-600">Tốt Đẹp</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Chúng tôi cam kết tạo ra một cộng đồng hỗ trợ toàn diện, giúp mọi người 
              vượt qua nghiện ngập và xây dựng cuộc sống ý nghĩa, hạnh phúc.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Hỗ Trợ Chuyên Nghiệp</h3>
              <p className="text-gray-600 leading-relaxed">
                Cung cấp hỗ trợ tâm lý chuyên sâu và thực tế cho cá nhân và gia đình 
                bị ảnh hưởng bởi nghiện ma túy với đội ngũ chuyên gia giàu kinh nghiệm.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Giáo Dục Toàn Diện</h3>
              <p className="text-gray-600 leading-relaxed">
                Nâng cao nhận thức cộng đồng và cung cấp tài nguyên giáo dục 
                để ngăn chặn lạm dụng ma túy, thúc đẩy lối sống lành mạnh, tích cực.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Cộng Đồng Mạnh Mẽ</h3>
              <p className="text-gray-600 leading-relaxed">
                Xây dựng mạng lưới hỗ trợ bền vững thông qua các sự kiện cộng đồng, 
                hội thảo chuyên môn và chương trình tình nguyện ý nghĩa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section - Enhanced with testimonials */}
      <section id="stories" className="py-24 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-6 py-2 text-sm font-semibold mb-6">
              CÂU CHUYỆN THÀNH CÔNG
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Hành Trình 
              <span className="text-orange-600">Thay Đổi Cuộc Đời</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Những câu chuyện thực tế về hy vọng, phục hồi và chuyển đổi mạnh mẽ 
              từ các thành viên cộng đồng của chúng tôi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-l-4 border-orange-500">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl font-bold text-white">T</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Hành Trình Của Tuấn</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      2 năm cai nghiện
                    </span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                "Sự hỗ trợ tôi nhận được từ cộng đồng này đã thay đổi hoàn toàn cuộc đời tôi. 
                Ngày nay, tôi tự hào được làm người hướng dẫn cho những người khác trên 
                hành trình phục hồi của họ."
              </p>
              <Link 
                href="#blog" 
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold group-hover:gap-3 transition-all"
              >
                <span>Đọc Toàn Bộ Câu Chuyện</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-l-4 border-red-500">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center mr-6">
                  <span className="text-3xl font-bold text-white">L</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Câu Chuyện Của Linh</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      3 năm cai nghiện
                    </span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                "Thông qua các hội thảo và buổi tư vấn chuyên sâu, tôi đã tìm thấy sức mạnh 
                để xây dựng lại cuộc sống và kết nối lại với gia đình một cách ý nghĩa."
              </p>
              <Link 
                href="#blog" 
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold group-hover:gap-3 transition-all"
              >
                <span>Đọc Toàn Bộ Câu Chuyện</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section - Enhanced with modern card design */}
      <section id="blog" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-800 rounded-full px-6 py-2 text-sm font-semibold mb-6">
              TÀI NGUYÊN HỮU ÍCH
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Bài Viết 
              <span className="text-orange-600">Mới Nhất</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Thông tin chuyên sâu, kinh nghiệm thực tế và tài nguyên hữu ích 
              từ cộng đồng chuyên gia của chúng tôi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/blog-1.jpg"
                  alt="Hiểu Về Nghiện Ngập"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Giáo Dục
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">
                  Hiểu Về Nghiện Ngập
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hướng dẫn toàn diện về khoa học đằng sau nghiện ngập và 
                  con đường phục hồi hiệu quả.
                </p>
                <Link 
                  href="#blog" 
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold group-hover:gap-3 transition-all"
                >
                  <span>Đọc Thêm</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
            
            <article className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/blog-2.jpg"
                  alt="Hỗ Trợ Gia Đình"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Hỗ Trợ
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">
                  Hỗ Trợ Người Thân
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Cách gia đình có thể cung cấp hỗ trợ hiệu quả trong khi 
                  duy trì ranh giới lành mạnh.
                </p>
                <Link 
                  href="#blog" 
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold group-hover:gap-3 transition-all"
                >
                  <span>Đọc Thêm</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
            
            <article className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/blog-3.jpg"
                  alt="Tác Động Cộng Đồng"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Cộng Đồng
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">
                  Tác Động Cộng Đồng
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Những câu chuyện về cách các chương trình cộng đồng của 
                  chúng tôi tạo ra sự khác biệt tích cực.
                </p>
                <Link 
                  href="#blog" 
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold group-hover:gap-3 transition-all"
                >
                  <span>Đọc Thêm</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Get Involved Section - Enhanced with call-to-action */}
      <section id="get-involved" className="py-24 bg-gradient-to-br from-orange-100 to-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-6 py-2 text-sm font-semibold mb-6">
              CÙNG HÀNH ĐỘNG
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Tham Gia 
              <span className="text-orange-600">Cùng Chúng Tôi</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Tham gia sứ mệnh xây dựng cộng đồng không ma túy. 
              Có nhiều cách ý nghĩa để bạn có thể đóng góp và tạo ra sự khác biệt.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Tình Nguyện</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Chia sẻ thời gian và kỹ năng của bạn để hỗ trợ các chương trình 
                cộng đồng và tạo ra tác động tích cực.
              </p>
              <Link
                href="#contact"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Trở Thành Tình Nguyện Viên
              </Link>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Quyên Góp</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Sự đóng góp của bạn giúp chúng tôi cung cấp các dịch vụ 
                và hỗ trợ thiết yếu cho những người cần giúp đỡ.
              </p>
              <Link
                href="#donate"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Quyên Góp Ngay
              </Link>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Hội Thảo</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Tham gia các hội thảo giáo dục và đào tạo chuyên sâu 
                để tìm hiểu về phòng ngừa và hỗ trợ hiệu quả.
              </p>
              <Link
                href="#workshops"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Xem Lịch Trình
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Button - Enhanced */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full shadow-2xl p-4 flex items-center justify-center group hover:scale-110 transition-all duration-300"
        onClick={() => setChatOpen(true)}
        aria-label="Chat hỗ trợ"
      >
        <ChatIcon width={32} height={32} className="group-hover:scale-110 transition-transform" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-orange-800">!</span>
        </div>
      </button>

      {/* Chat Modal - Enhanced */}
      <Modal isOpen={chatOpen} onClose={() => setChatOpen(false)} className="max-w-md w-full p-0">
        <div className="flex flex-col h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-6 font-bold text-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ChatIcon width={20} height={20} />
              </div>
              <div>
                <div className="text-lg font-bold">Hỗ trợ AI Chat</div>
                <div className="text-sm opacity-90">Luôn sẵn sàng hỗ trợ bạn</div>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChatIcon width={24} height={24} className="text-orange-600" />
                </div>
                <div className="text-gray-500 text-sm">
                  Xin chào! Hãy đặt câu hỏi về ma túy, phòng chống, hỗ trợ...
                </div>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-gray-500 text-sm">Đang trả lời...</span>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-center">
                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                  {error}
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex gap-3">
              <input
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                type="text"
                placeholder="Nhập câu hỏi của bạn..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                disabled={loading}
              />
              <Button 
                onClick={handleSend} 
                disabled={loading || !input.trim()} 
                variant="primary"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}