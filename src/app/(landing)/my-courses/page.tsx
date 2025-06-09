import Link from 'next/link'

const MyCourcesPage = () => {
  return (
    <div>MyCourcesPage
      <h1>My Courses</h1>
      <p>Welcome to your courses page. Here you can find all the courses you are enrolled in.</p>
      {/* Add more content or components related to courses here */}
      <Link style={{ textDecoration: 'none', color: 'blue' }} href="/my-tests">Test</Link>
    </div>
  )
}

export default MyCourcesPage