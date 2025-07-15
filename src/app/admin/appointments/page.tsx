'use client'
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

interface Appointment {
  id: number;
  user: {
    image: string;
    name: string;
    email: string;
  };
  service: string;
  date: string;
  time: string;
  status: "Chờ xác nhận" | "Đã xác nhận" | "Đã hủy" | "Hoàn thành";
  notes?: string;
}

// Sample data - replace with actual data from your API
const appointmentsData: Appointment[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
    },
    service: "Tư vấn xét nghiệm HIV",
    date: "2024-03-20",
    time: "10:00",
    status: "Đã xác nhận",
    notes: "Tư vấn trước xét nghiệm",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Trần Thị B",
      email: "tranthib@example.com",
    },
    service: "Tư vấn sau xét nghiệm",
    date: "2024-03-20",
    time: "14:30",
    status: "Chờ xác nhận",
    notes: "Tư vấn kết quả xét nghiệm",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-19.jpg",
      name: "Lê Văn C",
      email: "levanc@example.com",
    },
    service: "Tư vấn điều trị",
    date: "2024-03-21",
    time: "11:15",
    status: "Hoàn thành",
    notes: "Tư vấn về phác đồ điều trị",
  },
];

export default function AppointmentsPage() {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedAppointmentId, setSelectedAppointmentId] = React.useState<number | null>(null);

  const handleAssignStaff = (appointmentId: number) => {
    setSelectedAppointmentId(appointmentId);
    openModal();
  };

  const handleSave = () => {
    // TODO: Implement API call to assign staff
    console.log("Assigning staff to appointment:", selectedAppointmentId);
    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý lịch hẹn tư vấn</h1>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Khách hàng
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Dịch vụ tư vấn
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Ngày & Giờ
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Ghi chú
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {appointmentsData.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <Image
                            width={40}
                            height={40}
                            src={appointment.user.image}
                            alt={appointment.user.name}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {appointment.user.name}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {appointment.user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {appointment.service}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div>
                        <span className="block">{appointment.date}</span>
                        <span className="block text-gray-500">{appointment.time}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          appointment.status === "Đã xác nhận"
                            ? "success"
                            : appointment.status === "Chờ xác nhận"
                            ? "warning"
                            : appointment.status === "Hoàn thành"
                            ? "info"
                            : "error"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {appointment.notes || "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAssignStaff(appointment.id)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Nhân Viên
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Staff Assignment Modal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <div>
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
            Gán Nhân Viên
          </h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5">
            <div className="col-span-1">
              <Label>Tên Nhân Viên</Label>
              <Input type="text" placeholder="Nhập tên nhân viên" />
            </div>

            <div className="col-span-1">
              <Label>Chức Vụ</Label>
              <Input type="text" placeholder="Nhập chức vụ" />
            </div>

            <div className="col-span-1">
              <Label>Ghi Chú</Label>
              <Input type="text" placeholder="Nhập ghi chú (nếu có)" />
            </div>
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Hủy
            </Button>
            <Button size="sm" onClick={handleSave}>
              Xác Nhận
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 