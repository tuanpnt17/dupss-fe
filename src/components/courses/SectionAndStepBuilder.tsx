'use client'
import React, { useState } from "react";
import useCreateCourseStore from "@/stores/useCreateCourseStore";
import { QueuingCourseSection, Step } from "@/types/queuingCourse";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const defaultStep: Step = {
  stepNumber: 1,
  stepSummary: "",
  content: "",
  attachment: "",
  duration: 10,
  type: true,
  videoURL: ""
};

const SectionAndStepBuilder: React.FC<Props> = ({ onNext, onBack }) => {
  const store = useCreateCourseStore();
  const [sectionName, setSectionName] = useState("");
  const [sectionError, setSectionError] = useState<string | null>(null);
  const [stepDialogOpen, setStepDialogOpen] = useState(false);
  const [currentSectionIdx, setCurrentSectionIdx] = useState<number | null>(null);
  const [stepForm, setStepForm] = useState<Step>(defaultStep);
  const [stepError, setStepError] = useState<string | null>(null);

  const handleAddSection = () => {
    if (!sectionName.trim()) {
      setSectionError("Tên phần không được để trống");
      return;
    }
    store.addSection({
      sectionNumber: store.queuingCourseSections.length + 1,
      sectionName: sectionName.trim(),
      steps: []
    });
    setSectionName("");
    setSectionError(null);
  };

  const handleRemoveSection = (idx: number) => {
    store.removeSection(idx);
  };

  const openStepDialog = (sectionIdx: number) => {
    setCurrentSectionIdx(sectionIdx);
    setStepForm({ ...defaultStep, stepNumber: (store.queuingCourseSections[sectionIdx]?.steps.length || 0) + 1 });
    setStepDialogOpen(true);
    setStepError(null);
  };

  const closeStepDialog = () => {
    setStepDialogOpen(false);
    setStepForm(defaultStep);
    setStepError(null);
  };

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStepForm({ ...stepForm, [e.target.name]: e.target.value });
  };

  const handleStepBoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepForm({ ...stepForm, type: e.target.checked });
  };

  const handleAddStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepForm.stepSummary || !stepForm.content) {
      setStepError("Vui lòng nhập tóm tắt và nội dung bước.");
      return;
    }
    if (currentSectionIdx !== null) {
      store.addStep(currentSectionIdx, stepForm);
    }
    closeStepDialog();
  };

  const handleRemoveStep = (sectionIdx: number, stepIdx: number) => {
    store.removeStep(sectionIdx, stepIdx);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Xây dựng các phần và bước cho khóa học</h2>
      {/* Section Add */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tên phần"
          value={sectionName}
          onChange={e => setSectionName(e.target.value)}
          className="border-2 border-orange-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
        />
        <button
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow hover:from-orange-600 hover:to-red-600 transition-all duration-200"
          onClick={handleAddSection}
          type="button"
        >
          Thêm phần
        </button>
      </div>
      {sectionError && <div className="text-red-600 mb-2">{sectionError}</div>}
      {/* Section List */}
      <div className="space-y-6">
        {store.queuingCourseSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="border rounded-lg p-4 bg-orange-50">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-lg">{section.sectionNumber}. {section.sectionName}</div>
              <button onClick={() => handleRemoveSection(sectionIdx)} className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors" title="Xóa phần">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {/* Steps */}
            <div className="ml-4">
              <div className="flex gap-2 items-center mb-2">
                <span className="font-medium">Các bước:</span>
                <button
                  className="px-4 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold rounded-lg shadow hover:from-orange-500 hover:to-red-500 transition-all duration-200 text-sm"
                  onClick={() => openStepDialog(sectionIdx)}
                  type="button"
                >
                  Thêm bước
                </button>
              </div>
              <ul className="space-y-2">
                {section.steps.map((step, stepIdx) => (
                  <li key={stepIdx} className="flex items-center gap-2 bg-white rounded px-3 py-2 border">
                    <span className="font-mono text-xs">Bước {step.stepNumber}:</span>
                    <span className="font-medium">{step.stepSummary}</span>
                    <button onClick={() => handleRemoveStep(sectionIdx, stepIdx)} className="text-red-400 hover:text-red-600 p-1 rounded-full transition-colors" title="Xóa bước">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </li>
                ))}
                {section.steps.length === 0 && <li className="text-gray-500 text-sm">Chưa có bước nào</li>}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {/* Step Modal */}
      {stepDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="relative max-w-lg w-full pointer-events-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn border border-orange-100">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
                onClick={closeStepDialog}
                title="Đóng"
                type="button"
              >
                ×
              </button>
              <h3 className="text-xl font-bold text-orange-600 mb-4">Thêm bước mới</h3>
              {stepError && <div className="text-red-600 mb-2">{stepError}</div>}
              <form onSubmit={handleAddStep} className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Tóm tắt bước <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="stepSummary"
                    value={stepForm.stepSummary}
                    onChange={handleStepChange}
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nội dung bước <span className="text-red-500">*</span></label>
                  <textarea
                    name="content"
                    value={stepForm.content}
                    onChange={handleStepChange}
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Thời lượng (phút)</label>
                  <input
                    type="number"
                    name="duration"
                    value={stepForm.duration}
                    onChange={handleStepChange}
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Video URL (tùy chọn)</label>
                  <input
                    type="text"
                    name="videoURL"
                    value={stepForm.videoURL}
                    onChange={handleStepChange}
                    className="w-full border-2 border-orange-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={closeStepDialog}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                  >
                    Thêm bước
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200"
          onClick={onBack}
          type="button"
        >
          Quay lại
        </button>
        <button
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow hover:from-orange-600 hover:to-red-600 transition-all duration-200"
          onClick={onNext}
          type="button"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default SectionAndStepBuilder; 