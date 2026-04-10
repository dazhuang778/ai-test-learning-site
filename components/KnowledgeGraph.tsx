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

// 构建父子关系映射
function buildParentMap(nodes: KnowledgeNode[]): Record<string, string> {
  const map: Record<string, string> = {};
  nodes.forEach(node => {
    if (node.parent) {
      map[node.slug] = node.parent;
    }
  });
  return map;
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

  const parentMap = buildParentMap(nodes);

  return (
    <div className="w-full py-8 relative">
      {/* 连接线 SVG 层 */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
          </marker>
        </defs>
        {nodes.map(node => {
          if (!node.parent) return null;
          const parent = nodes.find(n => n.slug === node.parent);
          if (!parent) return null;

          const parentLevelIndex = levelGroups.findIndex(g => g.level === parent.level);
          const childLevelIndex = levelGroups.findIndex(g => g.level === node.level);
          const parentIndex = levelGroups[parentLevelIndex].nodes.indexOf(parent);
          const childIndex = levelGroups[childLevelIndex].nodes.indexOf(node);

          const levelCount = levelGroups.length;
          const vGap = 120; // 垂直间距
          const hGap = 180; // 水平节点间距

          // 计算位置（居中对齐）
          const parentLevelWidth = levelGroups[parentLevelIndex].nodes.length * hGap;
          const childLevelWidth = levelGroups[childLevelIndex].nodes.length * hGap;

          const parentX = (parentIndex - (levelGroups[parentLevelIndex].nodes.length - 1) / 2) * hGap;
          const parentY = parentLevelIndex * vGap + 40;
          const childX = (childIndex - (levelGroups[childLevelIndex].nodes.length - 1) / 2) * hGap;
          const childY = childLevelIndex * vGap + 40;

          const startX = parentX + 88; // 卡片宽度的一半
          const startY = parentY + 80;
          const endX = childX + 88;
          const endY = childY;

          //贝塞尔曲线控制点
          const cx1 = startX;
          const cy1 = startY + 30;
          const cx2 = endX;
          const cy2 = endY - 30;

          return (
            <path
              key={`${parent.slug}-${node.slug}`}
              d={`M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`}
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
      </svg>

      {levelGroups.map(group => (
        <div key={group.level} className="mb-12 last:mb-0 relative z-10">
          {/* Level 标签 */}
          <div className="text-center mb-6">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                LEVEL_STYLES[group.level]?.badge ?? ''
              }`}
            >
              {LEVEL_STYLES[group.level]?.label ?? `Level ${group.level}`}
            </span>
          </div>

          {/* 节点行 */}
          <div className="flex flex-wrap justify-center gap-x-18 gap-y-6">
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
