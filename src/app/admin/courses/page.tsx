import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import CourseTable from "@/components/courses/CourseTable";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";


const AdminCoursesPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="New Courses List" />
      <div className="flex mb-4">
        <Button variant="contained" color="primary" component={Link} href="/admin/courses/add">
          Add Course
        </Button>
      </div>
      <CourseTable />
    </div>
  );
};

export default AdminCoursesPage;