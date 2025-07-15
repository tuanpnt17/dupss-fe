// app/api/workshops/route.ts
import { NextResponse } from 'next/server';
import { apiService } from '@/app/services/workshops/apiService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams);

  // Xác định loại dữ liệu cần lấy (Workshops hoặc Workshop Registrations)
  if (params.WorkshopId || params.UserId) {
    // Fetch Workshop Registrations
    const data = await apiService.fetchWorkshopRegistrations({
      PageIndex: params.PageIndex || '1',
      PageSize: params.PageSize || '10',
      Search: params.Search || '',
      WorkshopId: params.WorkshopId || '',
      UserId: params.UserId || '',
      SortBy: params.SortBy || '',
      SortOrder: params.SortOrder || '',
    });
    return NextResponse.json(data);
  } else {
    // Fetch Workshops
    const data = await apiService.fetchWorkshops({
      PageIndex: params.PageIndex || '1',
      PageSize: params.PageSize || '10',
      Search: params.Search || '',
      SortBy: params.SortBy || '',
      SortOrder: params.SortOrder || 'desc',
      Host: params.Host || '',
      Status: params.Status || '',
    });
    return NextResponse.json(data);
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  // Xác định loại POST (Create Workshop hoặc Create Workshop Registration)
  if (body.title && body.description && body.startDate && body.endDate && body.host) {
    // Create Workshop
    const data = await apiService.createWorkshop({
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      host: body.host,
      status: body.status,
    });
    return NextResponse.json(data);
  } else if (body.workshopId && body.userId && body.note) {
    // Create Workshop Registration
    const data = await apiService.createWorkshopRegistration({
      workshopId: body.workshopId,
      userId: body.userId,
      note: body.note,
    });
    return NextResponse.json(data, { status: 201 });
  } else {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}