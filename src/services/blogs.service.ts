// src/services/blogs.service.ts
import { IBlog, IBlogCreate } from "@/types/blogs";
import { sendRequest } from "../utils/api";
import revalidateService from "./revalidate.service";

const REVALIDATE_TAG = {
  BLOGS: "blogs",
} as const;

const getBlogs = async (params: {
  PageIndex?: string;
  PageSize?: string;
  Search?: string;
  SortBy?: string;
  SortOrder?: string;
  AuthorId?: string;
  Title?: string;
} = {}): Promise<IModelPaginate<IBlog> | null> => {
  const res = await sendRequest<IBackendResponse<IModelPaginate<IBlog>>>({
    endpoint: "/Blogs",
    method: "GET",
    queryParams: params,
    nextOption: {
      next: {
        tags: [REVALIDATE_TAG.BLOGS],
      },
    },
  });

  return res.isSuccess ? res.value : null;
};

const getBlogById = async (id: string): Promise<IBlog | null> => {
  const res = await sendRequest<IBlog>({
    endpoint: `/Blogs/${id}`,
    method: "GET",
  });

  return res; // Trả về trực tiếp dữ liệu nếu thành công, null nếu lỗi
};

const createBlog = async (blog: IBlogCreate , token: string): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: "/Blogs",
    method: "POST",
    body: blog,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.BLOGS]);
  }

  return res;
};

const updateBlog = async (id: string, blog: Partial<IBlogCreate>, token: string): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: `/Blogs/${id}`,
    method: "PUT",
    body: blog,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.BLOGS]);
  }

  return res;
};

export const blogsService = {
  REVALIDATE_TAG,
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
};