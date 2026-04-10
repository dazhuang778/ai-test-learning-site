import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import KnowledgeGraph from '../components/KnowledgeGraph';
import { getAllNodes } from '../lib/nodes';
import { KnowledgeNode } from '../lib/types';

const LEVEL_LEGEND = [
  {
    level: 0,
    label: '前置基础',
    color: 'bg-purple-500/10 border-purple-500/50 text-purple-400',
  },
  {
    level: 1,
    label: '核心技能',
    color: 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400',
  },
  {
    level: 2,
    label: '进阶技能',
    color: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400',
  },
  {
    level: 3,
    label: '综合实践',
    color: 'bg-orange-500/10 border-orange-500/50 text-orange-400',
  },
] as const;

interface HomeProps {
  nodes: KnowledgeNode[];
}

export default function Home({ nodes }: HomeProps) {
  return (
    <Layout nodes={nodes}>
      {/* Hero - 赛博朋克风格 */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-16 sm:py-20 px-4 relative overflow-hidden">
        {/* 装饰性霓虹线条 */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="absolute top-20 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />
        <div className="absolute top-40 right-1/4 w-px h-24 bg-gradient-to-b from-transparent via-pink-500 to-transparent" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 mb-4">
            AI辅助软件测试 · 学习体系
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            系统化学习路径，点击节点探索各主题的精选学习资源
          </p>
          <a
            href="#graph"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 hover:from-cyan-500/30 hover:to-pink-500/30 text-cyan-400 font-medium transition-all duration-200 border border-cyan-500/50 backdrop-blur-sm"
          >
            开始探索 ↓
          </a>
        </div>

        {/* 底部装饰 */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 知识图谱 */}
        <div id="graph">
          <KnowledgeGraph nodes={nodes} />
        </div>

        {/* Level Legend - 赛博朋克风格 */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LEVEL_LEGEND.map(({ level, label, color }) => (
            <div key={level} className={`rounded-xl border px-4 py-3 backdrop-blur-sm ${color}`}>
              <div className="text-xs font-medium opacity-60 mb-0.5">Level {level}</div>
              <div className="font-semibold text-sm">{label}</div>
              <div className="text-xs mt-1 opacity-60">
                {nodes.filter(n => n.level === level).length} 个主题
              </div>
            </div>
          ))}
        </div>

        {/* Tip */}
        <p className="text-center text-xs text-gray-500 mt-6">
          点击卡片查看详情
        </p>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const nodes = getAllNodes();
  return { props: { nodes } };
};
