import { Handle, Position, NodeProps } from '@xyflow/react';
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

export default function KnowledgeNodeCard({ data }: NodeProps) {
  const node = data.node as KnowledgeNode;
  const style = LEVEL_STYLES[node.level] ?? LEVEL_STYLES[0];

  return (
    <div
      title={node.description}
      className={`w-44 px-3 py-3 rounded-xl border-2 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 select-none ${style.card}`}
    >
      {node.parent && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-2 !h-2 !bg-gray-400 !border-white"
        />
      )}

      <div className={`text-xs font-medium px-1.5 py-0.5 rounded-full inline-block mb-2 ${style.badge}`}>
        {style.label}
      </div>

      <div className="font-bold text-sm text-gray-900 leading-snug mb-2">{node.title}</div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{node.stage}</span>
        <span className="text-xs leading-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={i < node.difficulty ? 'text-yellow-400' : 'text-gray-200'}>
              ★
            </span>
          ))}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-gray-400 !border-white"
      />
    </div>
  );
}
