'use client'
import React, { useState } from "react";
import CourseBasicInfoForm from "./CourseBasicInfoForm";
import SectionAndStepBuilder from "./SectionAndStepBuilder";
import CourseReviewAndSubmit from "./CourseReviewAndSubmit";
import useCreateCourseStore from "@/stores/useCreateCourseStore";

const steps = [
  "Thông tin cơ bản",
  "Phần & Bước",
  "Xem lại & Gửi"
];

const AddCourseForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { reset } = useCreateCourseStore();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    reset();
    setActiveStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Centered Step Bar */}
        <div className="flex items-center justify-center mb-12 mx-auto max-w-2xl">
          {steps.map((label, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;
            return (
              <div key={label} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={
                      `flex items-center justify-center rounded-full border-4 transition-all duration-200 ` +
                      (isActive
                        ? "bg-gradient-to-r from-orange-500 to-red-500 border-orange-400 scale-110 shadow-lg"
                        : isCompleted
                        ? "bg-gradient-to-r from-orange-400 to-red-400 border-orange-300 text-white"
                        : "bg-white border-gray-200 text-gray-400") +
                      " w-12 h-12 text-lg font-bold"
                    }
                  >
                    {isCompleted ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={
                      `mt-2 text-sm font-semibold transition-colors duration-200 ` +
                      (isActive
                        ? "text-orange-600"
                        : isCompleted
                        ? "text-orange-400"
                        : "text-gray-400")
                    }
                  >
                    {label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 bg-gradient-to-r from-orange-200 to-red-200 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
        {/* Centered Step Content */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-7xl">
            {activeStep === 0 && <CourseBasicInfoForm onNext={handleNext} />}
            {activeStep === 1 && <SectionAndStepBuilder onNext={handleNext} onBack={handleBack} />}
            {activeStep === 2 && <CourseReviewAndSubmit onBack={handleBack} onReset={handleReset} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseForm;