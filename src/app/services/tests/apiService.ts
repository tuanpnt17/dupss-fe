// Interfaces
interface TestQueryParams {
  PageIndex?: string;
  PageSize?: string;
  Search?: string;
  SortBy?: string;
  SortOrder?: string;
  Category?: string;
}

interface TestData {
  id: string;
  name: string;
  category: string;
  workshopId?: string;
  surveyType: string;
  workshopTitle?: string;
}

interface TestApiResponse {
  value: {
    totalCount: number;
    items: TestData[];
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

interface TestQuestionQueryParams {
  PageIndex?: string;
  PageSize?: string;
  Search?: string;
  SortBy?: string;
  SortOrder?: string;
  UserId?: string;
  TestId?: string;
  SurveyType?: string;
  Category?: string;
  SeverityLevel?: string;
}

interface TestQuestionData {
  id: string;
  userId: string;
  fullName: string;
  testId: string;
  testName: string;
  surveyType: string;
  category: string;
  takenAt?: Date;
  severityLevel?: string;
  totalPoint?: number;
  recommendation?: string;
}

interface TestQuestionApiResponse {
  value: {
    totalCount: number;
    items: TestQuestionData[];
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

interface TestQuestionWithOptions {
  id: string;
  content?: string;
  order: number;
  options: { id: string; content?: string; value: number }[];
}

interface QuestionOptionTestResult {
  questionId: string;
  questionContent?: string;
  selectedOptionId: string;
  selectedOptionContent?: string;
  selectedOptionValue: number;
}

// ApiService
export class ApiService {
  private baseUrl = 'https://localhost:7081/api';

  // --- 📘 Tests ---
  async fetchTests(params: TestQueryParams = {}) {
    const query = new URLSearchParams({
      PageIndex: params.PageIndex || '1',
      PageSize: params.PageSize || '10',
      Search: params.Search || '',
      SortBy: params.SortBy || '',
      SortOrder: params.SortOrder || '',
      Category: params.Category || '',
    }).toString();
    const url = `${this.baseUrl}/Tests?${query}`;
    const res = await fetch(url);
    const data: TestApiResponse = await res.json();
    if (!data.isSuccess) throw new Error(data.error.message || 'API request failed');
    return data.value;
  }

  async fetchTestById(id: string) {
    const res = await fetch(`${this.baseUrl}/Tests/${id}`);
    if (!res.ok) throw new Error('Test not found');
    return res.json();
  }

  async createTest(data: { name: string; category: string; workshopId?: string; surveyType: string }) {
    const res = await fetch(`${this.baseUrl}/Tests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create test');
    return res.json();
  }

  async updateTest(id: string, data: { name: string; category: string; workshopId?: string }) {
    const res = await fetch(`${this.baseUrl}/Tests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update test');
    return res.json();
  }

  // --- 📘 TestQuestions ---
  async fetchTestQuestionsByTestId(testId: string) {
    const res = await fetch(`${this.baseUrl}/TestQuestions/${testId}`);
    if (!res.ok) throw new Error('Failed to fetch test questions');
    const data: TestQuestionWithOptions[] = await res.json();
    return data;
  }

  async updateTestQuestion(id: string, data: { content?: string; order: number; options: { id?: string; content?: string; value: number }[] }) {
    const res = await fetch(`${this.baseUrl}/TestQuestions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update test question');
    return res.json();
  }

  async createTestQuestion(data: { testId: string; content: string; order: number; options: { content: string; value: number }[] }) {
    const res = await fetch(`${this.baseUrl}/TestQuestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create test question');
    return res.json();
  }

  // --- 📘 TestResults ---
  async fetchTestResults(params: TestQuestionQueryParams = {}) {
    const query = new URLSearchParams({
      PageIndex: params.PageIndex || '1',
      PageSize: params.PageSize || '10',
      Search: params.Search || '',
      SortBy: params.SortBy || '',
      SortOrder: params.SortOrder || '',
      UserId: params.UserId || '',
      TestId: params.TestId || '',
      SurveyType: params.SurveyType || '',
      Category: params.Category || '',
      SeverityLevel: params.SeverityLevel || '',
    }).toString();
    const url = `${this.baseUrl}/TestQuestions/results?${query}`;
    const res = await fetch(url);
    const data: TestQuestionApiResponse = await res.json();
    if (!data.isSuccess) throw new Error(data.error.message || 'Failed to fetch test results');
    return data.value;
  }

  async createTestResult(data: { testId: string; userId: string; selectedOptionIds: string[] }) {
    const res = await fetch(`${this.baseUrl}/TestQuestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit test result');
    return res.json();
  }

  // --- 📘 Option Results ---
  async fetchOptionResults(testResultsId: string) {
    const res = await fetch(`${this.baseUrl}/TestQuestions/option-results/${testResultsId}`);
    if (!res.ok) throw new Error('Failed to fetch option results');
    const data: QuestionOptionTestResult[] = await res.json();
    return data;
  }

  async createOptionResults(data: { testId: string; userId: string; selectedOptionIds: string[] }) {
    const res = await fetch(`${this.baseUrl}/TestQuestions/option-results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit option results');
    return res.json();
  }
}

export const apiService = new ApiService();
