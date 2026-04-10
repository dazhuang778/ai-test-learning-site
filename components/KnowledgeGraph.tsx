import Link from 'next/link';
import { KnowledgeNode } from '../lib/types';

const LEVEL_STYLES: Record<number, { card: string; badge: string; label: string; line: string }> = {
  0: {
    card: 'bg-gradient-to-br from-purple-100 to-violet-200 border-purple-400 hover:border-purple-300',
    badge: 'bg-purple-200 text-purple-800',
    label: 'Level 0 · 前置基础',
    line: 'from-purple-400 to-violet-400',
  },
  1: {
    card: 'bg-gradient-to-br from-blue-100 to-cyan-200 border-cyan-400 hover:border-cyan-300',
    badge: 'bg-blue-200 text-blue-800',
    label: 'Level 1 · 核心技能',
    line: 'from-blue-400 to-cyan-400',
  },
  2: {
    card: 'bg-gradient-to-br from-emerald-100 to-teal-200 border-emerald-400 hover:border-emerald-300',
    badge: 'bg-emerald-200 text-emerald-800',
    label: 'Level 2 · 进阶技能',
    line: 'from-emerald-400 to-teal-400',
  },
  3: {
    card: 'bg-gradient-to-br from-orange-100 to-amber-200 border-orange-400 hover:border-orange-300',
    badge: 'bg-orange-200 text-orange-800',
    label: 'Level 3 · 综合实践',
    line: 'from-orange-400 to-amber-400',
  },
};

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
}

interface TreeNode {
  node: KnowledgeNode;
  children: TreeNode[];
}

function buildTree(nodes: KnowledgeNode[], parentSlug: string | null): TreeNode | null {
  const node = nodes.find(n => n.parent === parentSlug);
  if (!node) return null;
  const children = nodes.filter(n => n.parent === node.slug).map(child => buildTree(nodes, child.slug)!);
  return { node, children: children.filter(Boolean) as TreeNode[] };
}

export default function KnowledgeGraph({ nodes }: KnowledgeGraphProps) {
  const tree = buildTree(nodes, null);

  return (
    <div className="w-full py-8 px-4">
      {tree && <TreeLevel node={tree} nodes={nodes} />}
    </div>
  );
}

function TreeLevel({ node, nodes }: { node: TreeNode; nodes: KnowledgeNode[] }) {
  const style = LEVEL_STYLES[node.node.level] ?? LEVEL_STYLES[0];
  const { node: nodeData } = node;
  const children = nodes.filter(n => n.parent === nodeData.slug);

  return (
    <div className="flex flex-col items-center">
      {/* 当前节点 */}
      <Link
        href={`/nodes/${nodeData.slug}`}
        className={`block w-48 px-4 py-3 rounded-xl border-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${style.card}`}
      >
        <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${style.badge}`}>
          {style.label}
        </div>
        <div className="font-bold text-gray-900 text-sm leading-snug mb-2">{nodeData.title}</div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">{nodeData.stage}</span>
          <span className="text-xs leading-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={i < nodeData.difficulty ? 'text-yellow-500' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </span>
        </div>
        <div className="text-xs text-blue-600 mt-2">{nodeData.resources.length} 条资源</div>
      </Link>

      {/* 子节点 */}
      {children.length > 0 && (
        <>
          {/* 垂直连接线 */}
          <div className={`w-0.5 h-8 bg-gradient-to-b ${style.line}`} />

          {/* 分叉水平线 */}
          {children.length > 1 && (
            <div className="relative h-0.5" style={{ width: `${(children.length - 1) * 220}px` }}>
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${style.line}`} />
            </div>
          )}

          {/* 子节点容器 */}
          <div className="flex gap-10 pt-2">
            {children.map((childNode, idx) => {
              // 为每个子节点创建虚拟分支节点
              const child = nodes.find(n => n.slug === childNode.slug);
              if (!child) return null;

              const childStyle = LEVEL_STYLES[child.level] ?? LEVEL_STYLES[0];
              const grandChildren = nodes.filter(n => n.parent === child.slug);

              return (
                <div key={child.slug} className="flex flex-col items-center">
                  {/* 垂直连接线 */}
                  <div className={`w-0.5 h-6 bg-gradient-to-b ${childStyle.line}`} />

                  {/* 子节点卡片 */}
                  <Link
                    href={`/nodes/${child.slug}`}
                    className={`block w-44 px-4 py-3 rounded-xl border-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${childStyle.card}`}
                  >
                    <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${childStyle.badge}`}>
                      {childStyle.label}
                    </div>
                    <div className="font-bold text-gray-900 text-sm leading-snug mb-2">{child.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{child.stage}</span>
                      <span className="text-xs leading-none">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span key={i} className={i < child.difficulty ? 'text-yellow-500' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="text-xs text-blue-600 mt-2">{child.resources.length} 条资源</div>
                  </Link>

                  {/* Level 2 和 Level 3 节点 */}
                  {grandChildren.length > 0 && (
                    <>
                      <div className={`w-0.5 h-6 bg-gradient-to-b ${childStyle.line}`} />
                      <div className="flex gap-8 pt-2">
                        {grandChildren.map(grandChild => {
                          const grandStyle = LEVEL_STYLES[grandChild.level] ?? LEVEL_STYLES[0];
                          const greatGrandChildren = nodes.filter(n => n.parent === grandChild.slug);

                          return (
                            <div key={grandChild.slug} className="flex flex-col items-center">
                              <div className={`w-0.5 h-6 bg-gradient-to-b ${grandStyle.line}`} />
                              <Link
                                href={`/nodes/${grandChild.slug}`}
                                className={`block w-44 px-4 py-3 rounded-xl border-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${grandStyle.card}`}
                              >
                                <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${grandStyle.badge}`}>
                                  {grandStyle.label}
                                </div>
                                <div className="font-bold text-gray-900 text-sm leading-snug mb-2">{grandChild.title}</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-600">{grandChild.stage}</span>
                                  <span className="text-xs leading-none">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                      <span key={i} className={i < grandChild.difficulty ? 'text-yellow-500' : 'text-gray-300'}>
                                        ★
                                      </span>
                                    ))}
                                  </span>
                                </div>
                                <div className="text-xs text-blue-600 mt-2">{grandChild.resources.length} 条资源</div>
                              </Link>

                              {/* Level 3 子节点 */}
                              {greatGrandChildren.length > 0 && (
                                <>
                                  <div className={`w-0.5 h-6 bg-gradient-to-b ${grandStyle.line}`} />
                                  <div className="flex gap-6 pt-2">
                                    {greatGrandChildren.map(gc => {
                                      const gcStyle = LEVEL_STYLES[gc.level] ?? LEVEL_STYLES[0];
                                      return (
                                        <div key={gc.slug} className="flex flex-col items-center">
                                          <div className={`w-0.5 h-6 bg-gradient-to-b ${gcStyle.line}`} />
                                          <Link
                                            href={`/nodes/${gc.slug}`}
                                            className={`block w-44 px-4 py-3 rounded-xl border-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${gcStyle.card}`}
                                          >
                                            <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${gcStyle.badge}`}>
                                              {gcStyle.label}
                                            </div>
                                            <div className="font-bold text-gray-900 text-sm leading-snug mb-2">{gc.title}</div>
                                            <div className="flex items-center justify-between">
                                              <span className="text-xs text-gray-600">{gc.stage}</span>
                                              <span className="text-xs leading-none">
                                                {Array.from({ length: 3 }).map((_, i) => (
                                                  <span key={i} className={i < gc.difficulty ? 'text-yellow-500' : 'text-gray-300'}>
                                                    ★
                                                  </span>
                                                ))}
                                              </span>
                                            </div>
                                            <div className="text-xs text-blue-600 mt-2">{gc.resources.length} 条资源</div>
                                          </Link>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
