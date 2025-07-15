import { NextResponse } from 'next/server';
import { apiService } from '@/app/services/blogs/apiService';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await apiService.fetchBlogById(id);
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const data = await apiService.updateBlog(id, body);
  return NextResponse.json(data);
}