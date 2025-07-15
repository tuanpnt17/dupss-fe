import React, { useEffect, useState } from 'react';
import { testsService } from '@/services/tests.service';
import { QuestionOptionTestResult } from '@/types/tests';
import { XCircle, CheckCircle, Award, X, Eye, FileText, Clock } from 'lucide-react';

interface TestResultDetailsProps {
  resultId: string;
  testId?: string;
  onClose?: () => void;
}

const TestResultDetails: React.FC<TestResultDetailsProps> = ({ resultId, onClose }) => {
  const [optionResults, setOptionResults] = useState<QuestionOptionTestResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resultId) return;
    setLoading(true);
    setError(null);
    testsService.getOptionResults(resultId)
      .then((res) => {
        setOptionResults(res);
      })
      .catch(() => setError('Lỗi khi lấy kết quả.'))
      .finally(() => setLoading(false));
  }, [resultId]);

  return (
    <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl border border-orange-200 overflow-hidden">
      {/* Header với gradient */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 px-8 py-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Chi tiết kết quả</h2>
              <p className="text-orange-100">Xem lại đáp án bạn đã chọn</p>
            </div>
          </div>
          {onClose && (
            <button
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
              onClick={onClose}
              aria-label="Đóng"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <span className="mt-4 text-gray-600 font-medium">Đang tải kết quả...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-600 font-medium text-center">{error}</p>
          </div>
        )}

        {optionResults && Array.isArray(optionResults) && optionResults.length > 0 && (
          <div className="space-y-6">
            {/* Stats header */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Tổng quan</h3>
                    <p className="text-gray-600">Bạn đã trả lời {optionResults.length} câu hỏi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-orange-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Hoàn thành</span>
                </div>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-100">
              {optionResults.map((result, idx) => (
                <div key={result.questionId} className="group">
                  <div className="bg-white rounded-xl border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-md">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Question number */}
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {idx + 1}
                        </div>
                        
                        {/* Question content */}
                        <div className="flex-1">
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 text-lg leading-relaxed mb-2">
                              {result.questionContent}
                            </h4>
                          </div>
                          
                          {/* Answer */}
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <span className="text-green-700 font-semibold text-sm uppercase tracking-wide">
                                  Đáp án đã chọn
                                </span>
                                <p className="text-gray-800 mt-1 font-medium">
                                  {result.selectedOptionContent}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {optionResults && Array.isArray(optionResults) && optionResults.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Không có dữ liệu</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Không có đáp án nào được ghi nhận cho lần làm bài này. Có thể do lỗi kỹ thuật hoặc bài test chưa được hoàn thành.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultDetails;