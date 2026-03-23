import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Layout from '../../components/Layout';
import ResourceCard from '../../components/ResourceCard';
import { getAllNodes, getNodeBySlug } from '../../lib/nodes';
import { KnowledgeNode } from '../../lib/types';

const LEVEL_LABELS: Record<number, string> = {
  0: 'Level 0 · 前置基础',
  1: 'Level 1 · 核心技能',
  2: 'Level 2 · 进阶技能',
  3: 'Level 3 · 综合实践',
};

const LEVEL_GRADIENTS: Record<number, string> = {
  0: 'from-purple-600 via-violet-600 to-purple-800',
  1: 'from-blue-600 via-blue-500 to-blue-800',
  2: 'from-green-600 via-emerald-500 to-green-800',
  3: 'from-orange-500 via-amber-500 to-orange-700',
};

const STAGE_STYLES: Record<string, string> = {
  '入门': 'bg-white/20 text-white',
  '进阶': 'bg-white/20 text-white',
  '高阶': 'bg-white/20 text-white',
};

// 资源分组顺序：课程 → 工具 → 文章 → 视频（学习路径优先）
const TYPE_ORDER = ['course', 'tool', 'article', 'video'] as const;

const TYPE_LABELS: Record<string, string> = {
  article: '文章',
  video: '视频',
  course: '课程',
  tool: '工具',
};

const TYPE_ICONS: Record<string, string> = {
  article: '📄',
  video: '🎬',
  course: '🎓',
  tool: '🛠️',
};

interface NodePageProps {
  node: KnowledgeNode;
  bodyHtml: string | null;
}

export default function NodePage({ node, bodyHtml }: NodePageProps) {
  const gradient = LEVEL_GRADIENTS[node.level] ?? LEVEL_GRADIENTS[0];

  // 过滤状态：'all' 或具体 type
  const [activeType, setActiveType] = useState<string>('all');

  // 当前节点实际存在的类型，按 TYPE_ORDER 排序
  const presentTypes = TYPE_ORDER.filter(t =>
    node.resources.some(r => r.type === t)
  );

  // 当前展示的资源（过滤后）
  const filteredResources = activeType === 'all'
    ? node.resources
    : node.resources.filter(r => r.type === activeType);

  return (
    <Layout title={node.title} description={node.description}>
      {/* Banner */}
      <div className={`bg-gradient-to-br ${gradient} px-4 py-10 sm:py-14`}>
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              知识图谱
            </Link>
            <span>/</span>
            <span className="text-white/90">{node.title}</span>
          </nav>

          {/* Tags & difficulty */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-medium bg-white/20 text-white px-2.5 py-1 rounded-full">
              {LEVEL_LABELS[node.level]}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STAGE_STYLES[node.stage] ?? 'bg-white/20 text-white'}`}>
              {node.stage}
            </span>
            <span className="text-sm">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={i < node.difficulty ? 'text-yellow-300' : 'text-white/20'}>
                  ★
                </span>
              ))}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow">{node.title}</h1>
          <p className="text-white/80 text-lg leading-relaxed">{node.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Body */}
        {bodyHtml && (
          <div
            className="prose prose-gray max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        )}

        {/* Resources */}
        <section>
          {/* 标题行：总数 badge 不随过滤变化 */}
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">精选学习资源</h2>
            <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {node.resources.length} 条
            </span>
          </div>

          {/* 类型过滤 chips：移动端横向可滚动 */}
          {presentTypes.length > 1 && (
            <div className="overflow-x-auto pb-2 mb-6">
              <div className="flex gap-2 whitespace-nowrap">
                {/* 全部 chip */}
                <button
                  onClick={() => setActiveType('all')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeType === 'all'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  全部
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeType === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {node.resources.length}
                  </span>
                </button>

                {/* 各类型 chip */}
                {presentTypes.map(type => {
                  const count = node.resources.filter(r => r.type === type).length;
                  const isActive = activeType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {TYPE_ICONS[type]} {TYPE_LABELS[type]}
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 资源列表 */}
          {activeType === 'all' ? (
            /* 全部视图：按类型分组，带 section header */
            <div className="space-y-8">
              {presentTypes.map(type => {
                const group = node.resources.filter(r => r.type === type);
                return (
                  <div key={type}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base font-semibold text-gray-700">
                        {TYPE_ICONS[type]} {TYPE_LABELS[type]}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {group.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {group.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : filteredResources.length > 0 ? (
            /* 单类型视图：无 section header */
            <div className="space-y-3">
              {filteredResources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          ) : (
            /* 空状态 */
            <div className="text-center py-12 text-gray-400">
              该分类暂无资源
            </div>
          )}
        </section>

        {/* Back */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            ← 返回知识图谱
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const nodes = getAllNodes();
  return {
    paths: nodes.map(n => ({ params: { slug: n.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<NodePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const node = getNodeBySlug(slug);
  if (!node) return { notFound: true };

  let bodyHtml: string | null = null;
  if (node.body) {
    const processed = await remark().use(remarkHtml).process(node.body);
    bodyHtml = String(processed);
  }

  return { props: { node, bodyHtml } };
};
