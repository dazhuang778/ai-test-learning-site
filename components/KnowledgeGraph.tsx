import Link from 'next/link';
import { KnowledgeNode } from '../lib/types';

const LEVEL_STYLES: Record<number, { card: string; badge: string; label: string }> = {
  0: {
    card: 'bg-gradient-to-br from-purple-100 to-violet-200 border-purple-400 hover:border-purple-300',
    badge: 'bg-purple-200 text-purple-800',
    label: 'Level 0 · 前置基础',
  },
  1: {
    card: 'bg-gradient-to-br from-blue-100 to-cyan-200 border-cyan-400 hover:border-cyan-300',
    badge: 'bg-blue-200 text-blue-800',
    label: 'Level 1 · 核心技能',
  },
  2: {
    card: 'bg-gradient-to-br from-emerald-100 to-teal-200 border-emerald-400 hover:border-emerald-300',
    badge: 'bg-emerald-200 text-emerald-800',
    label: 'Level 2 · 进阶技能',
  },
  3: {
    card: 'bg-gradient-to-br from-orange-100 to-amber-200 border-orange-400 hover:border-orange-300',
    badge: 'bg-orange-200 text-orange-800',
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
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${style.badge}`}>
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
                    <div className="font-bold text-gray-900 text-sm leading-snug mb-2">{node.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{node.stage}</span>
                      <span className="text-xs leading-none">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span key={i} className={i < node.difficulty ? 'text-yellow-500' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="text-xs text-blue-600 mt-2">{node.resources.length} 条资源</div>
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
