'use client';

import React, { useState, useEffect } from 'react';
import { iBlog } from '@/types/iBlog';
import { getDataClient } from '@/lib/dataClient';
import { useToast } from '@/components/ui/Toast';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button, 
  Input,
  TextArea,
  Modal, 
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  EmptyState,
  Skeleton
} from '@/components/ui';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { formatDateTime } from '@/lib/utils';

const BlogManager: React.FC = () => {
  const [blogs, setBlogs] = useState<iBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<iBlog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    published: false,
    tags: [] as string[],
  });
  
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const dataClient = getDataClient();
      const blogList = await dataClient.listBlogs();
      setBlogs(blogList);
    } catch (error) {
      console.error('Error loading blogs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load blogs',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      published: false,
      tags: [],
    });
    setTagInput('');
    setErrors({});
    setEditingBlog(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowEditor(true);
  };

  const openEditModal = (blog: iBlog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      published: blog.published,
      tags: blog.tags || [],
    });
    setTagInput((blog.tags || []).join(', '));
    setEditingBlog(blog);
    setShowEditor(true);
  };

  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
    }));
    
    if (errors.content) {
      setErrors(prev => ({
        ...prev,
        content: '',
      }));
    }
  };

  const parseTags = (input: string): string[] => {
    return input
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const dataClient = getDataClient();
      const blogData = {
        ...formData,
        tags: parseTags(tagInput),
      };

      if (editingBlog) {
        const updatedBlog = await dataClient.updateBlog(editingBlog.id, blogData);
        setBlogs(prev => prev.map(blog => 
          blog.id === editingBlog.id ? updatedBlog : blog
        ));
        toast({
          title: 'Success',
          description: 'Blog updated successfully',
          variant: 'success',
        });
      } else {
        const newBlog = await dataClient.createBlog(blogData);
        setBlogs(prev => [newBlog, ...prev]);
        toast({
          title: 'Success',
          description: 'Blog created successfully',
          variant: 'success',
        });
      }

      setShowEditor(false);
      resetForm();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast({
        title: 'Error',
        description: 'Failed to save blog',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const dataClient = getDataClient();
      await dataClient.deleteBlog(blogId);
      setBlogs(prev => prev.filter(blog => blog.id !== blogId));
      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete blog',
        variant: 'error',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-4" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage your blog posts</p>
        </div>
        <Button onClick={openCreateModal}>
          Create New Post
        </Button>
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold line-clamp-2">{blog.title}</h3>
                    <Badge variant={blog.published ? 'success' : 'secondary'}>
                      {blog.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{blog.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(blog.createdAt)}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(blog)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No blog posts yet"
          description="Start creating your first blog post to share your thoughts and stories."
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
          action={
            <Button onClick={openCreateModal}>
              Create First Post
            </Button>
          }
        />
      )}

      {/* Editor Modal */}
      <Modal
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        size="xl"
      >
        <ModalHeader onClose={() => setShowEditor(false)}>
          <h3 className="text-lg font-semibold">
            {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h3>
        </ModalHeader>
        
        <ModalBody className="max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter blog post title"
              value={formData.title}
              onChange={handleInputChange('title')}
              error={errors.title}
              required
            />

            <TextArea
              label="Excerpt"
              placeholder="Brief description that appears in previews"
              value={formData.excerpt}
              onChange={handleInputChange('excerpt')}
              rows={3}
              error={errors.excerpt}
              required
            />

            <RichTextEditor
              label="Content"
              value={formData.content}
              onChange={handleContentChange}
              error={errors.content}
              placeholder="Start writing your blog post..."
            />

            <Input
              label="Tags (comma-separated)"
              placeholder="crafting, jewelry, tutorial"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              helperText="Separate multiple tags with commas"
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                className="rounded border-gray-300 text-accent focus:ring-accent"
              />
              <label htmlFor="published" className="text-sm font-medium">
                Publish immediately
              </label>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={() => setShowEditor(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : editingBlog ? 'Update Post' : 'Create Post'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export { BlogManager };
