import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const siteTitle = title ? `${title} | AI测试学习` : 'AI测试学习 · 知识图谱';
  const metaDescription =
    description ?? 'AI辅助软件测试学习体系，帮助测试工程师快速掌握AI测试技能，找到适合自己阶段的优质资源。';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">🧪</span>
              <div>
                <div className="font-bold text-gray-900 leading-tight">AI测试学习</div>
                <div className="text-xs text-gray-400 leading-tight hidden sm:block">AI辅助软件测试知识图谱</div>
              </div>
            </Link>
            <nav className="text-sm text-gray-400 hidden md:flex items-center gap-1">
              <span>8个知识节点</span>
              <span className="mx-2">·</span>
              <span>持续更新中</span>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400 space-y-1">
            <p>AI测试学习 · 开源知识图谱</p>
            <p>内容持续更新 · 欢迎贡献资源</p>
          </div>
        </footer>
      </div>
    </>
  );
}
