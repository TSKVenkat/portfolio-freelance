// components/AdminLayout.tsx
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = 'Admin Panel' }: AdminLayoutProps) {
    const router = useRouter();

    return (
        <Layout title={title}>
            <ProtectedRoute>
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row">
                        <aside className="w-full md:w-64 bg-gray-100 p-4 mb-4 md:mb-0 md:mr-4 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
                            <nav className="flex flex-col space-y-2">
                                <Link 
                                    href="/admin" 
                                    className={router.pathname === '/admin' ? 'font-bold text-blue-600' : ''}
                                >
                                    Dashboard
                                </Link>
                                <Link 
                                    href="/admin/blogs" 
                                    className={router.pathname.startsWith('/admin/blogs') ? 'font-bold text-blue-600' : ''}
                                >
                                    Manage Blogs
                                </Link>
                            </nav>
                        </aside>
                        <div className="flex-grow bg-white p-4 rounded-lg shadow">
                            {children}
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        </Layout>
    );
}