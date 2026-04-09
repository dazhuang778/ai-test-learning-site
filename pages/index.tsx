import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import NodeListView from '../components/NodeListView';
import { getAllNodes } from '../lib/nodes';
import { KnowledgeNode } from '../lib/types';

const KnowledgeGraph = dynamic(() => import('../components/KnowledgeGraph'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[640px] text-gray-400">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">🗺️</div>
        <div className="text-sm">加载知识图谱中...</div>
      </div>
    </div>
  ),
});

const LEVEL_LEGEND = [
  {
    level: 0,
    label: '前置基础',
    color:
      'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300',
  },
  {
    level: 1,
    label: '核心技能',
    color:
      'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
  },
  {
    level: 2,
    label: '进阶技能',
    color:
      'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  },
  {
    level: 3,
    label: '综合实践',
    color:
      'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300',
  },
] as const;

interface HomeProps {
  nodes: KnowledgeNode[];
}

export default function Home({ nodes }: HomeProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-violet-600 to-purple-700 py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 drop-shadow">
            AI辅助软件测试 · 学习体系
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            系统化学习路径，点击节点探索各主题的精选学习资源
          </p>
          <a
            href="#graph"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium transition-all duration-200 backdrop-blur-sm border border-white/30"
          >
            开始探索 ↓
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Graph or List */}
        <div id="graph">
          {isMobile ? (
            <NodeListView nodes={nodes} />
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <KnowledgeGraph nodes={nodes} />
            </div>
          )}
        </div>

        {/* Level Legend */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LEVEL_LEGEND.map(({ level, label, color }) => (
            <div key={level} className={`rounded-xl border px-4 py-3 ${color}`}>
              <div className="text-xs font-medium opacity-70 mb-0.5">Level {level}</div>
              <div className="font-semibold text-sm">{label}</div>
              <div className="text-xs mt-1 opacity-60">
                {nodes.filter(n => n.level === level).length} 个主题
              </div>
            </div>
          ))}
        </div>

        {/* Tip */}
        <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-6">
          {isMobile ? '点击卡片查看详情' : '点击图谱节点查看详情 · 支持缩放和平移'}
        </p>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const nodes = getAllNodes();
  return { props: { nodes } };
};
