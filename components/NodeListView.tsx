import Link from 'next/link';
import { KnowledgeNode } from '../lib/types';

const LEVEL_META: Record<number, { label: string; card: string; badge: string }> = {
  0: {
    label: 'Level 0 · 前置基础',
    card: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
    badge: 'bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300',
  },
  1: {
    label: 'Level 1 · 核心技能',
    card: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300',
  },
  2: {
    label: 'Level 2 · 进阶技能',
    card: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
    badge: 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300',
  },
  3: {
    label: 'Level 3 · 综合实践',
    card: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800',
    badge: 'bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300',
  },
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
              <span className="text-xs text-gray-400 dark:text-slate-500">
                {levelNodes.length} 个主题
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {levelNodes.map(node => (
                <Link
                  key={node.slug}
                  href={`/nodes/${node.slug}`}
                  className={`block p-4 rounded-xl border hover:shadow-sm transition-all ${meta.card}`}
                >
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    {node.title}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2">
                    {node.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-gray-400 dark:text-slate-500">{node.stage}</span>
                    <span className="text-xs">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < node.difficulty
                              ? 'text-yellow-400'
                              : 'text-gray-200 dark:text-gray-600'
                          }
                        >
                          ★
                        </span>
                      ))}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-slate-500 ml-auto">
                      {node.resources.length} 条资源 →
                    </span>
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
