export interface IQueuingCourse {
    id: string
    courseName: string
    courseCode: string
    categoryName: string
    duration: string
    status: string
    instructorName: string
}

export interface ICreateQueuingCourse {
    courseName: string
    courseCode: string
    description: string
    pictureUrl: string
    summary: string
    content: string
    price: number
    oldPrice: number
    attachmentUrl: string
    categoryId: string
    queuingCourseSections: QueuingCourseSection[]
  }
  
  export interface QueuingCourseSection {
    sectionNumber: number
    sectionName: string
    steps: Step[]
  }
  
  export interface Step {
    stepNumber: number
    stepSummary: string
    content: string
    attachment: string
    duration: number
    type: boolean
    videoURL: string
  }