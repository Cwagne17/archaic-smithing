'use client';

import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = 'image/*,application/pdf',
  multiple = true,
  maxSize = 5 * 1024 * 1024, // 5MB default
  label,
  error,
  helperText,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const validateFiles = (files: File[]): File[] => {
    const validFiles: File[] = [];
    let errorMessage = '';

    for (const file of files) {
      if (file.size > maxSize) {
        errorMessage = `File ${file.name} is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.`;
        break;
      }
      validFiles.push(file);
    }

    if (errorMessage) {
      setUploadError(errorMessage);
      return [];
    }

    setUploadError('');
    return validFiles;
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const validFiles = validateFiles(fileArray);
    
    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }
  }, [onFileSelect, maxSize]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  const displayError = error || uploadError;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium leading-none">
          {label}
        </label>
      )}
      
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors',
          dragActive
            ? 'border-accent bg-accent/5'
            : 'border-gray-300 hover:border-gray-400',
          displayError && 'border-red-500',
          'cursor-pointer'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <div className="text-sm">
            <span className="font-medium text-accent">Click to upload</span>
            <span className="text-muted-foreground"> or drag and drop</span>
          </div>
          
          <p className="text-xs text-muted-foreground mt-1">
            {accept.includes('image') ? 'Images' : 'Files'} up to {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
      </div>

      {displayError && (
        <p className="text-sm text-red-600" role="alert">
          {displayError}
        </p>
      )}
      
      {helperText && !displayError && (
        <p className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
};

export { FileUpload };
