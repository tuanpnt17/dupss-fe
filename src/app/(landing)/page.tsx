'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';

export default function LandingPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user?.role === 'Admin') {
      router.replace('/admin');
    }
  }, [user, router]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Chung Tay Chống Ma Túy
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Xây dựng cộng đồng mạnh mẽ, không ma túy thông qua hỗ trợ, giáo dục và hành động.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#get-involved"
                className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
              >
                Tham Gia Ngay
              </Link>
              <Link
                href="#stories"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Đọc Câu Chuyện Thành Công
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-xl text-gray-600">
              Chúng tôi cam kết xây dựng một cộng đồng hỗ trợ giúp mọi người vượt qua nghiện ngập và xây dựng cuộc sống tốt đẹp hơn.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Hỗ Trợ</h3>
              <p className="text-gray-600">
                Cung cấp hỗ trợ tinh thần và thực tế cho cá nhân và gia đình bị ảnh hưởng bởi nghiện ma túy.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Giáo Dục</h3>
              <p className="text-gray-600">
                Nâng cao nhận thức và cung cấp tài nguyên để ngăn chặn lạm dụng ma túy và thúc đẩy lối sống lành mạnh.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Cộng Đồng</h3>
              <p className="text-gray-600">
                Xây dựng mạng lưới hỗ trợ mạnh mẽ thông qua các sự kiện cộng đồng, hội thảo và chương trình tình nguyện.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Câu Chuyện Thành Công</h2>
            <p className="text-xl text-gray-600">
              Những câu chuyện thực tế về hy vọng, phục hồi và chuyển đổi từ các thành viên cộng đồng của chúng tôi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-orange-500">T</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Hành Trình Của Tuấn</h3>
                  <p className="text-gray-600">2 năm cai nghiện</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Sự hỗ trợ tôi nhận được từ cộng đồng này đã thay đổi cuộc đời tôi. Ngày nay, tôi tự hào được làm người hướng dẫn cho những người khác trên hành trình phục hồi của họ."
              </p>
              <Link href="#blog" className="text-orange-500 hover:text-orange-600 font-semibold">
                Đọc Toàn Bộ Câu Chuyện →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-orange-500">L</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Câu Chuyện Của Linh</h3>
                  <p className="text-gray-600">3 năm cai nghiện</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Thông qua các hội thảo và buổi tư vấn, tôi đã tìm thấy sức mạnh để xây dựng lại cuộc sống và kết nối lại với gia đình."
              </p>
              <Link href="#blog" className="text-orange-500 hover:text-orange-600 font-semibold">
                Đọc Toàn Bộ Câu Chuyện →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Bài Viết Mới Nhất</h2>
            <p className="text-xl text-gray-600">
              Thông tin, kinh nghiệm và tài nguyên từ cộng đồng của chúng tôi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/blog-1.jpg"
                  alt="Hiểu Về Nghiện Ngập"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Hiểu Về Nghiện Ngập</h3>
                <p className="text-gray-600 mb-4">
                  Hướng dẫn toàn diện về khoa học đằng sau nghiện ngập và phục hồi.
                </p>
                <Link href="#blog" className="text-orange-500 hover:text-orange-600 font-semibold">
                  Đọc Thêm →
                </Link>
              </div>
            </article>
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/blog-2.jpg"
                  alt="Hỗ Trợ Gia Đình"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Hỗ Trợ Người Thân</h3>
                <p className="text-gray-600 mb-4">
                  Cách gia đình có thể cung cấp hỗ trợ hiệu quả trong khi duy trì ranh giới lành mạnh.
                </p>
                <Link href="#blog" className="text-orange-500 hover:text-orange-600 font-semibold">
                  Đọc Thêm →
                </Link>
              </div>
            </article>
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/blog-3.jpg"
                  alt="Tác Động Cộng Đồng"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tác Động Cộng Đồng</h3>
                <p className="text-gray-600 mb-4">
                  Những câu chuyện về cách các chương trình cộng đồng của chúng tôi tạo ra sự khác biệt.
                </p>
                <Link href="#blog" className="text-orange-500 hover:text-orange-600 font-semibold">
                  Đọc Thêm →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tham Gia</h2>
            <p className="text-xl text-gray-600">
              Tham gia sứ mệnh của chúng tôi để xây dựng cộng đồng không ma túy. Có nhiều cách để đóng góp.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Tình Nguyện</h3>
              <p className="text-gray-600 mb-6">
                Chia sẻ thời gian và kỹ năng của bạn để hỗ trợ các chương trình và sự kiện cộng đồng của chúng tôi.
              </p>
              <Link
                href="#contact"
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Trở Thành Tình Nguyện Viên
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quyên Góp</h3>
              <p className="text-gray-600 mb-6">
                Sự đóng góp của bạn giúp chúng tôi cung cấp các dịch vụ và hỗ trợ thiết yếu cho những người cần giúp đỡ.
              </p>
              <Link
                href="#donate"
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Quyên Góp Ngay
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Hội Thảo</h3>
              <p className="text-gray-600 mb-6">
                Tham gia các hội thảo giáo dục và đào tạo của chúng tôi để tìm hiểu thêm về phòng ngừa và hỗ trợ.
              </p>
              <Link
                href="#workshops"
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Xem Lịch Trình
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}