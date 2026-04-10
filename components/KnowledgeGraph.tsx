import Link from 'next/link';
import { KnowledgeNode } from '../lib/types';

const LEVEL_STYLES: Record<number, { card: string; badge: string; label: string }> = {
  0: {
    card: 'bg-gradient-to-br from-slate-900 to-purple-950 border-purple-500 hover:border-purple-400 hover:shadow-purple-500/30',
    badge: 'bg-purple-500/20 text-purple-400 border border-purple-500/50',
    label: 'Level 0 · 前置基础',
  },
  1: {
    card: 'bg-gradient-to-br from-slate-900 to-blue-950 border-cyan-500 hover:border-cyan-400 hover:shadow-cyan-500/30',
    badge: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50',
    label: 'Level 1 · 核心技能',
  },
  2: {
    card: 'bg-gradient-to-br from-slate-900 to-emerald-950 border-emerald-500 hover:border-emerald-400 hover:shadow-emerald-500/30',
    badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
    label: 'Level 2 · 进阶技能',
  },
  3: {
    card: 'bg-gradient-to-br from-slate-900 to-orange-950 border-orange-500 hover:border-orange-400 hover:shadow-orange-500/30',
    badge: 'bg-orange-500/20 text-orange-400 border border-orange-500/50',
    label: 'Level 3 · 综合实践',
  },
};

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
}

export default function KnowledgeGraph({ nodes }: KnowledgeGraphProps) {
  // 构建层级结构
  const levels: Record<number, KnowledgeNode[]> = {};
  nodes.forEach(n => {
    if (!levels[n.level]) levels[n.level] = [];
    levels[n.level].push(n);
  });
  const sortedLevels = Object.keys(levels).map(Number).sort((a, b) => a - b);

  return (
    <div className="w-full py-8 px-4">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">学习路径</h2>
        <p className="text-gray-400 text-sm">从基础到实践，循序渐进</p>
      </div>

      {/* 水平布局 */}
      <div className="flex items-start justify-center overflow-x-auto pb-8">
        {sortedLevels.map((level) => {
          const levelNodes = levels[level];
          const style = LEVEL_STYLES[level] ?? LEVEL_STYLES[0];

          return (
            <div key={level} className="flex flex-col items-center" style={{ minWidth: '200px', marginRight: '48px' }}>
              {/* Level 标签 */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${style.badge}`}>
                  {style.label}
                </span>
              </div>

              {/* 节点容器 */}
              <div className="flex flex-col gap-6">
                {levelNodes.map((node) => (
                  <Link
                    key={node.slug}
                    href={`/nodes/${node.slug}`}
                    className={`block w-44 px-4 py-3 rounded-xl border-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${style.card}`}
                  >
                    <div className="font-bold text-white text-sm leading-snug mb-2">{node.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{node.stage}</span>
                      <span className="text-xs leading-none">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span key={i} className={i < node.difficulty ? 'text-yellow-400' : 'text-gray-600'}>
                            ★
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="text-xs text-cyan-400 mt-2">{node.resources.length} 条资源</div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
