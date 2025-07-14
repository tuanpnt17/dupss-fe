'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface TestQuestion {
  id: string;
  content: string;
  order: number;
  options: {
    id: string;
    content: string;
    value: number;
  }[];
}

export default function TestDetailPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!id) {
        setError('Không tìm thấy ID bài test');
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
        const res = await fetch(`https://localhost:7081/api/TestQuestions/${id}`);
  
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const data = await res.json();
        console.log('API Response (TestDetailPage):', data);
  
        if (!data || data.length === 0) {
          throw new Error('Không tìm thấy câu hỏi cho bài test này');
        }
  
        setQuestions(data);
      } catch (err: any) {
        setError(err.message || 'Không thể tải câu hỏi. Vui lòng thử lại.');
        console.error('Fetch questions error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuestions();
  }, [id]);
  
  const handleChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert('Vui lòng trả lời tất cả các câu hỏi!');
      return;
    }

    try {
      const response = await fetch('/api/my-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'result-create',
          id,
          answers: Object.entries(answers).map(([questionId, optionId]) => ({
            questionId,
            optionId,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert('Đã nộp bài thành công!');
    } catch (err: any) {
      alert(`Lỗi khi nộp bài: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="h-64 bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900">Bài Test Chi Tiết</h1>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            {loading && (
              <div className="space-y-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && <div className="text-center text-red-600 py-12">{error}</div>}

            {!loading && !error && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {questions.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">Không có câu hỏi nào</div>
                ) : (
                  questions
                    .sort((a, b) => a.order - b.order)
                    .map((q, idx) => (
                      <div key={q.id} className="bg-white rounded-xl shadow p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <span className="text-lg font-semibold text-orange-700">Câu {idx + 1}:</span>
                          <span className="text-gray-900 font-medium">{q.content}</span>
                        </div>
                        <div className="space-y-2">
                          {q.options.map((opt) => (
                            <label
                              key={opt.id}
                              className={`flex items-center gap-3 p-2 rounded cursor-pointer border ${
                                answers[q.id] === opt.id
                                  ? 'border-orange-500 bg-orange-50'
                                  : 'border-gray-200 hover:border-orange-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                value={opt.id}
                                checked={answers[q.id] === opt.id}
                                onChange={() => handleChange(q.id, opt.id)}
                                className="accent-orange-500"
                              />
                              <span className="text-gray-800">{opt.content}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))
                )}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-orange-600 text-white font-bold rounded-lg shadow hover:bg-orange-700 transition"
                    disabled={questions.length === 0}
                  >
                    Nộp bài
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}