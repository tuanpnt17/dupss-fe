'use client';
import React, { useState } from 'react';

// Dữ liệu câu hỏi (bạn có thể fetch từ API thực tế)
const testQuestions = [
  {
    "id": "16245107-d21a-42bd-bd8a-065ca21275a4",
    "content": "Trong suốt cuộc đời bạn, bạn đã từng sử dụng những chất sau đây chưa? (liệt kê từng chất một: thuốc lá, rượu, cần sa, amphetamine, thuốc ngủ, thuốc giảm đau, ma túy bất hợp pháp, ...)?",
    "order": 1,
    "options": [
      { "id": "c02c6d51-618c-4c45-8412-ae067903d652", "content": "Không", "value": 0 },
      { "id": "d1915a42-c4ac-48c1-9ef1-f1b8ca3c2cc5", "content": "Có", "value": 1 }
    ]
  },
  {
    "id": "2107abde-8f39-476d-962a-80c211c84fcf",
    "content": "Trong 3 tháng vừa qua, bạn có sử dụng các chất đó không?",
    "order": 2,
    "options": [
      { "id": "3597f762-5689-4978-b004-77d692334016", "content": "Không", "value": 0 },
      { "id": "3a3f9f79-9cb2-4162-8a0e-e0672fa4c309", "content": "Có", "value": 1 }
    ]
  },
  {
    "id": "b87bcf6f-f2dc-4b03-a8bd-6a52447a7d57",
    "content": "Trong 3 tháng vừa qua, bạn thường sử dụng những chất đó với tần suất nào?",
    "order": 3,
    "options": [
      { "id": "84706a00-9b0e-481a-8a4b-26ce4f87cbe6", "content": "Không", "value": 0 },
      { "id": "bddd0071-a41b-4f7b-95cc-1635fa710348", "content": "Có", "value": 1 }
    ]
  },
  {
    "id": "b9662790-b3fd-4c4f-b3e0-347b77d13927",
    "content": "Có khi nào bạn cảm thấy thôi thúc mạnh mẽ hoặc mong muốn mãnh liệt sử dụng chất đó?",
    "order": 4,
    "options": [
      { "id": "6c1a7912-a2d8-4a02-b713-80ac94933bbd", "content": "Không", "value": 0 },
      { "id": "7894a60e-8f72-4b5f-99de-8f7364352db9", "content": "Có", "value": 1 }
    ]
  },
  {
    "id": "4ee6bdd8-3893-4b42-a66f-76f7fffa0887",
    "content": "Việc sử dụng chất có khi nào làm bạn không hoàn thành công việc tại trường, tại nhà hoặc công sở không?",
    "order": 5,
    "options": [
      { "id": "490d0f7a-6d32-4885-9976-ad149d074228", "content": "Không", "value": 0 },
      { "id": "7507bcbc-5467-4494-81d0-821a6287be3a", "content": "Có", "value": 1 }
    ]
  },
  {
    "id": "89313904-3599-46ec-b572-92fbe537657c",
    "content": "Có khi nào người thân, bạn bè hoặc bác sĩ lo lắng về việc bạn sử dụng chất đó?",
    "order": 6,
    "options": [
      { "id": "35a48109-4942-4f72-8603-65468e47bbdb", "content": "Không", "value": 0 },
      { "id": "8310dffc-cf00-4d61-be31-787d3e925940", "content": "Có", "value": 1 }
    ]
  },
  {
    "id": "40bbc6c2-d5b5-458e-a744-37ecf87fddf9",
    "content": "Bạn đã bao giờ cố gắng ngưng sử dụng nhưng không thành công?",
    "order": 7,
    "options": [
      { "id": "04115c91-6a0a-4528-bd6f-a70c2bc4d263", "content": "Không", "value": 0 },
      { "id": "0b33b5ba-d24d-40f5-801d-78df5800864f", "content": "Có", "value": 1 }
    ]
  },
  {
    "id": "8b5a9f14-806d-4c1c-b800-6b947fe6e86e",
    "content": "Bạn đã bao giờ có vấn đề về sức khỏe, tâm lý hoặc pháp lý do sử dụng chất?",
    "order": 8,
    "options": [
      { "id": "12f5cd15-b784-4ca8-a995-85d00c9c4460", "content": "Có", "value": 1 },
      { "id": "ec629905-af9b-481e-85a3-06e42c7e3006", "content": "Không", "value": 0 }
    ]
  }
];

export default function TestDetailPage() {
  // State lưu đáp án người dùng chọn
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});

  const handleChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý nộp bài ở đây (gửi answers lên API, v.v.)
    alert('Đã nộp bài!\n' + JSON.stringify(answers, null, 2));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">Bài Test Chi Tiết</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {testQuestions
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
          ))}
        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-orange-600 text-white font-bold rounded-lg shadow hover:bg-orange-700 transition"
          >
            Nộp bài
          </button>
        </div>
      </form>
    </div>
  );
}



