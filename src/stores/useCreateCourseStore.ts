import { create } from "zustand";
import { ICreateQueuingCourse, QueuingCourseSection, Step } from "@/types/queuingCourse";

interface CreateCourseState extends Omit<ICreateQueuingCourse, "queuingCourseSections"> {
  queuingCourseSections: QueuingCourseSection[];
  setField: (field: keyof Omit<ICreateQueuingCourse, "queuingCourseSections">, value: any) => void;
  addSection: (section: QueuingCourseSection) => void;
  updateSection: (index: number, section: QueuingCourseSection) => void;
  removeSection: (index: number) => void;
  addStep: (sectionIdx: number, step: Step) => void;
  updateStep: (sectionIdx: number, stepIdx: number, step: Step) => void;
  removeStep: (sectionIdx: number, stepIdx: number) => void;
  reset: () => void;
}

const initialState: Omit<ICreateQueuingCourse, "queuingCourseSections"> & { queuingCourseSections: QueuingCourseSection[] } = {
  courseName: "",
  courseCode: "",
  description: "",
  pictureUrl: "",
  summary: "",
  content: "",
  price: 0,
  oldPrice: 0,
  attachmentUrl: "",
  categoryId: "",
  queuingCourseSections: [],
};

const useCreateCourseStore = create<CreateCourseState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  addSection: (section) => set((state) => ({ queuingCourseSections: [...state.queuingCourseSections, section] })),
  updateSection: (index, section) => set((state) => {
    const updated = [...state.queuingCourseSections];
    updated[index] = section;
    return { queuingCourseSections: updated };
  }),
  removeSection: (index) => set((state) => {
    const updated = [...state.queuingCourseSections];
    updated.splice(index, 1);
    return { queuingCourseSections: updated };
  }),
  addStep: (sectionIdx, step) => set((state) => {
    const updated = [...state.queuingCourseSections];
    updated[sectionIdx] = {
      ...updated[sectionIdx],
      steps: [...updated[sectionIdx].steps, step],
    };
    return { queuingCourseSections: updated };
  }),
  updateStep: (sectionIdx, stepIdx, step) => set((state) => {
    const updated = [...state.queuingCourseSections];
    const steps = [...updated[sectionIdx].steps];
    steps[stepIdx] = step;
    updated[sectionIdx] = { ...updated[sectionIdx], steps };
    return { queuingCourseSections: updated };
  }),
  removeStep: (sectionIdx, stepIdx) => set((state) => {
    const updated = [...state.queuingCourseSections];
    const steps = [...updated[sectionIdx].steps];
    steps.splice(stepIdx, 1);
    updated[sectionIdx] = { ...updated[sectionIdx], steps };
    return { queuingCourseSections: updated };
  }),
  reset: () => set(() => ({ ...initialState })),
}));

export default useCreateCourseStore; 