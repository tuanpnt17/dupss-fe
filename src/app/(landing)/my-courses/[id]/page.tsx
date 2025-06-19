'use client'
import useBearStore from "@/stores/useBearStore"

interface IProps {
  params: {
    id: string
  }
}

const CourseDetail = ({ params }: IProps) => {
  const bearStore = useBearStore()

  return (
    <div>CourseDetail:
      <h1>Course Detail Page</h1>
      <p>Welcome to the course detail page for course ID: {params.id}</p>
      <p>Current Bear Count: {bearStore.bears}</p>
      <button onClick={() => bearStore.increase(1)}>Increase Bear Count</button>
      <button onClick={() => bearStore.decrease(1)}>Decrease Bear Count</button>
    </div>
  )
}

export default CourseDetail