interface BlogQueryParams {
  PageIndex?: string;
  PageSize?: string;
  Search?: string;
  SortBy?: string;
  SortOrder?: string;
  AuthorId?: string;
  Title?: string;
}

interface BlogData {
  id: string;
  title: string;
  content: string;
  description: string;
  authorId: string;
  authorName: string; 
  createdAt: string;
}

interface ApiResponse {
  value: {
    totalCount: number;
    items: BlogData[];
    pageIndex: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  error: {
    code: string;
    message: string;
  };
  isSuccess: boolean;
}

export class ApiService {
  private baseUrl = 'https://localhost:7081/api';

  async fetchBlogs(params: BlogQueryParams = {}) {
    const query = new URLSearchParams({
      PageIndex: params.PageIndex || '1',
      PageSize: params.PageSize || '10',
      Search: params.Search || '',
      SortBy: params.SortBy || '',
      SortOrder: params.SortOrder || '',
      AuthorId: params.AuthorId || '',
      Title: params.Title || '',
    }).toString();
    const url = `${this.baseUrl}/Blogs?${query}`;
    console.log("Fetching URL:", url);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      const data: ApiResponse = await res.json();
      if (!data.isSuccess) throw new Error(data.error.message || 'API request failed');
      return data.value;
    } catch (err) {
      console.error("Fetch error:", err);
      throw err;
    }
  }

  async fetchBlogById(id: string) {
    const url = `${this.baseUrl}/Blogs/${id}`;
    console.log("Fetching Blog by ID URL:", url);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      const data: BlogData = await res.json(); // Trả về trực tiếp BlogData
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      throw err;
    }
  }

  async createBlog(data: BlogData) {
    const res = await fetch(`${this.baseUrl}/Blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create blog');
    return res.json();
  }

  async updateBlog(id: string, data: BlogData) {
    const res = await fetch(`${this.baseUrl}/Blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update blog');
    return res.json();
  }
}

export const apiService = new ApiService();