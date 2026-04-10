import Link from 'next/link';
import { KnowledgeNode } from '../lib/types';

const LEVEL_STYLES: Record<number, { card: string; badge: string; label: string; line: string }> = {
  0: {
    card: 'bg-gradient-to-br from-purple-100 to-violet-200 border-purple-400 hover:border-purple-300',
    badge: 'bg-purple-200 text-purple-800',
    label: 'Level 0 · 前置基础',
    line: 'bg-purple-400',
  },
  1: {
    card: 'bg-gradient-to-br from-blue-100 to-cyan-200 border-cyan-400 hover:border-cyan-300',
    badge: 'bg-blue-200 text-blue-800',
    label: 'Level 1 · 核心技能',
    line: 'bg-cyan-400',
  },
  2: {
    card: 'bg-gradient-to-br from-emerald-100 to-teal-200 border-emerald-400 hover:border-emerald-300',
    badge: 'bg-emerald-200 text-emerald-800',
    label: 'Level 2 · 进阶技能',
    line: 'bg-emerald-400',
  },
  3: {
    card: 'bg-gradient-to-br from-orange-100 to-amber-200 border-orange-400 hover:border-orange-300',
    badge: 'bg-orange-200 text-orange-800',
    label: 'Level 3 · 综合实践',
    line: 'bg-amber-400',
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

      {/* 树形布局 - 水平方向 */}
      <div className="flex items-start justify-center overflow-x-auto pb-8">
        {sortedLevels.map((level, levelIdx) => {
          const levelNodes = levels[level];
          const levelStyle = LEVEL_STYLES[level] ?? LEVEL_STYLES[0];

          return (
            <div key={level} className="flex flex-col items-center" style={{ minWidth: '240px' }}>
              {/* Level 标签 */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${levelStyle.badge}`}>
                  {levelStyle.label}
                </span>
              </div>

              {/* 节点容器 */}
              <div className="flex flex-col gap-8">
                {levelNodes.map((node, nodeIdx) => {
                  const style = LEVEL_STYLES[level] ?? LEVEL_STYLES[0];
                  const children = nodes.filter(n => n.parent === node.slug);

                  return (
                    <div key={node.slug} className="flex items-center">
                      {/* 连接线 - 左侧 */}
                      {levelIdx > 0 && (
                        <div className="flex items-center mr-4">
                          {/* 水平线 - 连接到上级 */}
                          <div className={`w-8 h-0.5 ${style.line}`} />
                          {/* 垂直线 - 跨越层级 */}
                          <div className={`w-0.5 ${children.length > 1 ? 'h-24' : 'h-12'}`} />
                        </div>
                      )}

                      {/* 节点卡片 */}
                      <Link
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

                      {/* 连接线 - 右侧（如果有子节点） */}
                      {children.length > 0 && (
                        <div className="flex items-center ml-4">
                          <div className={`w-8 h-0.5 ${style.line}`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 层间连接线 */}
              {levelIdx < sortedLevels.length - 1 && (
                <div className="flex items-center mt-4">
                  <div className={`w-0.5 h-12 ${levelStyle.line}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
