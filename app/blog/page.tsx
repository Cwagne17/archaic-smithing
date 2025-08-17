'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { iBlog } from '@/types/iBlog';
import { getDataClient } from '@/lib/dataClient';
import { Card, CardContent, Badge, EmptyState, Skeleton } from '@/components/ui';
import { formatDate } from '@/lib/utils';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<iBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const dataClient = getDataClient();
        const blogList = await dataClient.listBlogs();
        // Only show published blogs
        setBlogs(blogList.filter(blog => blog.published));
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-32 mx-auto mb-4" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
          
          <div className="space-y-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Stories, insights, and behind-the-scenes looks at the craft
          </p>
        </div>
        
        {blogs.length > 0 ? (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <Card key={blog.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <article>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Link href={`/blog/${blog.slug}`}>
                          <h2 className="text-xl font-semibold hover:text-accent transition-colors mb-2">
                            {blog.title}
                          </h2>
                        </Link>
                        <p className="text-muted-foreground mb-4">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(blog.createdAt)}
                        </span>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {blog.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No blog posts yet"
            description="Check back soon for stories and insights from the workshop."
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          />
        )}
      </div>
    </div>
  );
}
