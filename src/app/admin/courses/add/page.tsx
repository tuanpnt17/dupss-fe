import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddCourseForm from "@/components/courses/AddCourseForm";
import React from "react";

const CoursesAddPage = () => {
    return (
        <div>
            <PageBreadcrumb pageTitle="Add Course" />
            <AddCourseForm />
        </div>
    )
}

export default CoursesAddPage;