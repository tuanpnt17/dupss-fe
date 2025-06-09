'use client';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const TestLandingPage = () => {

  const routing = useRouter()

  const handleClick = () => {
    routing.push('/my-courses');
  }

  return (
    <div>
      <h1>Test Landing Page</h1>
      <p>Welcome to the test landing page. Here you can find various tests and quizzes.</p>
      <Button variant="contained" onClick={handleClick}>My course</Button>
    </div>
  )
}

export default TestLandingPage