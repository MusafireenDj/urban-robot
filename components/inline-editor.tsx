'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InlineEditorProps {
  value: string;
  onSave: (newValue: string) => void;
  type?: 'text' | 'textarea';
  className?: string;
  placeholder?: string;
  canEdit?: boolean; // New prop to control editability
}

export default function InlineEditor({ value, onSave, type = 'text', className, placeholder, canEdit = true }: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleEditClick = useCallback(() => {
    if (canEdit) {
      setIsEditing(true);
    }
  }, [canEdit]);

  const handleSave = useCallback(() => {
    onSave(currentValue);
    setIsEditing(false);
  }, [currentValue, onSave]);

  const handleCancel = useCallback(() => {
    setCurrentValue(value);
    setIsEditing(false);
  }, [value]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && type === 'text') {
      handleSave();
    } else if (event.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel, type]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {isEditing ? (
        <>
          {type === 'text' ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              placeholder={placeholder}
            />
          ) : (
            <Textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-h-[80px]"
              placeholder={placeholder}
            />
          )}
          <Button size="icon" variant="ghost" onClick={handleSave} aria-label="Save">
            <Check className="h-4 w-4 text-green-500" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel} aria-label="Cancel">
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </>
      ) : (
        <>
          <span className="flex-1 break-words whitespace-pre-wrap">
            {value || <span className="text-muted-foreground">{placeholder || 'Click to edit'}</span>}
          </span>
          {canEdit && (
            <Button
              size="icon"
              variant="ghost"
              onClick={handleEditClick}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </>
      )}
    </div>
  );
}
