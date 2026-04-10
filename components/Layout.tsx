import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '../lib/theme-context';
import { KnowledgeNode } from '../lib/types';
import dynamic from 'next/dynamic';

const SearchBox = dynamic(() => import('./SearchBox'), {
  ssr: false,
  loading: () => (
    <input
      disabled
      placeholder="加载中..."
      className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-400"
    />
  ),
});

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  nodes?: KnowledgeNode[];
}

export default function Layout({ children, title, description, nodes = [] }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const siteTitle = title ? `${title} | AI测试学习` : 'AI测试学习 · 知识图谱';
  const metaDescription =
    description ??
    'AI辅助软件测试学习体系，帮助测试工程师快速掌握AI测试技能，找到适合自己阶段的优质资源。';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="AI测试学习 RSS" href="/rss.xml" />
      </Head>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">🧪</span>
              <div>
                <div className="font-bold text-gray-900 dark:text-white leading-tight">
                  AI测试学习
                </div>
                <div className="text-xs text-gray-400 dark:text-slate-400 leading-tight hidden sm:block">
                  AI辅助软件测试知识图谱
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:block relative">
                <SearchBox nodes={nodes} />
              </div>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="搜索"
              >
                🔍
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="切换主题"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
          {showSearch && (
            <div className="sm:hidden border-t border-gray-200 dark:border-slate-700 px-4 py-3 bg-white dark:bg-slate-800">
              <SearchBox nodes={nodes} onClose={() => setShowSearch(false)} />
            </div>
          )}
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400 dark:text-slate-500 space-y-1">
            <p>AI测试学习 · 开源知识图谱</p>
            <p>内容持续更新 · 欢迎贡献资源</p>
          </div>
        </footer>
      </div>
    </>
  );
}
