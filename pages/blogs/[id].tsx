import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import dbConnect from '../../lib/db';
import Blog from '../../models/Blog';
import { Blog as BlogType } from '../../lib/types';

interface BlogPageProps {
  blog: BlogType;
}

export default function BlogPage({ blog }: BlogPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={blog.title}>
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="text-gray-500 text-sm mb-6">
          {blog.updatedAt && (
            <p>Last updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
          )}
        </div>
        <div className="prose max-w-none">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  await dbConnect();

  try {
    // Try to find by ID first
    let blog = await Blog.findById(id);

    // If not found, try to find by slug
    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog: JSON.parse(JSON.stringify(blog)),
      },
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return {
      notFound: true,
    };
  }
};
