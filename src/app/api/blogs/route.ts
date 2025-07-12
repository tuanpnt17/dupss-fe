import { NextResponse } from 'next/server';
import { apiService } from '@/app/services/blogs/apiService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams);
  const data = await apiService.fetchBlogs(params);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = await apiService.createBlog(body);
  return NextResponse.json(data);
}