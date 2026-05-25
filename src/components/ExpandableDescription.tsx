import { useState } from 'react';

export default function ExpandableDescription({ content, className = '' }: { content: string, className?: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`mb-6 ${className}`}>
      <div 
        className={`text-gray-600 dark:text-gray-400 leading-relaxed ${!expanded ? 'max-h-[4.5rem] overflow-hidden text-ellipsis [&>p]:line-clamp-2' : ''}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {content.length > 100 && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setExpanded(!expanded); }}
          className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 text-xs font-bold mt-2"
        >
          {expanded ? 'Read Less' : 'Read More...'}
        </button>
      )}
    </div>
  );
}
