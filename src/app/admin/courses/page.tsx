import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import CourseTable from "@/components/courses/CourseTable";

const AdminCoursesPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="New Courses List" />
      <CourseTable />
    </div>
  );
};

export default AdminCoursesPage;