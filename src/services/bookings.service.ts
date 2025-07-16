import { sendRequest } from "@/utils/api"
import revalidateService from "./revalidate.service";
import { IBookings } from "@/types/appointments";

const REVALIDATE_TAG = {
  BOOKINGS: 'bookings',
} as const

const getBookings = async (token : string) => {
  const res = await sendRequest<IBackendResponse<IBookings>>({
        endpoint: '/Bookings/my-bookings',
        method: 'GET',
        nextOption: {
            next: {
                tags: [REVALIDATE_TAG.BOOKINGS],
            }
        }
        ,
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })

  return res;
}


export const bookingsService = {
  REVALIDATE_TAG,
  getBookings
}
