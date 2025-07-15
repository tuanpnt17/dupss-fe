// src/services/workshops.service.ts
import { WorkshopQueryParams, WorkshopData, WorkshopRegistrationQueryParams, WorkshopRegistrationData } from "@/types/workshops";
import { sendRequest } from "../utils/api";
import revalidateService from "./revalidate.service";

const REVALIDATE_TAG = {
  WORKSHOPS: "workshops",
} as const;

const getWorkshops = async (params: WorkshopQueryParams = {}): Promise<IModelPaginate<WorkshopData> | null> => {
  const res = await sendRequest<IBackendResponse<IModelPaginate<WorkshopData>>>({
    endpoint: "/Workshops",
    method: "GET",
    queryParams: params,
    nextOption: {
      next: {
        tags: [REVALIDATE_TAG.WORKSHOPS],
      },
    },
  });

  return res.isSuccess ? res.value : null;
};

const getWorkshopById = async (id: string): Promise<WorkshopData | null> => {
  const res = await sendRequest<IBackendResponse<WorkshopData>>({
    endpoint: `/Workshops/${id}`,
    method: "GET",
  });

  return res.isSuccess ? res.value : null;
};

const createWorkshop = async (data: {
  title: string;
  description: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  host: string;
  status: boolean;
}): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: "/Workshops",
    method: "POST",
    body: data,
  });

  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.WORKSHOPS]);
  }

  return res;
};

const updateWorkshop = async (id: string, data: {
  title: string;
  description: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  host: string;
  status: boolean;
}): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: `/Workshops/${id}`,
    method: "PUT",
    body: data,
  });

  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.WORKSHOPS]);
  }

  return res;
};

// Workshop Registrations
const getWorkshopRegistrations = async (params: WorkshopRegistrationQueryParams = {}): Promise<IModelPaginate<WorkshopRegistrationData> | null> => {
  const res = await sendRequest<IBackendResponse<IModelPaginate<WorkshopRegistrationData>>>({
    endpoint: "/workshops/registrations",
    method: "GET",
    queryParams: params,
    nextOption: {
      next: {
        tags: [REVALIDATE_TAG.WORKSHOPS],
      },
    },
  });

  return res.isSuccess ? res.value : null;
};

const getWorkshopRegistrationById = async (id: string): Promise<WorkshopRegistrationData | null> => {
  const res = await sendRequest<WorkshopRegistrationData>({
    endpoint: `/workshops/registrations/${id}`,
    method: "GET",
  });

  return res; // Trả về trực tiếp dữ liệu nếu thành công, null nếu lỗi
};

const createWorkshopRegistration = async (data: {
  workshopId: string;
  userId: string;
  note: string;
}): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: "/workshops/registrations",
    method: "POST",
    body: data,
  });

  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.WORKSHOPS]);
  }

  return res;
};

export const workshopsService = {
  REVALIDATE_TAG,
  getWorkshops,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  getWorkshopRegistrations,
  getWorkshopRegistrationById,
  createWorkshopRegistration,
};