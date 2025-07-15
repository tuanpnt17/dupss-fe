'use client';

import TestResultDetails from '@/components/tests/TestResultDetails';
import { useParams } from 'next/navigation';

const TestResultDetailsPage = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const resultId = typeof params.resultId === 'string' ? params.resultId : Array.isArray(params.resultId) ? params.resultId[0] : '';
  return <TestResultDetails resultId={resultId} testId={id} />;
};

export default TestResultDetailsPage; 