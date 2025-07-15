import ManageWorkshops from '@/components/workshops/ManageWorkshops';

export default function AdminWorkshopsPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Quản lý Workshop</h1>
      <ManageWorkshops />
    </div>
  );
}