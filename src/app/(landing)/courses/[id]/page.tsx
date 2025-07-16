import React from 'react';
import { coursesService } from '@/services/courses.service';
import CourseDetail from '@/components/courses/CourseDetail/CourseDetail';



export default async function CourseDetailPage({ params }: { params?: Promise<{ id: string }> }) {
  const resolvedParams = params ? await params : undefined;
  const courseDetail = await coursesService.getCourseDetail(resolvedParams?.id || '');
  return (
    <div>
      <CourseDetail courseDetail={courseDetail.value} />
    </div>
  )
}
