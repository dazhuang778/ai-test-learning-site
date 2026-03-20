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
  { level: 0, label: '前置基础', color: 'bg-purple-50 border-purple-200 text-purple-800' },
  { level: 1, label: '核心技能', color: 'bg-blue-50 border-blue-200 text-blue-800' },
  { level: 2, label: '进阶技能', color: 'bg-green-50 border-green-200 text-green-800' },
  { level: 3, label: '综合实践', color: 'bg-orange-50 border-orange-200 text-orange-800' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AI辅助软件测试 · 学习体系
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
            系统化学习路径，点击节点探索各主题的精选学习资源
          </p>
        </div>

        {/* Graph or List */}
        {isMobile ? (
          <NodeListView nodes={nodes} />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <KnowledgeGraph nodes={nodes} />
          </div>
        )}

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
        <p className="text-center text-xs text-gray-400 mt-6">
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
