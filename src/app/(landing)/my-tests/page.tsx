'use client';
import useBearStore from '@/stores/useBearStore';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const TestLandingPage = () => {

  const routing = useRouter()

  const handleClick = () => {
    routing.push('/my-courses/12332');
  }

  const bearStore = useBearStore();

  return (
    <div>
      <h1>Test Landing Page - Bear - {bearStore.bears}</h1>
      <p>Welcome to the test landing page. Here you can find various tests and quizzes.</p>

      <Button variant="contained" onClick={() => bearStore.increase(2)}>Increase Bear</Button>

      <Button variant="contained" onClick={handleClick}>My course</Button>
    </div>
  )
}

export default TestLandingPage