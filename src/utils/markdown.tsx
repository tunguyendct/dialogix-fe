import { useState } from 'react';
import type { ComponentProps } from 'react';
import { Check, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';

const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-lg my-2 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-sm">
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-gray-100 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const markdownComponents = {
  code({
    inline,
    className,
    children,
    ...props
  }: ComponentProps<'code'> & { inline?: boolean }) {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : undefined;
    const codeString = String(children).replace(/\n$/, '');

    return !inline ? (
      <CodeBlock code={codeString} language={language} />
    ) : (
      <code
        className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
  p({ children }: ComponentProps<'p'>) {
    return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
  },
  strong({ children }: ComponentProps<'strong'>) {
    return (
      <strong className="font-bold text-gray-900 dark:text-gray-100">
        {children}
      </strong>
    );
  },
  em({ children }: ComponentProps<'em'>) {
    return (
      <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
    );
  },
  del({ children }: ComponentProps<'del'>) {
    return (
      <del className="line-through text-gray-600 dark:text-gray-400">
        {children}
      </del>
    );
  },
  ul({ children }: ComponentProps<'ul'>) {
    return <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>;
  },
  ol({ children }: ComponentProps<'ol'>) {
    return (
      <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>
    );
  },
  li({ children }: ComponentProps<'li'>) {
    return <li className="text-gray-800 dark:text-gray-200">{children}</li>;
  },
  blockquote({ children }: ComponentProps<'blockquote'>) {
    return (
      <blockquote className="border-l-4 border-blue-400 dark:border-blue-500 pl-4 py-2 my-3 bg-blue-50 dark:bg-blue-900/20 italic text-blue-900 dark:text-blue-100 rounded-r">
        {children}
      </blockquote>
    );
  },
  h1({ children }: ComponentProps<'h1'>) {
    return (
      <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
        {children}
      </h1>
    );
  },
  h2({ children }: ComponentProps<'h2'>) {
    return (
      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
        {children}
      </h2>
    );
  },
  h3({ children }: ComponentProps<'h3'>) {
    return (
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
        {children}
      </h3>
    );
  },
  h4({ children }: ComponentProps<'h4'>) {
    return (
      <h4 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {children}
      </h4>
    );
  },
  h5({ children }: ComponentProps<'h5'>) {
    return (
      <h5 className="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {children}
      </h5>
    );
  },
  h6({ children }: ComponentProps<'h6'>) {
    return (
      <h6 className="text-xs font-semibold mb-2 text-gray-900 dark:text-gray-100 uppercase tracking-wide">
        {children}
      </h6>
    );
  },
  a({ children, href }: ComponentProps<'a'>) {
    return (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  hr() {
    return <hr className="my-4 border-gray-300 dark:border-gray-600" />;
  },
  table({ children }: ComponentProps<'table'>) {
    return (
      <div className="overflow-x-auto my-3">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg">
          {children}
        </table>
      </div>
    );
  },
  th({ children }: ComponentProps<'th'>) {
    return (
      <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left text-gray-900 dark:text-gray-100">
        {children}
      </th>
    );
  },
  td({ children }: ComponentProps<'td'>) {
    return (
      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-800 dark:text-gray-200">
        {children}
      </td>
    );
  },
};

// Main markdown renderer component
export const MarkdownContent = ({
  content,
  className = '',
}: {
  content: string;
  className?: string;
}) => {
  return (
    <div
      className={`prose prose-sm max-w-none dark:prose-invert prose-gray ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
