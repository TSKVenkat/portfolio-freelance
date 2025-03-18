import Head from 'next/head';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function Layout({ children, title = 'My Portfolio' }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="My portfolio website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto p-4">
                    {children}
                </main>
                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; {new Date().getFullYear()} My Portfolio</p>
                </footer>
            </div>
        </>
    );
}