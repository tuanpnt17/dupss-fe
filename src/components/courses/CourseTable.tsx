'use client'
// src/components/tables/CourseTable.tsx
import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EyeIcon } from "@/icons";
import Button from "@mui/material/Button";

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

  const handleRowClick = (courseId: number) => {
    router.push(`/admin/courses/${courseId}`);
  };

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
              {coursesData.map((course) => (
                <TableRow 
                  key={course.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <TableCell
                    className="px-5 py-3 text-gray-800 text-start text-theme-sm font-medium dark:text-white/90">
                    {course.title}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.category}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={course.instructor.image}
                          alt={course.instructor.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {course.instructor.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {course.instructor.specialization}
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
                        course.status === "Active"
                          ? "success"
                          : course.status === "Enrolling"
                            ? "warning"
                            : course.status === "Coming Soon"
                              ? "info"
                              : "primary"
                      }
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 flex items-center gap-2 w-full h-full">
                    <Button variant="contained" color="success">
                      Approved
                    </Button>
                    <Button variant="contained" color="error">
                      Rejected
                    </Button>
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