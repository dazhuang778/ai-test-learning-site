import Link from 'next/link';
import { KnowledgeNode } from '../lib/types';

const LEVEL_META: Record<number, { label: string; card: string; badge: string }> = {
  0: { label: 'Level 0 · 前置基础', card: 'bg-purple-50 border-purple-200', badge: 'bg-purple-100 text-purple-700' },
  1: { label: 'Level 1 · 核心技能', card: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700' },
  2: { label: 'Level 2 · 进阶技能', card: 'bg-green-50 border-green-200', badge: 'bg-green-100 text-green-700' },
  3: { label: 'Level 3 · 综合实践', card: 'bg-orange-50 border-orange-200', badge: 'bg-orange-100 text-orange-700' },
};

interface NodeListViewProps {
  nodes: KnowledgeNode[];
}

export default function NodeListView({ nodes }: NodeListViewProps) {
  const grouped: Record<number, KnowledgeNode[]> = {};
  nodes.forEach(n => {
    if (!grouped[n.level]) grouped[n.level] = [];
    grouped[n.level].push(n);
  });

  return (
    <div className="space-y-8">
      {([0, 1, 2, 3] as const).map(level => {
        const levelNodes = grouped[level] ?? [];
        if (!levelNodes.length) return null;
        const meta = LEVEL_META[level];

        return (
          <section key={level}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${meta.badge}`}>
                {meta.label}
              </span>
              <span className="text-xs text-gray-400">{levelNodes.length} 个主题</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {levelNodes.map(node => (
                <Link
                  key={node.slug}
                  href={`/nodes/${node.slug}`}
                  className={`block p-4 rounded-xl border hover:shadow-sm transition-all ${meta.card}`}
                >
                  <div className="font-semibold text-gray-900 mb-1">{node.title}</div>
                  <p className="text-sm text-gray-500 line-clamp-2">{node.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-gray-400">{node.stage}</span>
                    <span className="text-xs">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span key={i} className={i < node.difficulty ? 'text-yellow-400' : 'text-gray-200'}>
                          ★
                        </span>
                      ))}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">{node.resources.length} 条资源 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
