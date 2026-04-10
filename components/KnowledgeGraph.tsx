import Link from 'next/link';
import { KnowledgeNode } from '../lib/types';

const LEVEL_STYLES: Record<number, { card: string; badge: string; label: string; glow: string }> = {
  0: {
    card: 'bg-gradient-to-br from-purple-100 to-violet-200 border-purple-400 hover:border-purple-300 shadow-purple-200',
    badge: 'bg-purple-200 text-purple-800',
    label: 'Level 0 · 前置基础',
    glow: 'shadow-purple-500/30',
  },
  1: {
    card: 'bg-gradient-to-br from-blue-100 to-cyan-200 border-cyan-400 hover:border-cyan-300 shadow-blue-200',
    badge: 'bg-blue-200 text-blue-800',
    label: 'Level 1 · 核心技能',
    glow: 'shadow-blue-500/30',
  },
  2: {
    card: 'bg-gradient-to-br from-emerald-100 to-teal-200 border-emerald-400 hover:border-emerald-300 shadow-green-200',
    badge: 'bg-emerald-200 text-emerald-800',
    label: 'Level 2 · 进阶技能',
    glow: 'shadow-green-500/30',
  },
  3: {
    card: 'bg-gradient-to-br from-orange-100 to-amber-200 border-orange-400 hover:border-orange-300 shadow-orange-200',
    badge: 'bg-orange-200 text-orange-800',
    label: 'Level 3 · 综合实践',
    glow: 'shadow-orange-500/30',
  },
};

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
}

function getChildren(nodes: KnowledgeNode[], parentSlug: string): KnowledgeNode[] {
  return nodes.filter(n => n.parent === parentSlug);
}

export default function KnowledgeGraph({ nodes }: KnowledgeGraphProps) {
  const rootNode = nodes.find(n => n.level === 0);

  return (
    <div className="w-full py-12 overflow-x-auto">
      <div className="min-w-max px-8">
        {rootNode && <MindMapNode node={rootNode} nodes={nodes} level={0} />}
      </div>
    </div>
  );
}

function MindMapNode({
  node,
  nodes,
  level,
  isLast = false,
}: {
  node: KnowledgeNode;
  nodes: KnowledgeNode[];
  level: number;
  isLast?: boolean;
}) {
  const style = LEVEL_STYLES[node.level] ?? LEVEL_STYLES[0];
  const children = getChildren(nodes, node.slug);
  const isLeaf = children.length === 0;

  // 水平布局：当前节点在左，子节点在右
  return (
    <div className="flex items-center">
      {/* 当前节点 */}
      <div className={`flex-shrink-0 mx-8 ${level > 0 ? 'ml-24' : ''}`}>
        <Link
          href={`/nodes/${node.slug}`}
          className={`block w-52 px-5 py-4 rounded-xl border-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${style.card}`}
        >
          <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${style.badge}`}>
            {style.label}
          </div>
          <div className="font-bold text-gray-900 text-base leading-snug mb-2">{node.title}</div>
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
      </div>

      {/* 连接线和子节点 */}
      {!isLeaf && (
        <div className="flex items-center">
          {/* 水平连接线 */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400" />

          {/* 子节点容器 */}
          <div className="flex flex-col gap-6">
            {children.map((child, idx) => (
              <div key={child.slug} className="flex items-center">
                {/* 垂直连接线 */}
                {children.length > 1 && idx < children.length - 1 && (
                  <div className="w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-400 absolute" />
                )}
                <MindMapNode node={child} nodes={nodes} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
