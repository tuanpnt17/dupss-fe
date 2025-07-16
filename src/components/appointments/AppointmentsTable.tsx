"use client";
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import DatePicker from "@/components/form/date-picker";
import useAuthStore from "@/stores/useAuthStore";
import { bookingsService } from "@/services/bookings.service";
import { formatTime } from "@/utils/formatDateTime";

function formatUtcTimeToVN(timeStr: string) {
  if (!timeStr) return "--:--";
  const [h, m, s] = timeStr.split(":");
  const now = new Date();
  const utcDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), Number(h), Number(m), Number(s) || 0));
  return utcDate.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

const statusColor = (status: string) => {
  switch (status) {
    case "Hoàn thành":
      return "bg-green-100 text-green-700";
    case "Đã hủy":
      return "bg-red-100 text-red-600";
    case "Đã duyệt":
      return "bg-blue-100 text-blue-700";
    case "Đang chờ":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ dateTime: '', note: '' });
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ dateTime: '', note: '' });
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    bookingsService.getBookings(accessToken).then((res) => {
      const arr = Array.isArray(res.value) ? res.value : [];
      const data = arr.map((item: any) => ({
        id: item.id,
        date: item.bookingDate ? item.bookingDate.slice(0, 10) : "",
        bookingDate: item.bookingDate || "", // fallback rỗng nếu không có
        note: item.bookingNote || "",
        counselor: item.staffName || "",
        status: convertStatus(item.bookingStatus),
        location: item.meetingUrl || "",
      }));
      setAppointments(data);
      setLoading(false);
    });
  }, [accessToken]);

  function convertStatus(status: any) {
    switch (status) {
      case "Pending":
        return "Đang chờ";
      case "Approved":
        return "Đã duyệt";
      case "Completed":
        return "Hoàn thành";
      case "Cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  }

  const handleEdit = (appt: any) => {
    setEditData(appt);
    // Gộp date và time thành dateTime dạng 'YYYY-MM-DD HH:mm'
    const dateTime = appt.date && appt.time ? `${appt.date} ${appt.time}` : '';
    setEditForm({ dateTime, note: appt.note || '' });
    setEditOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates[0]) {
      const dateObj = selectedDates[0];
      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
      const dd = String(dateObj.getDate()).padStart(2, '0');
      setEditForm((prev) => ({ ...prev, date: `${yyyy}-${mm}-${dd}` }));
    }
  };

  const handleSave = () => {
    // TODO: Gọi API cập nhật lịch hẹn ở đây
    console.log('Lưu lịch hẹn:', { ...editData, ...editForm });
    setEditOpen(false);
  };

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gọi API tạo mới ở đây
    setCreateOpen(false);
    setCreateForm({ dateTime: '', note: '' });
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow">
      {/* Nút tạo mới */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-orange-600 transition"
          onClick={() => setCreateOpen(true)}
        >
          Tạo cuộc hẹn mới
        </button>
      </div>
      <Table className="w-full min-w-[900px] bg-white border border-gray-200">
        <TableHeader>
          <TableRow className="bg-orange-50">
            <TableCell isHeader className="px-4 py-3 text-orange-700 font-bold text-center border-b border-orange-200">Ngày & Giờ</TableCell>
            {/* Xóa cột Giờ cũ */}
            <TableCell isHeader className="px-4 py-3 text-orange-700 font-bold text-center border-b border-orange-200">Ghi chú</TableCell>
            <TableCell isHeader className="px-4 py-3 text-orange-700 font-bold text-center border-b border-orange-200">Chuyên gia tư vấn</TableCell>
            <TableCell isHeader className="px-4 py-3 text-orange-700 font-bold text-center border-b border-orange-200">Địa chỉ tư vấn online</TableCell>
            <TableCell isHeader className="px-4 py-3 text-orange-700 font-bold text-center border-b border-orange-200">Trạng thái</TableCell>
            <TableCell isHeader className="px-4 py-3 text-orange-700 font-bold text-center border-b border-orange-200">Hành động</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appt) => (
            <TableRow key={appt.id} className="hover:bg-orange-50 transition">
              <TableCell className="px-4 py-3 text-center border-b border-gray-100">
                {/* Hiển thị ngày & giờ gộp */}
                {appt.bookingDate
                  ? new Date(appt.bookingDate).toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
                  : appt.dateTime
                    ? appt.dateTime
                    : '--'}
              </TableCell>
              {/* Xóa cột Giờ cũ */}
              <TableCell className="px-4 py-3 text-center border-b border-gray-100 italic text-gray-600">{appt.note ? <span>{appt.note}</span> : <span className="text-gray-300">(Không có)</span>}</TableCell>
              <TableCell className="px-4 py-3 text-center border-b border-gray-100">{appt.counselor}</TableCell>
              <TableCell className="px-4 py-3 text-center border-b border-gray-100">{appt.location}</TableCell>
              <TableCell className="px-4 py-3 text-center border-b border-gray-100">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(appt.status)}`}>{appt.status}</span>
              </TableCell>
              <TableCell className="px-4 py-3 text-center border-b border-gray-100">
                <button className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold hover:bg-orange-200 transition-colors mr-2 shadow-sm border border-orange-200 text-sm" onClick={() => handleEdit(appt)}>
                  Chỉnh sửa
                </button>
                <button className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold hover:bg-red-200 transition-colors shadow-sm border border-red-200 text-sm">
                  Hủy lịch
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-orange-600 border-b border-orange-100 pb-2">Chỉnh sửa lịch hẹn</h2>
          <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <div className="mb-4">
              <DatePicker
                key={editForm.dateTime}
                id="edit-date-time"
                label="Ngày & Giờ"
                mode="single"
                defaultDate={editForm.dateTime ? new Date(editForm.dateTime.replace(' ', 'T')) : undefined}
                onChange={(dates) => {
                  if (dates[0]) {
                    const d = dates[0];
                    const yyyy = d.getFullYear();
                    const mm = String(d.getMonth() + 1).padStart(2, '0');
                    const dd = String(d.getDate()).padStart(2, '0');
                    const hh = String(d.getHours()).padStart(2, '0');
                    const mi = String(d.getMinutes()).padStart(2, '0');
                    setEditForm((prev) => ({ ...prev, dateTime: `${yyyy}-${mm}-${dd} ${hh}:${mi}` }));
                  }
                }}
                placeholder="Chọn ngày & giờ"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-medium text-gray-700">Ghi chú</label>
              <textarea
                name="note"
                value={editForm.note}
                onChange={handleEditChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditOpen(false)} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold">Hủy</button>
              <button type="submit" className="px-4 py-2 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow">Lưu</button>
            </div>
          </form>
        </div>
      </Modal>
      {/* Modal tạo mới */}
      {createOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500" onClick={() => setCreateOpen(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-orange-600">Tạo cuộc hẹn mới</h2>
            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div>
                <DatePicker
                  key={createForm.dateTime}
                  id="create-date-time"
                  label="Ngày & Giờ"
                  mode="single"
                  defaultDate={createForm.dateTime ? new Date(createForm.dateTime.replace(' ', 'T')) : undefined}
                  onChange={(dates) => {
                    if (dates[0]) {
                      const d = dates[0];
                      const yyyy = d.getFullYear();
                      const mm = String(d.getMonth() + 1).padStart(2, '0');
                      const dd = String(d.getDate()).padStart(2, '0');
                      const hh = String(d.getHours()).padStart(2, '0');
                      const mi = String(d.getMinutes()).padStart(2, '0');
                      setCreateForm((prev) => ({ ...prev, dateTime: `${yyyy}-${mm}-${dd} ${hh}:${mi}` }));
                    }
                  }}
                  placeholder="Chọn ngày & giờ"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Ghi chú</label>
                <textarea
                  name="note"
                  value={createForm.note}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-200"
                  rows={3}
                  placeholder="Nhập ghi chú (nếu có)"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button type="button" className="px-6 py-2 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200" onClick={() => setCreateOpen(false)}>Hủy</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600">Tạo mới</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable; 