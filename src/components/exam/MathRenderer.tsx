'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export interface MathRendererProps {
  content: string;
  className?: string;
}

export function renderMathInText(content: string): string {
  if (!content) return '';

  // Replace display math $$...$$
  let formatted = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
    } catch {
      return `$$${math}$$`;
    }
  });

  // Replace inline math $...$
  formatted = formatted.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return `$${math}$`;
    }
  });

  return formatted;
}

export function MathRenderer({ content, className = '' }: MathRendererProps) {
  const renderedContent = useMemo(() => {
    return renderMathInText(content);
  }, [content]);

  return (
    <div
      className={`max-w-none font-serif text-[15px] leading-relaxed text-ink sm:text-base [&_p:not(:last-child)]:mb-2 [&_.katex-display]:overflow-x-auto [&_.katex-display]:py-2 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}

export default MathRenderer;
