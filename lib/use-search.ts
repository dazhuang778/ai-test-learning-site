import { useMemo, useState } from 'react';
import Fuse, { FuseResultMatch } from 'fuse.js';
import { KnowledgeNode } from './types';

interface UseSearchOptions {
  threshold?: number;
  keys?: string[];
}

interface SearchResult {
  item: KnowledgeNode;
  matches?: readonly FuseResultMatch[];
}

export function useSearch(nodes: KnowledgeNode[], options: UseSearchOptions = {}) {
  const {
    threshold = 0.3,
    keys = ['title', 'description', 'resources.title', 'resources.description'],
  } = options;
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(nodes, {
      keys,
      threshold,
      includeMatches: true,
      ignoreLocation: true,
    });
  }, [nodes, keys, threshold]);

  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return fuse.search(query).slice(0, 10);
  }, [fuse, query]);

  const isEmpty = query.trim() !== '' && results.length === 0;
  const hasResults = query.trim() !== '' && results.length > 0;

  return {
    query,
    setQuery,
    results,
    isEmpty,
    hasResults,
  };
}
