'use client';
import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Trophy } from 'lucide-react';
import TestResultList from '@/components/tests/TestResultList';
import useAuthStore from '@/stores/useAuthStore';
import { useSearchParams } from 'next/navigation';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('info');
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const urlTab = searchParams.get('tab');
    if (urlTab === 'test' || urlTab === 'info') {
      setTab(urlTab);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      {/* Header với gradient đẹp */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Trang cá nhân</h1>
              <p className="text-orange-100">Quản lý thông tin và theo dõi kết quả học tập</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              tab === 'info' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                : 'bg-white text-orange-600 border border-orange-200 hover:bg-orange-50 shadow-md'
            }`}
            onClick={() => setTab('info')}
          >
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Thông tin cá nhân
            </div>
          </button>
          <button
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              tab === 'test' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                : 'bg-white text-orange-600 border border-orange-200 hover:bg-orange-50 shadow-md'
            }`}
            onClick={() => setTab('test')}
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Kết quả bài test
            </div>
          </button>
        </div>

        {/* Personal Info Tab */}
        {tab === 'info' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Thông tin cá nhân</h2>
            </div>
            
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Tên đầy đủ</span>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Username</span>
                    <p className="font-semibold text-gray-800">{user.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email</span>
                    <p className="font-semibold text-gray-800">{user.email || '-'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Shield className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Vai trò</span>
                    <p className="font-semibold text-gray-800">{user.role}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600">Bạn cần đăng nhập để xem thông tin cá nhân.</p>
              </div>
            )}
          </div>
        )}

        {/* Test Results Tab - sử dụng component gốc */}
        <TestResultList active={tab === 'test'} />
      </div>
    </div>
  );
}