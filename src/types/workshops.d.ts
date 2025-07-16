// types/workshops.d.ts
export interface WorkshopQueryParams {
    PageIndex?: string;
    PageSize?: string;
    Search?: string;
    SortBy?: string;
    SortOrder?: string;
    Host?: string;
    Status?: string;
  }
  
  export interface WorkshopData {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    startDate: Date;
    endDate: Date;
    host: string;
    status: boolean;
  }
  
  export interface WorkshopApiResponse {
    totalCount: number;
    items: WorkshopData[];
    pageIndex: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }
  
  export interface WorkshopResponse {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    startDate: Date;
    endDate: Date;
    host: string;
    status: boolean;
  }
  
  export interface WorkshopRegistrationQueryParams {
    PageIndex?: string;
    PageSize?: string;
    Search?: string;
    WorkshopId?: string;
    UserId?: string;
    SortBy?: string;
    SortOrder?: string;
  }
  
  export interface WorkshopRegistrationData {
    id: string;
    workshopId: string;
    workshopTitle: string;
    userId: string;
    userName: string;
    note: string;
  }
  
  export interface WorkshopRegistrationApiResponse {
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
  
  export interface WorkshopRegistrationResponse {
    workshopId: string;
    userId: string;
    note: string;
  }
  
  export interface WorkshopFormValues {
    title: string;
    host: string;
    startDate: string;
    endDate: string;
    status: boolean;
    intro: string;
    content: string;
    purpose: string;
    activities: string;
    imageUrl: string;
  }
  
  export interface MyWorkshopRegistrationQueryParams {
    Search?: string;
    StartDate?: string;
    PageIndex?: string;
    PageSize?: string;
  }
  