import { IBlog, IBlogCreate } from "@/types/blogs";
import { sendRequest } from "@/utils/api"
import revalidateService from "./revalidate.service";

const REVALIDATE_TAG = {
  BLOGS: 'blogs',
} as const

const getBlogs = async () => {
  const res = await sendRequest<IBackendResponse<IModelPaginate<IBlog>>>({
        endpoint: '/Blogs',
        method: 'GET',
        nextOption: {
            next: {
                tags: [REVALIDATE_TAG.BLOGS],
            }
        }
    })

  return res;
}

const addBlog = async (blog: IBlogCreate) => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: '/Blogs',
    method: 'POST',
    body: blog,
  })

  // Cập nhật lại cache để load lại dữ liệu mới nhất
  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.BLOGS])
  }

  return res;
}


export const blogsService = {
  REVALIDATE_TAG,
  getBlogs,
  addBlog,
}
