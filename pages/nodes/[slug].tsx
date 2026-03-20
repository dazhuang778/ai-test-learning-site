import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
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

const STAGE_STYLES: Record<string, string> = {
  '入门': 'bg-green-100 text-green-700',
  '进阶': 'bg-blue-100 text-blue-700',
  '高阶': 'bg-purple-100 text-purple-700',
};

interface NodePageProps {
  node: KnowledgeNode;
}

export default function NodePage({ node }: NodePageProps) {
  return (
    <Layout title={node.title} description={node.description}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            知识图谱
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{node.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              {LEVEL_LABELS[node.level]}
            </span>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${STAGE_STYLES[node.stage] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {node.stage}
            </span>
            <span className="text-sm">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={i < node.difficulty ? 'text-yellow-400' : 'text-gray-200'}>
                  ★
                </span>
              ))}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{node.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{node.description}</p>
        </header>

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
  return { props: { node } };
};
