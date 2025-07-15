import { ICreateQueuingCourse, IQueuingCourse } from "@/types/queuingCourse";
import { sendRequest } from "@/utils/api";
import revalidateService from "./revalidate.service";

const REVALIDATE_TAG = {
    QUEUING_COURSE: "queuing-course",
} as const;

const getQueuingCourses = async (token: string, pageIndex: number = 1, pageSize: number = 10, search: string = "") => {
    const res = await sendRequest<IBackendResponse<IModelPaginate<IQueuingCourse>>>({
        endpoint: "/QueuingCourse",
        method: "GET",
        queryParams: {
            pageIndex,
            pageSize,
            search,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
        nextOption: {
            next: { tags: [REVALIDATE_TAG.QUEUING_COURSE] }
        }
    });
    return res;
}

const addQueuingCourse = async (token: string, createQueuingCourse: ICreateQueuingCourse) => {
    const res = await sendRequest<IBackendResponse<any>>({
        endpoint: "/QueuingCourse",
        method: "POST",
        body: createQueuingCourse,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    if (res.isSuccess) {
        await revalidateService.revalidate([REVALIDATE_TAG.QUEUING_COURSE]);
    }
    return res;
}

const approveQueuingCourse = async (token: string, courseCode: string, queuingCourseStatus: "Approved" | "Reject") => {
    const res = await sendRequest<IBackendResponse<any>>({
        endpoint: `/QueuingCourse/${courseCode}`,
        method: "PATCH",
        body: {
            code: courseCode,
            queuingCourseStatus: queuingCourseStatus,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.isSuccess) {
        await revalidateService.revalidate([REVALIDATE_TAG.QUEUING_COURSE]);
    }
    return res;
}

export const queuingCourseService = {
    REVALIDATE_TAG,
    getQueuingCourses,
    addQueuingCourse,
    approveQueuingCourse,
}