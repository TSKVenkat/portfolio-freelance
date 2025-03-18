export interface Blog {
    _id?: string;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    slug: string;
    excerpt: string;
}

export interface User {
    email: string;
    isAdmin: boolean;
}