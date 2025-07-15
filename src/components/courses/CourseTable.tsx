'use client'
// src/components/tables/CourseTable.tsx
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EyeIcon } from "@/icons";
import Button from "@mui/material/Button";
import { queuingCourseService } from "@/services/queuingCourse.service";
import useAuthStore from "@/stores/useAuthStore";
import { IQueuingCourse } from "@/types/queuingCourse";
import { randomUserImage } from "@/utils/randomUserImage";

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: {
    image: string;
    name: string;
    specialization: string;
  };
  participants: number;
  duration: string;
  status: string;
}

// Sample data for HIV/addiction community activity courses
const coursesData: Course[] = [
  {
    id: 1,
    title: "HIV Support Group Facilitation",
    category: "Support Group",
    instructor: {
      image: "/images/user/user-17.jpg",
      name: "Dr. Sarah Chen",
      specialization: "HIV Counseling"
    },
    participants: 15,
    duration: "8 weeks",
    status: "Active"
  },
  {
    id: 2,
    title: "Addiction Recovery Basics",
    category: "Recovery",
    instructor: {
      image: "/images/user/user-18.jpg",
      name: "Michael Rodriguez",
      specialization: "Addiction Specialist"
    },
    participants: 12,
    duration: "12 weeks",
    status: "Enrolling"
  },
  {
    id: 3,
    title: "Peer Counseling Workshop",
    category: "Counseling",
    instructor: {
      image: "/images/user/user-20.jpg",
      name: "Jamie Wilson",
      specialization: "Peer Support"
    },
    participants: 20,
    duration: "4 weeks",
    status: "Active"
  },
  {
    id: 4,
    title: "Harm Reduction Strategies",
    category: "Harm Reduction",
    instructor: {
      image: "/images/user/user-21.jpg",
      name: "Dr. Aisha Johnson",
      specialization: "Public Health"
    },
    participants: 18,
    duration: "6 weeks",
    status: "Coming Soon"
  },
  {
    id: 5,
    title: "Stigma & Discrimination Workshop",
    category: "Advocacy",
    instructor: {
      image: "/images/user/user-19.jpg",
      name: "Carlos Mendez",
      specialization: "Community Advocate"
    },
    participants: 25,
    duration: "3 weeks",
    status: "Active"
  }
];

export default function CourseTable() {
  const router = useRouter();
  const authStore = useAuthStore();

  const [courses, setCourses] = useState<IQueuingCourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      authStore.restore();
      setIsLoading(true);
      if (!authStore.accessToken) return;

      const res = await queuingCourseService.getQueuingCourses(authStore.accessToken);
      if (res.isSuccess) {
        setCourses(res.value.items);
      } else {
        setError(res.error.message);
      }
      setIsLoading(false);
    };
    fetchCourses();
  }, [authStore.accessToken]);
  

  const handleRowClick = (courseId: string) => {
    router.push(`/admin/courses/${courseId}`);
  };

  const handleApproved = (courseId: string) => {
    console.log(courseId);
  };

  const handleRejected = (courseId: string) => {
    console.log(courseId);
  };

  function handleEdit(courseCode: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Course Code
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Course Title
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Instructor
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Duration
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {courses.map((course) => (
                <TableRow 
                  key={course.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                  onClick={() => handleRowClick(course.id)}
                >
                  <TableCell
                    className="px-5 py-3 text-gray-800 text-start text-theme-sm font-medium dark:text-white/90">
                    {course.courseCode}
                  </TableCell>
                  <TableCell
                    className="px-5 py-3 text-gray-800 text-start text-theme-sm font-medium dark:text-white/90">
                    {course.courseName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.categoryName}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={randomUserImage()}
                          alt={course.instructorName}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {course.instructorName}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {course.duration}
                  </TableCell>  
                  <TableCell className="px-4 py-3">
                    <Badge
                      size="sm"
                      color={
                        course.status === "Approved"
                          ? "success"
                          : course.status === "Rejected"
                            ? "error"
                            : course.status === "Pending"
                              ? "info"
                              : "warning"
                      }
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 flex items-center gap-2 w-full h-full">
                    <Button variant="contained" color="primary" onClick={() => handleRowClick(course.courseCode)}>
                      View
                    </Button>
                    {
                      course.status === "Pending" && authStore.user?.role === "Manager" && (
                        <>
                      <Button variant="contained" color="success" onClick={() => handleApproved(course.courseCode)}>
                      Approved
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleRejected(course.courseCode)}>
                      Rejected
                    </Button>
                        </>
                      )
                    }
                    {
                      course.status === "Reject" && authStore.user?.role === "Staff" && (
                        <Button variant="contained" color="error" onClick={() => handleEdit(course.courseCode)}>
                          Edit
                        </Button>
                      )
                    }
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}