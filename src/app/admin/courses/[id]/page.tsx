'use client'
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import Link from "next/link";
import CourseContentSection from "@/components/courses/CourseContentSection";

interface CourseStep {
  id: number;
  title: string;
  previewUrl?: string;
  duration: string;
}

interface CourseSection {
  id: number;
  title: string;
  steps: CourseStep[];
  totalDuration: string;
}

interface CourseDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: {
    image: string;
    name: string;
    specialization: string;
    bio: string;
  };
  participants: number;
  duration: string;
  status: string;
  objectives: string[];
  targetAudience: string[];
  enrollmentRequirements: string[];
  schedule: string;
  location: string;
  maxParticipants: number;
  price: string;
  startDate: string;
  endDate: string;
  sections: CourseSection[];
}

// Sample detailed course data
const courseDetails: Record<number, CourseDetail> = {
  1: {
    id: 1,
    title: "HIV Support Group Facilitation",
    description: "This comprehensive course provides training for individuals who want to facilitate support groups for people living with HIV. Participants will learn evidence-based facilitation techniques, group dynamics, and how to create safe, supportive environments for vulnerable populations.",
    category: "Support Group",
    instructor: {
      image: "/images/user/user-17.jpg",
      name: "Dr. Sarah Chen",
      specialization: "HIV Counseling",
      bio: "Dr. Sarah Chen is a licensed clinical psychologist with over 15 years of experience in HIV counseling and support group facilitation. She has worked with various community organizations and has published numerous papers on effective support group methodologies."
    },
    participants: 15,
    maxParticipants: 20,
    duration: "8 weeks",
    status: "Active",
    objectives: [
      "Understand the unique needs of individuals living with HIV",
      "Learn effective facilitation techniques for support groups",
      "Develop skills in managing group dynamics and conflicts",
      "Create safe and inclusive environments for participants",
      "Implement evidence-based interventions and activities"
    ],
    targetAudience: [
      "Community health workers",
      "Social workers and counselors",
      "Healthcare professionals",
      "Volunteers in HIV/AIDS organizations",
      "Individuals interested in peer support"
    ],
    enrollmentRequirements: [
      "High school diploma or equivalent",
      "Basic understanding of HIV/AIDS",
      "Commitment to attend all sessions",
      "Background check clearance",
      "Letter of recommendation from a professional reference"
    ],
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
    location: "Community Health Center, Room 205",
    price: "Free (Sponsored by Health Department)",
    startDate: "March 15, 2024",
    endDate: "May 9, 2024",
    sections: [
      {
        id: 1,
        title: "Chào mừng đến với khoá học Automation với n8n",
        totalDuration: "1 phút",
        steps: [
          { id: 1, title: "Giới thiệu về khoá học", previewUrl: "#", duration: "00:36" }
        ]
      },
      {
        id: 2,
        title: "Giới thiệu về Automation, AI và n8n",
        totalDuration: "21 phút",
        steps: [
          { id: 1, title: "Chào mừng đến với Chương 1", previewUrl: "#", duration: "00:33" },
          { id: 2, title: "Tìm hiểu về Automation", previewUrl: "#", duration: "06:09" },
          { id: 3, title: "Tìm hiểu về AI và kết hợp AI với Automation", previewUrl: "#", duration: "04:18" },
          { id: 4, title: "Giới thiệu về Low-Code, No-Code", previewUrl: "#", duration: "04:05" },
          { id: 5, title: "Giới thiệu sơ bộ về n8n", previewUrl: "#", duration: "05:48" },
          { id: 6, title: "Tổng kết Chương 1", duration: "00:22" }
        ]
      },
      {
        id: 3,
        title: "Tạo tài khoản, cài đặt n8n",
        totalDuration: "38 phút",
        steps: [
          { id: 1, title: "Hướng dẫn tạo tài khoản n8n", duration: "05:00" },
          { id: 2, title: "Cài đặt n8n trên Windows", duration: "07:00" },
          { id: 3, title: "Cài đặt n8n trên MacOS", duration: "06:00" },
          { id: 4, title: "Cài đặt n8n trên Linux", duration: "08:00" },
          { id: 5, title: "Cấu hình cơ bản cho n8n", duration: "12:00" }
        ]
      }
    ]
  },
  2: {
    id: 2,
    title: "Addiction Recovery Basics",
    description: "A foundational course designed to provide participants with essential knowledge and skills for supporting individuals in addiction recovery. This course covers the science of addiction, recovery models, and practical intervention strategies.",
    category: "Recovery",
    instructor: {
      image: "/images/user/user-18.jpg",
      name: "Michael Rodriguez",
      specialization: "Addiction Specialist",
      bio: "Michael Rodriguez is a certified addiction counselor with 12 years of experience in substance abuse treatment. He has worked in both inpatient and outpatient settings and specializes in evidence-based recovery approaches."
    },
    participants: 12,
    maxParticipants: 15,
    duration: "12 weeks",
    status: "Enrolling",
    objectives: [
      "Understand the neurobiology of addiction",
      "Learn various recovery models and approaches",
      "Develop skills in crisis intervention",
      "Master relapse prevention strategies",
      "Understand the role of family in recovery"
    ],
    targetAudience: [
      "Addiction counselors",
      "Mental health professionals",
      "Family members of individuals in recovery",
      "Peer support specialists",
      "Healthcare providers"
    ],
    enrollmentRequirements: [
      "Bachelor's degree in related field or equivalent experience",
      "Understanding of basic psychology concepts",
      "Professional liability insurance",
      "Completion of ethics training",
      "Interview with course instructor"
    ],
    schedule: "Mondays and Wednesdays, 7:00 PM - 9:00 PM",
    location: "Recovery Center, Conference Room A",
    price: "$450 (Payment plans available)",
    startDate: "April 1, 2024",
    endDate: "June 24, 2024",
    sections: []
  },
  3: {
    id: 3,
    title: "Peer Counseling Workshop",
    description: "This intensive workshop focuses on developing peer counseling skills for individuals who want to support others through shared experiences. Participants will learn active listening, empathy building, and boundary setting techniques.",
    category: "Counseling",
    instructor: {
      image: "/images/user/user-20.jpg",
      name: "Jamie Wilson",
      specialization: "Peer Support",
      bio: "Jamie Wilson is a certified peer support specialist with extensive experience in community mental health. She has trained over 200 peer counselors and has developed several peer support programs."
    },
    participants: 20,
    maxParticipants: 25,
    duration: "4 weeks",
    status: "Active",
    objectives: [
      "Master active listening and communication skills",
      "Develop empathy and emotional intelligence",
      "Learn boundary setting and self-care techniques",
      "Understand the peer support model",
      "Practice crisis intervention skills"
    ],
    targetAudience: [
      "Individuals in recovery",
      "Mental health advocates",
      "Community volunteers",
      "Healthcare workers",
      "Anyone interested in helping others"
    ],
    enrollmentRequirements: [
      "Personal experience with mental health or addiction recovery",
      "Stable recovery for at least 1 year",
      "Letter of recommendation",
      "Commitment to confidentiality",
      "Willingness to share personal experiences appropriately"
    ],
    schedule: "Saturdays, 10:00 AM - 2:00 PM",
    location: "Community Center, Training Room",
    price: "$200 (Scholarships available)",
    startDate: "March 30, 2024",
    endDate: "April 20, 2024",
    sections: []
  },
  4: {
    id: 4,
    title: "Harm Reduction Strategies",
    description: "This course provides comprehensive training in harm reduction principles and practices. Participants will learn evidence-based strategies to reduce the negative consequences of drug use and other risky behaviors.",
    category: "Harm Reduction",
    instructor: {
      image: "/images/user/user-21.jpg",
      name: "Dr. Aisha Johnson",
      specialization: "Public Health",
      bio: "Dr. Aisha Johnson is a public health researcher with expertise in harm reduction and substance use policy. She has worked with international organizations and has published extensively on harm reduction strategies."
    },
    participants: 18,
    maxParticipants: 20,
    duration: "6 weeks",
    status: "Coming Soon",
    objectives: [
      "Understand harm reduction principles and philosophy",
      "Learn evidence-based harm reduction strategies",
      "Develop skills in overdose prevention and response",
      "Understand the role of stigma in public health",
      "Master community outreach and education techniques"
    ],
    targetAudience: [
      "Public health workers",
      "Healthcare providers",
      "Community outreach workers",
      "Policy makers",
      "Social workers"
    ],
    enrollmentRequirements: [
      "Background in healthcare or social services",
      "Understanding of substance use issues",
      "Commitment to non-judgmental approach",
      "Professional references",
      "Completion of prerequisite reading"
    ],
    schedule: "Thursdays, 5:30 PM - 8:30 PM",
    location: "Public Health Department, Training Center",
    price: "$300 (Government employees: $150)",
    startDate: "May 1, 2024",
    endDate: "June 12, 2024",
    sections: []
  },
  5: {
    id: 5,
    title: "Stigma & Discrimination Workshop",
    description: "This workshop addresses the critical issue of stigma and discrimination faced by individuals with HIV/AIDS and substance use disorders. Participants will learn strategies to combat stigma and promote inclusion.",
    category: "Advocacy",
    instructor: {
      image: "/images/user/user-19.jpg",
      name: "Carlos Mendez",
      specialization: "Community Advocate",
      bio: "Carlos Mendez is a community advocate with over 20 years of experience fighting stigma and discrimination. He has worked with numerous organizations to promote understanding and acceptance."
    },
    participants: 25,
    maxParticipants: 30,
    duration: "3 weeks",
    status: "Active",
    objectives: [
      "Understand the impact of stigma on health outcomes",
      "Learn strategies to combat discrimination",
      "Develop advocacy and education skills",
      "Create inclusive environments",
      "Build community support networks"
    ],
    targetAudience: [
      "Community advocates",
      "Healthcare providers",
      "Educators and trainers",
      "Policy makers",
      "Anyone interested in social justice"
    ],
    enrollmentRequirements: [
      "Interest in social justice and advocacy",
      "Openness to learning about diverse experiences",
      "Commitment to promoting inclusion",
      "Basic understanding of social issues",
      "Willingness to participate in discussions"
    ],
    schedule: "Fridays, 6:00 PM - 9:00 PM",
    location: "Community Center, Auditorium",
    price: "Free (Donations accepted)",
    startDate: "March 22, 2024",
    endDate: "April 12, 2024",
    sections: []
  }
};

interface CourseDetailPageProps {
  params: {
    id: string;
  };
}


const CourseDetailPage = ({ params }: CourseDetailPageProps) => {
  const courseId = parseInt(params.id);
  const course = courseDetails[courseId];

  if (!course) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Course Not Found" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Course not found. Please check the course ID and try again.
          </p>
          <div className="mt-4 text-center">
            <Link 
              href="/admin/courses"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageBreadcrumb pageTitle={course.title} />
        <Link 
          href="/admin/courses"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
        >
          ← Back to Courses
        </Link>
      </div>
      <div className="space-y-5 sm:space-y-6">
        {/* Nội dung khóa học - giống Udemy */}
        <CourseContentSection sections={course.sections} />
        {/* Course Overview Card */}
        <ComponentCard title="Course Overview">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {course.description}
              </p>
              <div className="flex items-center gap-2 mb-4">
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
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {course.category}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <Image
                    width={48}
                    height={48}
                    src={course.instructor.image}
                    alt={course.instructor.name}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white/90">
                    {course.instructor.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {course.instructor.specialization}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                  <p className="font-medium text-gray-800 dark:text-white/90">{course.duration}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Participants:</span>
                  <p className="font-medium text-gray-800 dark:text-white/90">{course.participants}/{course.maxParticipants}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Price:</span>
                  <p className="font-medium text-gray-800 dark:text-white/90">{course.price}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Location:</span>
                  <p className="font-medium text-gray-800 dark:text-white/90">{course.location}</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Instructor Information */}
        <ComponentCard title="Instructor Information">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 overflow-hidden rounded-full flex-shrink-0">
              <Image
                width={64}
                height={64}
                src={course.instructor.image}
                alt={course.instructor.name}
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                {course.instructor.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {course.instructor.specialization}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {course.instructor.bio}
              </p>
            </div>
          </div>
        </ComponentCard>

        {/* Course Objectives */}
        <ComponentCard title="Learning Objectives">
          <ul className="space-y-2">
            {course.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </li>
            ))}
          </ul>
        </ComponentCard>

        {/* Target Audience */}
        <ComponentCard title="Target Audience">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {course.targetAudience.map((audience, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">{audience}</span>
              </div>
            ))}
          </div>
        </ComponentCard>

        {/* Enrollment Requirements */}
        <ComponentCard title="Enrollment Requirements">
          <ul className="space-y-2">
            {course.enrollmentRequirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
              </li>
            ))}
          </ul>
        </ComponentCard>

        {/* Course Schedule */}
        <ComponentCard title="Course Schedule">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Schedule:</span>
              <p className="font-medium text-gray-800 dark:text-white/90">{course.schedule}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Start Date:</span>
              <p className="font-medium text-gray-800 dark:text-white/90">{course.startDate}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">End Date:</span>
              <p className="font-medium text-gray-800 dark:text-white/90">{course.endDate}</p>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
};

export default CourseDetailPage; 