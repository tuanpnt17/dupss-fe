import { TestQueryParams, TestData, TestQuestionQueryParams, TestQuestionData, TestQuestionWithOptions, QuestionOptionTestResult } from "@/types/tests";
import { sendRequest } from "../utils/api";
import revalidateService from "./revalidate.service";

const REVALIDATE_TAG = {
  TESTS: "tests",
} as const;

// --- 📘 Tests ---
const getTests = async (params: TestQueryParams = {}): Promise<IModelPaginate<TestData> | null> => {
  const res = await sendRequest<IBackendResponse<IModelPaginate<TestData>>>(
    {
      endpoint: "/Tests",
      method: "GET",
      queryParams: params,
      nextOption: {
        next: {
          tags: [REVALIDATE_TAG.TESTS],
        },
      },
    }
  );
  return res.isSuccess ? res.value : null;
};

const getTestById = async (id: string): Promise<TestData | null> => {
  const res = await sendRequest<IBackendResponse<TestData>>({
    endpoint: `/Tests/${id}`,
    method: "GET",
  });
  return res.isSuccess ? res.value : null;
};

const createTest = async (data: { name: string; category: string; workshopId?: string; surveyType: string }): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: "/Tests",
    method: "POST",
    body: data,
  });
  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.TESTS]);
  }
  return res;
};

const updateTest = async (id: string, data: { name: string; category: string; workshopId?: string }): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: `/Tests/${id}`,
    method: "PUT",
    body: data,
  });
  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.TESTS]);
  }
  return res;
};

// --- 📘 TestQuestions ---
const getTestQuestionsByTestId = async (testId: string): Promise<TestQuestionWithOptions[]> => {
  const res = await sendRequest<{ value: TestQuestionWithOptions[] }>({
    endpoint: `/TestQuestions/${testId}`,
    method: "GET",
  });
  return res.value;
};

const updateTestQuestion = async (
  id: string,
  data: { content?: string; order: number; options: { id?: string; content?: string; value: number }[] }
): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: `/TestQuestions/${id}`,
    method: "PUT",
    body: data,
  });
  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.TESTS]);
  }
  return res;
};

const createTestQuestion = async (
  data: { testId: string; content: string; order: number; options: { content: string; value: number }[] }
): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: "/TestQuestions",
    method: "POST",
    body: data,
  });
  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.TESTS]);
  }
  return res;
};

// --- 📘 TestResults ---
const getTestResults = async (params: TestQuestionQueryParams = {}): Promise<IModelPaginate<TestQuestionData> | null> => {
  const res = await sendRequest<IBackendResponse<IModelPaginate<TestQuestionData>>>(
    {
      endpoint: "/TestQuestions/results",
      method: "GET",
      queryParams: params,
      nextOption: {
        next: {
          tags: [REVALIDATE_TAG.TESTS],
        },
      },
    }
  );
  return res.isSuccess ? res.value : null;
};

const createTestResult = async (data: { testId: string; userId: string; selectedOptionIds: string[] }, token: string): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: "/TestQuestions",
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.TESTS]); 
  } 
  return res; 
};

// --- 📘 Option Results ---
const getOptionResults = async (testResultsId: string): Promise<QuestionOptionTestResult[]> => {
  const res = await sendRequest<QuestionOptionTestResult[]>({
    endpoint: `/TestQuestions/option-results/${testResultsId}`,
    method: "GET",
  });
  return res;
};

const createOptionResults = async (data: { testId: string; userId: string; selectedOptionIds: string[] }): Promise<IBackendResponse<any>> => {
  const res = await sendRequest<IBackendResponse<any>>({
    endpoint: "/TestQuestions/option-results",
    method: "POST",
    body: data,
  });
  if (res.isSuccess) {
    await revalidateService.revalidate([REVALIDATE_TAG.TESTS]);
  }
  return res;
};

export const testsService = {
  REVALIDATE_TAG,
  getTests,
  getTestById,
  createTest,
  updateTest,
  getTestQuestionsByTestId,
  updateTestQuestion,
  createTestQuestion,
  getTestResults,
  createTestResult,
  getOptionResults,
  createOptionResults,
};
