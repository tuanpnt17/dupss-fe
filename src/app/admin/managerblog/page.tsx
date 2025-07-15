import CreateBlog from '@/components/blogs/CreateBlog';

export default function AdminBlogsPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Quản lý Blog</h1>
      <CreateBlog />
    </div>
  );
}
