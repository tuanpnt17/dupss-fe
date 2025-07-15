import React, { useEffect, useState } from "react";
import { Calendar, Award, Eye, Trophy, CheckCircle, XCircle, Clock, Star, X, BookOpen } from 'lucide-react';
import { testsService } from "@/services/tests.service";
import useAuthStore from "@/stores/useAuthStore";
import { TestQuestionData, QuestionOptionTestResult } from "@/types/tests";
import { useRef } from 'react';

interface TestResultListProps {
  active: boolean;
}

const TestResultList: React.FC<TestResultListProps> = ({ active }) => {
  const user = useAuthStore((s) => s.user);
  const [results, setResults] = useState<TestQuestionData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [optionResults, setOptionResults] = useState<QuestionOptionTestResult[] | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [errorOptions, setErrorOptions] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestQuestionData | null>(null);

  useEffect(() => {
    if (!active) return;
    if (!user) return;
    setLoading(true);
    setError(null);
    testsService.getTestResults({ UserId: user.userId })
      .then((res) => setResults(res?.items || []))
      .catch((err: any) => setError(err.message || "Không thể tải kết quả test."))
      .finally(() => setLoading(false));
  }, [active, user]);

  const handleShowOptions = async (resultId: string) => {
    const currentTest = results.find(r => r.id === resultId);
    setSelectedTest(currentTest || null);
    setSelectedResultId(resultId);
    setOptionResults(null);
    setLoadingOptions(true);
    setErrorOptions(null);
    setShowModal(true);
    
    try {
      const data = await testsService.getOptionResults(resultId);
      const options = Array.isArray(data) ? data : (Array.isArray((data as any)?.value) ? (data as any).value : []);
      setOptionResults(options);
    } catch (err: any) {
      setErrorOptions(err.message || 'Không thể tải đáp án.');
    } finally {
      setLoadingOptions(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedResultId(null);
    setSelectedTest(null);
    setOptionResults(null);
    setErrorOptions(null);
  };

  if (!user) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-600">Bạn cần đăng nhập để xem kết quả test.</p>
      </div>
    );
  }

  if (!active) return null;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Đang tải kết quả...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
        <div className="flex items-center justify-center text-red-600">
          <XCircle className="w-6 h-6 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Kết quả các bài test</h2>
      </div>
      
      {results.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-gray-600">Chưa có kết quả test nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className={`bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200 hover:shadow-md transition-all duration-300 ${
                selectedResultId === result.id ? 'ring-2 ring-orange-300' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{result.testName}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{result.takenAt ? new Date(result.takenAt).toLocaleString('vi-VN') : "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Hoàn thành</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {result.totalPoint !== null && result.totalPoint !== undefined && (
                    <div className={`px-4 py-2 rounded-lg ${getScoreBgColor(result.totalPoint)}`}>
                      <div className="flex items-center gap-1">
                        <Star className={`w-4 h-4 ${getScoreColor(result.totalPoint)}`} />
                        <span className={`font-bold ${getScoreColor(result.totalPoint)}`}>{result.totalPoint}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {result.recommendation && (
                <div className="bg-white rounded-lg p-4 mb-4 border border-orange-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Khuyến nghị:</h4>
                      <p className="text-gray-600">{result.recommendation}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleShowOptions(result.id)}
                >
                  <Eye className="w-4 h-4" />
                  Xem đáp án
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 relative border-2 border-orange-200 max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6 text-white">
              <button
                className="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors duration-300 p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                onClick={closeModal}
                aria-label="Đóng"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Đáp án đã chọn</h3>
              </div>
              
              {selectedTest && (
                <div className="flex items-center gap-4 text-orange-100">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">{selectedTest.testName}</span>
                  </div>
                  {selectedTest.totalPoint !== null && selectedTest.totalPoint !== undefined && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span className="font-bold">{selectedTest.totalPoint} điểm</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[calc(90vh-140px)] overflow-y-auto">
              {loadingOptions && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <span className="text-gray-600 text-lg">Đang tải đáp án...</span>
                </div>
              )}

              {errorOptions && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-red-600 text-lg font-medium">{errorOptions}</p>
                </div>
              )}

              {optionResults && Array.isArray(optionResults) && optionResults.length > 0 && (
                <div className="space-y-6">
                  {optionResults.map((opt, idx) => (
                    <div key={opt.questionId} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="bg-white rounded-xl p-4 mb-4 border border-orange-100 shadow-sm">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                              Câu hỏi:
                            </h4>
                            <p className="text-gray-700 leading-relaxed">{opt.questionContent}</p>
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <span className="text-green-700 font-semibold block mb-1">Đáp án đã chọn:</span>
                                <p className="text-gray-800 font-medium">{opt.selectedOptionContent}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {optionResults && Array.isArray(optionResults) && optionResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-orange-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Không có đáp án</h4>
                  <p className="text-gray-500 italic">Không có đáp án nào được ghi nhận cho lần làm bài này.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 px-8 py-4 border-t border-orange-200">
              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={closeModal}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResultList;