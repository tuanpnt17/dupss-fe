import { NextResponse } from 'next/server';
import { apiService } from '@/app/services/tests/apiService';

// Helper: Chuyển URLSearchParams về dạng object
function toTestQueryParams(searchParams: URLSearchParams) {
  return {
    PageIndex: searchParams.get('PageIndex') || undefined,
    PageSize: searchParams.get('PageSize') || undefined,
    Search: searchParams.get('Search') || undefined,
    SortBy: searchParams.get('SortBy') || undefined,
    SortOrder: searchParams.get('SortOrder') || undefined,
    Category: searchParams.get('Category') || undefined,
  };
}

function toTestResultQueryParams(searchParams: URLSearchParams) {
  return {
    PageIndex: searchParams.get('PageIndex') || undefined,
    PageSize: searchParams.get('PageSize') || undefined,
    Search: searchParams.get('Search') || undefined,
    SortBy: searchParams.get('SortBy') || undefined,
    SortOrder: searchParams.get('SortOrder') || undefined,
    UserId: searchParams.get('UserId') || undefined,
    TestId: searchParams.get('TestId') || undefined,
    SurveyType: searchParams.get('SurveyType') || undefined,
    Category: searchParams.get('Category') || undefined,
    SeverityLevel: searchParams.get('SeverityLevel') || undefined,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode');

  try {
    switch (mode) {
      case 'test':
        return NextResponse.json(await apiService.fetchTests(toTestQueryParams(searchParams)));

      case 'result':
        return NextResponse.json(await apiService.fetchTestResults(toTestResultQueryParams(searchParams)));

        case 'questions-by-test': {
          const testId = searchParams.get('TestId');
          if (!testId) {
            return NextResponse.json({ message: 'Missing TestId' }, { status: 400 });
          }
        
          try {
            const questions = await apiService.fetchTestQuestionsByTestId(testId);
            return NextResponse.json(questions);
          } catch (err) {
            console.error('Error fetching questions for TestId:', testId, err);
            return NextResponse.json({ message: 'Failed to fetch questions' }, { status: 500 });
          }
        }
        
      

      case 'option-result': {
        const testResultsId = searchParams.get('TestResultsId') || '';
        return NextResponse.json(await apiService.fetchOptionResults(testResultsId));
      }

      default:
        return NextResponse.json({ message: 'Invalid or missing mode' }, { status: 400 });
    }
  } catch (error) {
    console.error('GET /api/my-tests error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const mode = body.mode;

  try {
    switch (mode) {
      case 'test':
      case 'test-create':
        return NextResponse.json(await apiService.createTest(body), { status: 201 });

      case 'result':
      case 'result-create':
        return NextResponse.json(await apiService.createTestResult(body), { status: 201 });

      default:
        return NextResponse.json({ message: 'Invalid mode for POST' }, { status: 400 });
    }
  } catch (error) {
    console.error('POST /api/my-tests error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
