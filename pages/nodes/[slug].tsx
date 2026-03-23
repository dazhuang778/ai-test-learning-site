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

interface NodePageProps {
  node: KnowledgeNode;
  bodyHtml: string | null;
}

export default function NodePage({ node, bodyHtml }: NodePageProps) {
  const gradient = LEVEL_GRADIENTS[node.level] ?? LEVEL_GRADIENTS[0];

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
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-xl font-semibold text-gray-900">精选学习资源</h2>
            <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {node.resources.length} 条
            </span>
          </div>
          <div className="space-y-3">
            {node.resources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
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
