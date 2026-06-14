import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit3, Check, X, Sparkles } from 'lucide-react';
import { useAdmin } from '../lib/AdminContext';

interface InlineEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  multiline?: boolean;
  preview?: boolean;
}

export default function InlineEditor({ value, onChange, className = '', label, multiline = false }: InlineEditorProps) {
  const { isAdmin, editMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (!multiline) {
        (inputRef.current as HTMLInputElement).select();
      }
    }
  }, [isEditing, multiline]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // Close editing on click outside
  useEffect(() => {
    if (!isEditing) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleSave();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing, editValue]);

  const handleSave = () => {
    if (editValue !== value) {
      onChange(editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
    if (multiline && e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  if (!isAdmin || !editMode) {
    return <span className={className}>{value}</span>;
  }

  if (isEditing) {
    return (
      <div ref={containerRef} className="relative inline-block min-w-[200px] w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-2 border-cyan-500 rounded-xl text-sm font-medium text-gray-900 dark:text-white outline-none shadow-lg shadow-cyan-500/10 resize-y min-h-[80px]"
            rows={3}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 bg-gray-50 dark:bg-gray-800 border-2 border-cyan-500 rounded-lg text-sm font-medium text-gray-900 dark:text-white outline-none shadow-lg shadow-cyan-500/10"
          />
        )}
        <div className="flex gap-1 mt-1.5 justify-end">
          <button
            onClick={handleSave}
            className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
            title="Save (Enter)"
          >
            <Check size={14} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="Cancel (Esc)"
          >
            <X size={14} />
          </button>
        </div>
        {label && (
          <span className="absolute -top-2 left-3 px-1.5 text-[10px] font-bold text-cyan-500 bg-white dark:bg-gray-900 rounded">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`group relative inline-block ${className}`}>
      <span>{value}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 p-1 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-500 transition-all scale-75 group-hover:scale-100"
        title={label ? `Edit ${label}` : 'Edit'}
      >
        <Edit3 size={10} />
      </button>
    </div>
  );
}