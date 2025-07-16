'use client';

import TestDetails from '@/components/tests/TestDetails';
import { useParams, useRouter } from 'next/navigation';

const TestDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  // const resultId = typeof params.resultId === 'string' ? params.resultId : Array.isArray(params.resultId) ? params.resultId[0] : '';

  const handleSubmitSuccess = () => {
    // Redirect to profile page and open the test results tab
    router.push('/profile?tab=test');
  };

  return <TestDetails testId={id} onSubmitSuccess={handleSubmitSuccess} />;
};

export default TestDetailsPage;
