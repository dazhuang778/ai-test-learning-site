import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { KnowledgeNode } from '../lib/types';

interface SearchResult {
  item: KnowledgeNode;
}

interface SearchBoxProps {
  nodes: KnowledgeNode[];
  onClose?: () => void;
}

export default function SearchBox({ nodes, onClose }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(nodes, {
      keys: ['title', 'description', 'resources.title', 'resources.description'],
      threshold: 0.4,
      minMatchCharLength: 1,
      includeMatches: true,
      ignoreLocation: true,
    });
  }, [nodes]);

  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 10);
  }, [fuse, query]);

  const isEmpty = query.trim() !== '' && results.length === 0;
  const hasResults = query.trim() !== '' && results.length > 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setIsOpen(query.length > 0);
  }, [query]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="搜索知识节点和资源..."
          className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-80 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-50">
          {isEmpty ? (
            <div className="p-4 text-sm text-gray-500 dark:text-slate-400 text-center">
              未找到相关结果
            </div>
          ) : hasResults ? (
            <ul className="max-h-80 overflow-y-auto">
              {results.map(({ item }) => (
                <li key={item.slug}>
                  <Link
                    href={`/nodes/${item.slug}`}
                    onClick={handleClose}
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-100 dark:border-slate-700 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.description}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {item.resources.length} 条资源
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
}
