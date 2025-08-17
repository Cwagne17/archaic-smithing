'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  label,
  error,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const toolbarButtons = [
    { command: 'bold', icon: 'B', title: 'Bold' },
    { command: 'italic', icon: 'I', title: 'Italic' },
    { command: 'underline', icon: 'U', title: 'Underline' },
    { command: 'formatBlock', value: 'h1', icon: 'H1', title: 'Heading 1' },
    { command: 'formatBlock', value: 'h2', icon: 'H2', title: 'Heading 2' },
    { command: 'formatBlock', value: 'h3', icon: 'H3', title: 'Heading 3' },
    { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
    { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
  ];

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium leading-none">
          {label}
        </label>
      )}
      
      <div className={cn(
        'border rounded-md overflow-hidden',
        isFocused && 'ring-2 ring-accent ring-offset-2',
        error && 'border-red-500'
      )}>
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b bg-muted/50">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormat(button.command, button.value)}
              className="px-2 py-1 text-sm font-medium rounded hover:bg-muted transition-colors"
              title={button.title}
            >
              {button.icon}
            </button>
          ))}
        </div>
        
        {/* Editor */}
        <div
          contentEditable
          className="min-h-[200px] p-3 focus:outline-none"
          style={{ whiteSpace: 'pre-wrap' }}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onChange(e.currentTarget.innerHTML);
          }}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: value }}
          data-placeholder={placeholder}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export { RichTextEditor };
