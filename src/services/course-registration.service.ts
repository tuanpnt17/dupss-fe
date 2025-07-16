import { ICourseSection, IGetAllCourses, IGetCourseDetail } from "@/types/courses";
import { sendRequest } from "@/utils/api";



const registerCourse = async (courseId: string, accessToken: string) => {
    const res = await sendRequest<IBackendResponse<any>>({
        endpoint: `/coursesregistration`,
        method: 'POST',
        body: { courseId: courseId },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    return res;
}

export const courseRegistrationService = {
    registerCourse
}