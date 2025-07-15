// types/tests.d.ts

export interface TestQueryParams {
  PageIndex?: string;
  PageSize?: string;
  Search?: string;
  SortBy?: string;
  SortOrder?: string;
  Category?: string;
}

export interface TestData {
  id: string;
  name: string;
  category: string;
  workshopId?: string;
  surveyType: string;
  workshopTitle?: string;
}

export interface TestQuestionQueryParams {
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

export interface TestQuestionData {
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

export interface TestQuestionWithOptions {
  id: string;
  content?: string;
  order: number;
  options: { id: string; content?: string; value: number }[];
}

export interface QuestionOptionTestResult {
  questionId: string;
  questionContent?: string;
  selectedOptionId: string;
  selectedOptionContent?: string;
  selectedOptionValue: number;
}
