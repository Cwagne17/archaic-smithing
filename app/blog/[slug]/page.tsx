'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { iBlog } from '@/types/iBlog';
import { getDataClient } from '@/lib/dataClient';
import { Badge, Button, Skeleton } from '@/components/ui';
import { formatDate } from '@/lib/utils';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<iBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const dataClient = getDataClient();
        const blogPost = await dataClient.getBlog(params.slug as string);
        
        if (!blogPost || !blogPost.published) {
          setNotFound(true);
        } else {
          setBlog(blogPost);
        }
      } catch (error) {
        console.error('Error loading blog:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      loadBlog();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-32 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button onClick={() => router.push('/blog')}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <article>
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-4">
                <span>Published {formatDate(blog.createdAt)}</span>
                {blog.updatedAt !== blog.createdAt && (
                  <span>Updated {formatDate(blog.updatedAt)}</span>
                )}
              </div>
            </div>
            
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <p className="text-lg text-muted-foreground italic border-l-4 border-accent pl-4">
              {blog.excerpt}
            </p>
          </header>
          
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-a:text-accent hover:prose-a:text-accent/80"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          {/* Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => router.push('/blog')}>
                ← Back to Blog
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p>Questions about this post?</p>
                <Button variant="ghost" size="sm" onClick={() => router.push('/requests')}>
                  Get in touch →
                </Button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
