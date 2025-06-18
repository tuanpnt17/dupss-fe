'use client'
import React, { useState } from "react";

interface CourseStep {
  id: number;
  title: string;
  previewUrl?: string;
  duration: string;
}

interface CourseSection {
  id: number;
  title: string;
  steps: CourseStep[];
  totalDuration: string;
}

interface Props {
  sections: CourseSection[];
}

const CourseContentSection: React.FC<Props> = ({ sections }) => {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (id: number) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const totalSteps = sections.reduce((acc, s) => acc + s.steps.length, 0);
  const totalDuration = sections.map(s => s.totalDuration).join(" + "); // hoặc tính tổng phút nếu muốn

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 mt-8">
      <h2 className="text-lg font-semibold mb-4">Nội dung khóa học</h2>
      <div className="text-gray-500 mb-2 text-sm">
        {sections.length} phần • {totalSteps} bài giảng • {totalDuration} tổng thời lượng
      </div>
      {sections.map((section) => (
        <div key={section.id} className="mb-2 border-b">
          <button
            className="w-full text-left font-medium py-2 flex justify-between items-center"
            onClick={() => toggleSection(section.id)}
          >
            <span>{section.title}</span>
            <span className="text-xs text-gray-400">
              {section.steps.length} bài giảng • {section.totalDuration}
            </span>
          </button>
          {openSections.includes(section.id) && (
            <ul className="pl-4 pb-2">
              {section.steps.map((step) => (
                <li key={step.id} className="flex justify-between items-center py-1">
                  <span>{step.title}</span>
                  <span className="flex items-center gap-2">
                    {step.previewUrl && (
                      <a href={step.previewUrl} className="text-violet-600 text-xs" target="_blank" rel="noopener noreferrer">
                        Xem trước
                      </a>
                    )}
                    <span className="text-xs text-gray-400">{step.duration}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContentSection; 