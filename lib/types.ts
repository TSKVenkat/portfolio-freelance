export interface Blog {
    _id?: string;
    title: string;
    content: string;
    coverImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
    slug: string;
    excerpt: string;
    tags: string[];
    published: boolean;
    featured: boolean;
    viewCount: number;
    readingTime?: number; // in minutes
}

export interface User {
    email: string;
    isAdmin: boolean;
}

export interface SocialLinks {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
    [key: string]: string | undefined;
}