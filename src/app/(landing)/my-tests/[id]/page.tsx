'use client';

import TestDetails from '@/components/tests/TestDetails';
import { useParams } from 'next/navigation';

const TestDetailsPage = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const resultId = typeof params.resultId === 'string' ? params.resultId : Array.isArray(params.resultId) ? params.resultId[0] : '';
  return <TestDetails testId={id} />;
};

export default TestDetailsPage;
