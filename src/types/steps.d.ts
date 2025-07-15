export interface IGetStepDetail {
    id: string;
    stepNumber: number;
    stepSummary: string;
    content: string;
    status: boolean;
    attachment: string | null;
    courseSectionId: string;
    duration: number;
    type: boolean;
    videoURL: string | null;
}