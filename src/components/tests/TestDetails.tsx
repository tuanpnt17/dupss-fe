import React, { useState, useEffect } from "react";
import { testsService } from "@/services/tests.service";
import { TestQuestionWithOptions, QuestionOptionTestResult } from "@/types/tests";
import useAuthStore from "@/stores/useAuthStore";

interface TestDetailsProps {
  testId: string;
  onSubmitSuccess?: () => void;
}

export default function TestDetails({ testId, onSubmitSuccess }: TestDetailsProps) {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const [questions, setQuestions] = useState<TestQuestionWithOptions[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [optionResults, setOptionResults] = useState<QuestionOptionTestResult[] | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastTestResultsId, setLastTestResultsId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await testsService.getTestQuestionsByTestId(testId);
        if (!data || data.length === 0) {
          throw new Error('Không tìm thấy câu hỏi cho bài test này');
        }
        setQuestions(data);
      } catch (err: any) {
        setError(err.message || 'Không thể tải câu hỏi. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };
    if (testId) fetchQuestions();
  }, [testId]);

  const handleChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert('Vui lòng trả lời tất cả các câu hỏi!');
      return;
    }
    if (!user || !accessToken) {
      alert('Bạn cần đăng nhập để nộp bài!');
      return;
    }
    setSubmitting(true);
    try {
      const userId = user.userId;
      const selectedOptionIds = Object.values(answers);
      console.log('selectedOptionIds:', selectedOptionIds);
      const res = await testsService.createOptionResults({ testId, userId, selectedOptionIds });
      // Lấy testResultsId từ response (giả sử res.value.id)
      const testResultsId = res?.value?.id;
      setLastTestResultsId(testResultsId || null);
      alert('Đã nộp bài thành công!');
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err: any) {
      alert(`Lỗi khi nộp bài: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShowResult = async () => {
    if (!lastTestResultsId) {
      alert('Không tìm thấy mã kết quả để xem đáp án!');
      return;
    }
    try {
      const optionResultsData = await testsService.getOptionResults(lastTestResultsId);
      setOptionResults(optionResultsData);
      setShowResult(true);
    } catch (err: any) {
      alert('Không thể lấy kết quả: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-red-500 rounded-full animate-spin animate-reverse mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-2">Đang tải câu hỏi...</div>
          <div className="text-sm text-gray-500">Vui lòng chờ trong giây lát</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-red-800 font-bold text-lg mb-2">Có lỗi xảy ra</div>
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-red-400 to-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-orange-500 to-red-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Bài kiểm tra
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Làm bài test
            </h1>
            <p className="text-gray-600 text-lg">
              Vui lòng trả lời tất cả các câu hỏi để hoàn thành bài test
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Tiến độ làm bài</div>
                  <div className="text-sm text-gray-600">
                    {Object.keys(answers).length} / {questions.length} câu hỏi
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {Math.round(progressPercentage)}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mx-auto flex items-center justify-center mb-8">
                  <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-gray-600 text-xl font-medium">Không có câu hỏi nào</div>
              </div>
            ) : (
              questions
                .sort((a, b) => a.order - b.order)
                .map((q, idx) => (
                  <div 
                    key={q.id} 
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Question Background Effects */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-2xl opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-red-200 to-pink-200 rounded-full blur-xl opacity-30"></div>
                    
                    {/* Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                    
                    <div className="relative z-10">
                      {/* Question Header */}
                      <div className="flex items-start gap-4 mb-8">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-semibold text-gray-800 leading-relaxed">
                            {q.content}
                          </div>
                        </div>
                        {answers[q.id] && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Options */}
                      <div className="space-y-3">
                        {q.options.map((opt, optIdx) => (
                          <label
                            key={opt.id}
                            className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                              answers[q.id] === opt.id
                                ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg transform scale-105'
                                : 'border-gray-200 hover:border-orange-300 hover:bg-gradient-to-r hover:from-orange-25 hover:to-red-25 hover:shadow-md'
                            }`}
                          >
                            <div className="flex-shrink-0 relative">
                              <input
                                type="radio"
                                name={q.id}
                                value={opt.id}
                                checked={answers[q.id] === opt.id}
                                onChange={() => handleChange(q.id, opt.id)}
                                className="sr-only"
                                disabled={submitting}
                              />
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                answers[q.id] === opt.id
                                  ? 'border-orange-500 bg-gradient-to-r from-orange-500 to-red-500'
                                  : 'border-gray-300 bg-white group-hover:border-orange-400'
                              }`}>
                                {answers[q.id] === opt.id && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                                  answers[q.id] === opt.id
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                                    : 'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className={`text-gray-800 font-medium transition-colors duration-300 ${
                                  answers[q.id] === opt.id ? 'text-orange-800' : 'group-hover:text-orange-700'
                                }`}>
                                  {opt.content}
                                </span>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
            )}

            {/* Submit Button */}
            {questions.length > 0 && (
              <div className="text-center pt-8">
                <button
                  type="submit"
                  className={`group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 ${
                    submitting 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:shadow-2xl hover:scale-105 hover:from-orange-600 hover:to-red-600'
                  }`}
                  disabled={submitting}
                >
                  {submitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <span className={submitting ? 'invisible' : 'visible'}>
                    {submitting ? 'Đang nộp bài...' : 'Nộp bài'}
                  </span>
                  {!submitting && (
                    <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
                
                <div className="mt-4 text-sm text-gray-500">
                  {Object.keys(answers).length === questions.length ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Tất cả câu hỏi đã được trả lời
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-orange-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Còn {questions.length - Object.keys(answers).length} câu hỏi chưa trả lời
                    </div>
                  )}
                </div>
              </div>
            )}
            {lastTestResultsId && !showResult && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                  onClick={handleShowResult}
                >
                  Xem kết quả Test
                </button>
              </div>
            )}
            {showResult && optionResults && (
              <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                <h2 className="text-lg font-bold mb-4 text-green-700">Đáp án bạn đã chọn:</h2>
                <ul className="space-y-2">
                  {optionResults.map((result: QuestionOptionTestResult, idx: number) => (
                    <li key={result.questionId} className="flex gap-2 items-center">
                      <span className="font-semibold">{idx + 1}.</span>
                      <span>{result.questionContent}</span>
                      <span className="ml-4 text-green-700 font-bold">
                        {result.selectedOptionContent}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}