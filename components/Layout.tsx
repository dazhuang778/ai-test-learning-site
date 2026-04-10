import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const SearchBox = dynamic(() => import('./SearchBox'), {
  ssr: false,
  loading: () => (
    <input
      disabled
      placeholder="加载中..."
      className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-700 rounded-lg bg-slate-800 text-gray-400"
    />
  ),
});

const AUTHOR_AVATAR_KEY = 'author_avatar';
const DEFAULT_AVATAR = '/screenshot-20260128-093708.png';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  nodes?: any[];
}

export default function Layout({ children, title, description, nodes = [] }: LayoutProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR);
  const siteTitle = title ? `${title} | AI测试学习` : 'AI测试学习 · 知识图谱';
  const metaDescription =
    description ??
    'AI辅助软件测试学习体系，帮助测试工程师快速掌握AI测试技能，找到适合自己阶段的优质资源。';

  // 加载保存的头像（优先使用本地保存的）
  useEffect(() => {
    const saved = localStorage.getItem(AUTHOR_AVATAR_KEY);
    if (saved) setAvatarUrl(saved);
  }, [setAvatarUrl]);

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
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="AI测试学习 RSS" href="/rss.xml" />
      </Head>
      <div className="min-h-screen flex flex-col bg-slate-950">
        <header className="bg-slate-900 border-b border-slate-800 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">🎯</span>
              <div>
                <div className="font-bold text-white leading-tight">AI测试学习</div>
                <div className="text-xs text-slate-400 leading-tight hidden sm:block">
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
                className="sm:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                aria-label="搜索"
              >
                🔍
              </button>
            </div>
          </div>
          {showSearch && (
            <div className="sm:hidden border-t border-slate-800 px-4 py-3 bg-slate-900">
              <SearchBox nodes={nodes} onClose={() => setShowSearch(false)} />
            </div>
          )}
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {/* 底部提示 */}
            <div className="text-sm text-slate-500 space-y-1 mb-4">
              <p>AI测试学习 · 开源知识图谱</p>
              <p>内容持续更新 · 欢迎贡献资源</p>
            </div>

            {/* 作者栏 */}
            <div className="inline-flex items-center gap-2 text-sm text-slate-400">
              <span>@Author:</span>
              <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-500/50 shadow-lg shadow-cyan-500/10">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="作者头像" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    Z
                  </div>
                )}
              </div>
              <span className="text-cyan-400 font-medium">Zhuang Zhang</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
