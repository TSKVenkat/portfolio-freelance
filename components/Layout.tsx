import Header from './Header';
import SEO from './SEO';
import SocialDock from './SocialDock';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        whatsapp?: string;
        [key: string]: string | undefined;
    };
}

export default function Layout({ 
    children, 
    title = 'My Portfolio',
    description,
    keywords,
    ogImage,
    socialLinks = {} 
}: LayoutProps) {
    const router = useRouter();
    const [hasSocialLinks, setHasSocialLinks] = useState(false);
    
    // Check if there are any valid social links
    useEffect(() => {
        const hasLinks = Object.values(socialLinks).some(link => link && link.trim() !== '');
        setHasSocialLinks(hasLinks);
    }, [socialLinks]);

    return (
        <>
            <SEO 
                title={title}
                description={description}
                keywords={keywords}
                ogImage={ogImage}
                ogUrl={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${router.asPath}`}
            />
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 pt-20 pb-10">
                    {children}
                </main>
                <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-auto">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-gray-700 dark:text-gray-300">
                            &copy; {new Date().getFullYear()} | {title}
                        </p>
                    </div>
                </footer>
                
                {hasSocialLinks && <SocialDock links={socialLinks} />}
            </div>
        </>
    );
}