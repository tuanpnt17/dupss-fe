// app/api/workshops/[id]/route.ts
import { NextResponse } from 'next/server';
import { apiService } from '@/app/services/workshops/apiService';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  // Giả định id có thể là WorkshopId hoặc WorkshopRegistrationId
  const data = await apiService.fetchWorkshopById(id); // Mặc định lấy Workshop
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  // Xác định loại PUT (Update Workshop)
  if (body.title && body.description && body.startDate && body.endDate && body.host) {
    // Update Workshop
    const data = await apiService.updateWorkshop(id, {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      host: body.host,
      status: body.status,
    });
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}