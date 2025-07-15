'use client';

import TestDetails from "@/components/tests/TestDetails";
import { useParams } from "next/navigation";

const TestDetailsPage = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  return <TestDetails testId={id} />;
};

export default TestDetailsPage;
