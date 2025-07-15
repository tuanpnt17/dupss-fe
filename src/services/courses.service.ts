import { ICourseSection, IGetAllCourses, IGetCourseDetail } from "@/types/courses";
import { sendRequest } from "@/utils/api";

const REVALIDATE_TAG = {
    COURSES: 'courses',
  } as const

const getAllCourses = async () => {
    const res = await sendRequest<IBackendResponse<IModelPaginate<IGetAllCourses>>>({
        endpoint: '/Courses',
        method: 'GET',
        nextOption: {
            next: {
                tags: [REVALIDATE_TAG.COURSES],
            }
        }
    })

    return res;
}

const getCourseDetail = async (id: string) => {
    const res = await sendRequest<IBackendResponse<IGetCourseDetail>>({
        endpoint: `/Courses/${id}`,
        method: 'GET',
    })
    return res;
}

const getCourseSections = async (id: string) => {
    const res = await sendRequest<IBackendResponse<ICourseSection[]>>({
        endpoint: `/Courses/${id}/course-sections`,
        method: 'GET',
    })
    return res;
}

export const coursesService = {
    REVALIDATE_TAG,
    getAllCourses,
    getCourseDetail,
    getCourseSections,
}
