import { ICourseSection, IGetAllCourses, IGetCourseDetail } from "@/types/courses";
import { IGetStepDetail, IGetStepTracking } from "@/types/steps";
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

const checkCourseRegistration = async (id: string, accessToken: string) => {
    console.log("accessToken", accessToken);
    const res = await sendRequest<IBackendResponse<any>>({
        endpoint: `/Courses/${id}/check-registration`,
        method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    })
    return res;
}

const getCourseTracking = async (id: string, accessToken: string) => {
    const res = await sendRequest<IBackendResponse<IGetStepTracking[]>>({
        endpoint: `/Courses/${id}/step-trackings`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    return res;
}

export const coursesService = {
    REVALIDATE_TAG,
    getAllCourses,
    getCourseDetail,
    getCourseSections,
    checkCourseRegistration,
    getCourseTracking,
    
}
