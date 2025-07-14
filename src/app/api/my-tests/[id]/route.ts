import { NextResponse } from 'next/server';
import { apiService } from '@/app/services/tests/apiService';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'test';

  try {
    switch (mode) {
      case 'test':
        return NextResponse.json(await apiService.fetchTestById(params.id));

      default:
        return NextResponse.json({ message: 'Invalid mode for GET' }, { status: 400 });
    }
  } catch (error) {
    console.error(`GET /api/my-tests/${params.id} error:`, error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const mode = body.mode;

  try {
    switch (mode) {
      case 'test':
        return NextResponse.json(await apiService.updateTest(params.id, body));

      case 'question':
        return NextResponse.json(await apiService.updateTestQuestion(params.id, body));

      default:
        return NextResponse.json({ message: 'Invalid mode for PUT' }, { status: 400 });
    }
  } catch (error) {
    console.error(`PUT /api/my-tests/${params.id} error:`, error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
