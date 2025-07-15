import { IGetStepDetail } from "@/types/steps";
import { sendRequest } from "@/utils/api";

const REVALIDATE_TAG = {
    COURSES: 'courses',
  } as const

const getStepDetail = async (id: string) => {
    const res = await sendRequest<IBackendResponse<IGetStepDetail>>({
        endpoint: `/Steps/${id}`,
        method: 'GET',
        nextOption: {
            next: {
                tags: [REVALIDATE_TAG.COURSES],
            }
        }
    })

    return res;
}

export const stepsService = {
    getStepDetail,
}
