import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

// Mock data for demonstration
const appointments = [
  {
    id: 1,
    date: "2024-05-01",
    time: "09:00",
    counselor: "Nguyễn Văn A",
    status: "Hoàn thành",
    location: "Phòng Tư Vấn 1",
  },
  {
    id: 2,
    date: "2024-05-15",
    time: "14:00",
    counselor: "Trần Thị B",
    status: "Đã hủy",
    location: "Phòng Tư Vấn 2",
  },
  {
    id: 3,
    date: "2024-06-10",
    time: "10:30",
    counselor: "Lê Văn C",
    status: "Sắp tới",
    location: "Phòng Tư Vấn 1",
  },
];

export default function AppointmentsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-orange-600 text-center">Lịch sử các cuộc hẹn tư vấn HIV</h1>
      <p className="mb-8 text-gray-700 text-center">
        Dưới đây là danh sách các cuộc hẹn tư vấn HIV của bạn. Vui lòng đến đúng giờ và liên hệ với chúng tôi nếu cần thay đổi lịch hẹn.
      </p>
      <div className="overflow-x-auto rounded-lg shadow w-full flex justify-center">
        <Table className="min-w-full bg-white">
          <TableHeader>
            <TableRow>
              <TableCell isHeader className="px-4 py-2">Ngày</TableCell>
              <TableCell isHeader className="px-4 py-2">Giờ</TableCell>
              <TableCell isHeader className="px-4 py-2">Chuyên gia tư vấn</TableCell>
              <TableCell isHeader className="px-4 py-2">Địa điểm</TableCell>
              <TableCell isHeader className="px-4 py-2">Trạng thái</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell className="px-4 py-2 text-center">{appt.date}</TableCell>
                <TableCell className="px-4 py-2 text-center">{appt.time}</TableCell>
                <TableCell className="px-4 py-2">{appt.counselor}</TableCell>
                <TableCell className="px-4 py-2 text-center">{appt.location}</TableCell>
                <TableCell className="px-4 py-2 text-center">{appt.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
