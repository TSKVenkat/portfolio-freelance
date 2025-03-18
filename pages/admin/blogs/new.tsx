import AdminLayout from '../../../components/AdminLayout';
import BlogEditor from '../../../components/BlogEditor';

export default function NewBlog() {
  return (
    <AdminLayout title="Create New Blog">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>
      <BlogEditor />
    </AdminLayout>
  );
}