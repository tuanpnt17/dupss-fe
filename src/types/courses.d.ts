export interface IGetAllCourses {
    id: string;
    courseName: string;
    courseCode: string;
    pictureURL: string;
    summary: string;
    content: string;
    attachment: string | null;
    status: boolean;
    totalDuration: number;
    totalSection: number;
    totalStep: number;
    categoryName: string;
}

export interface IGetCourseDetail {
    id: string;
    courseName: string;
    courseCode: string;
    pictureURL: string;
    summary: string;
    content: string;
    attachment: string | null;
    status: boolean;
    totalDuration: number;
    totalSection: number;
    totalStep: number;
    ratingAverage: number | null;
    ratingCount: number;
}

export interface ICourseSection {
    id: string;
    sectionName: string;
    status: boolean;
    steps: {
        id: string;
        stepSummary: string;
        stepNumber: number;
    }[];
}