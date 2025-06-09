
interface IProps {
  params: {
    id: string
  }
}

const CourseDetail = ({ params }: IProps) => {
  return (
    <div>CourseDetail: {params.id}</div>
  )
}

export default CourseDetail