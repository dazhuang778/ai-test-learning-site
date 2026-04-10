import Link from 'next/link';
import { KnowledgeNode } from '../lib/types';

const LEVEL_STYLES: Record<number, { card: string; badge: string; label: string }> = {
  0: {
    card: 'bg-gradient-to-br from-purple-50 to-violet-100 border-purple-300 hover:border-purple-500',
    badge: 'bg-purple-100 text-purple-700',
    label: 'Level 0 · 前置',
  },
  1: {
    card: 'bg-gradient-to-br from-blue-50 to-sky-100 border-blue-300 hover:border-blue-500',
    badge: 'bg-blue-100 text-blue-700',
    label: 'Level 1 · 核心',
  },
  2: {
    card: 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300 hover:border-green-500',
    badge: 'bg-green-100 text-green-700',
    label: 'Level 2 · 进阶',
  },
  3: {
    card: 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-300 hover:border-orange-500',
    badge: 'bg-orange-100 text-orange-700',
    label: 'Level 3 · 实践',
  },
};

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
}

interface LevelGroup {
  level: number;
  nodes: KnowledgeNode[];
}

export default function KnowledgeGraph({ nodes }: KnowledgeGraphProps) {
  // 按 level 分组
  const levelGroups: LevelGroup[] = [];
  const levelMap: Record<number, KnowledgeNode[]> = {};

  nodes.forEach(node => {
    if (!levelMap[node.level]) levelMap[node.level] = [];
    levelMap[node.level].push(node);
  });

  Object.keys(levelMap)
    .map(Number)
    .sort()
    .forEach(level => {
      levelGroups.push({ level, nodes: levelMap[level] });
    });

  return (
    <div className="w-full py-8">
      {levelGroups.map(group => (
        <div key={group.level} className="mb-10 last:mb-0">
          {/* Level 标签 */}
          <div className="text-center mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                LEVEL_STYLES[group.level]?.badge ?? ''
              }`}
            >
              {LEVEL_STYLES[group.level]?.label ?? `Level ${group.level}`}
            </span>
          </div>

          {/* 节点行 */}
          <div className="flex flex-wrap justify-center gap-6">
            {group.nodes.map(node => {
              const style = LEVEL_STYLES[node.level] ?? LEVEL_STYLES[0];
              return (
                <Link
                  key={node.slug}
                  href={`/nodes/${node.slug}`}
                  className={`w-44 px-3 py-3 rounded-xl border-2 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${style.card}`}
                >
                  <div className="font-bold text-sm text-gray-900 leading-snug mb-2">
                    {node.title}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{node.stage}</span>
                    <span className="text-xs leading-none">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span
                          key={i}
                          className={i < node.difficulty ? 'text-yellow-400' : 'text-gray-200'}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="text-xs text-blue-600 mt-2">{node.resources.length} 条资源</div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
