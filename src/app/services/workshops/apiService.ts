// app/services/apiService.ts

// Interfaces
interface WorkshopQueryParams {
  PageIndex?: string;
  PageSize?: string;
  Search?: string;
  SortBy?: string;
  SortOrder?: string;
  Host?: string;
  Status?: string;
}

interface WorkshopData {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  host: string;
  status: boolean;
}

interface WorkshopApiResponse {
  totalCount: number;
  items: WorkshopData[];
  pageIndex: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface WorkshopResponse {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  host: string;
  status: boolean;
}

interface WorkshopRegistrationQueryParams {
  PageIndex?: string;
  PageSize?: string;
  Search?: string;
  WorkshopId?: string;
  UserId?: string;
  SortBy?: string;
  SortOrder?: string;
}

interface WorkshopRegistrationData {
  id: string;
  workshopId: string;
  workshopTitle: string;
  userId: string;
  userName: string;
  note: string;
}

interface WorkshopRegistrationApiResponse {
  value: {
    totalCount: number;
    items: WorkshopRegistrationData[];
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

interface WorkshopRegistrationResponse {
  workshopId: string;
  userId: string;
  note: string;
}

export class ApiService {
  private baseUrl = 'https://localhost:7081/api';

  // Workshops
  async fetchWorkshops(params: WorkshopQueryParams = {}) {
    const query = new URLSearchParams({
      PageIndex: params.PageIndex || '1',
      PageSize: params.PageSize || '10',
      Search: params.Search || '',
      SortBy: params.SortBy || '',
      SortOrder: params.SortOrder || 'desc',
      Host: params.Host || '',
      Status: params.Status !== undefined ? params.Status : '',
    }).toString();
    const url = `${this.baseUrl}/WorkShops?${query}`;
    console.log('Fetching URL:', url);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.log('Raw Response Error:', errorText);
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      const data: WorkshopApiResponse = await res.json();
      console.log('API Response:', data);
      return data;
    } catch (err) {
      console.error('Fetch error details:', err);
      throw err instanceof Error ? err : new Error('Lỗi không xác định từ API');
    }
  }

  async fetchWorkshopById(id: string) {
    const url = `${this.baseUrl}/WorkShops/${id}`;
    console.log('Fetching Workshop by ID URL:', url);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.log('Raw Response Error:', errorText);
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      const data: WorkshopResponse = await res.json();
      return data;
    } catch (err) {
      console.error('Fetch error details:', err);
      throw err instanceof Error ? err : new Error('Lỗi không xác định từ API');
    }
  }

  async createWorkshop(data: { title: string; description: string; imageUrl?: string; startDate: Date; endDate: Date; host: string; status: boolean }) {
    const res = await fetch(`${this.baseUrl}/WorkShops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create workshop');
    return res.json();
  }

  async updateWorkshop(id: string, data: { title: string; description: string; imageUrl?: string; startDate: Date; endDate: Date; host: string; status: boolean }) {
    const res = await fetch(`${this.baseUrl}/WorkShops/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update workshop');
    return res.json();
  }

  // Workshop Registrations
  async fetchWorkshopRegistrations(params: WorkshopRegistrationQueryParams = {}) {
    const query = new URLSearchParams({
      PageIndex: params.PageIndex || '1',
      PageSize: params.PageSize || '10',
      Search: params.Search || '',
      WorkshopId: params.WorkshopId || '',
      UserId: params.UserId || '',
      SortBy: params.SortBy || '',
      SortOrder: params.SortOrder || '',
    }).toString();
    const url = `${this.baseUrl}/workshops/registrations?${query}`;
    console.log('Fetching URL:', url);
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
      const data: WorkshopRegistrationApiResponse = await res.json();
      if (!data.isSuccess) throw new Error(data.error.message || 'API request failed');
      return data.value;
    } catch (err) {
      console.error('Fetch error:', err);
      throw err;
    }
  }

  async fetchWorkshopRegistrationById(id: string) {
    const url = `${this.baseUrl}/workshops/registrations/${id}`;
    console.log('Fetching Workshop Registration by ID URL:', url);
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
      const data: WorkshopRegistrationResponse = await res.json();
      return data;
    } catch (err) {
      console.error('Fetch error:', err);
      throw err;
    }
  }

  async createWorkshopRegistration(data: { workshopId: string; userId: string; note: string }) {
    const res = await fetch(`${this.baseUrl}/workshops/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create workshop registration');
    return res.json();
  }
}

export const apiService = new ApiService();