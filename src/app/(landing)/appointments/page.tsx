import React from "react";
import AppointmentsTable from "@/components/appointments/AppointmentsTable";

export default function AppointmentsPage() {
  return (
    <div className="w-3/4 mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-600 text-center">Lịch sử các cuộc hẹn tư vấn HIV</h1>
      <p className="mb-8 text-gray-700 text-center">
        Dưới đây là danh sách các cuộc hẹn tư vấn HIV của bạn. Vui lòng đến đúng giờ và liên hệ với chúng tôi nếu cần thay đổi lịch hẹn.
      </p>
      <AppointmentsTable />
    </div>
  );
}
