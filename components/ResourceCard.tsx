import { Resource } from '../lib/types';

const TYPE_LABELS: Record<string, string> = {
  article: '文章',
  video: '视频',
  course: '课程',
  tool: '工具',
};

const TYPE_STYLES: Record<string, string> = {
  article: 'bg-blue-100 text-blue-700',
  video: 'bg-red-100 text-red-700',
  course: 'bg-green-100 text-green-700',
  tool: 'bg-indigo-100 text-indigo-700',
};

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="group border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_STYLES[resource.type] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {TYPE_LABELS[resource.type] ?? resource.type}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{resource.title}</h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{resource.description}</p>
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 mt-1 text-sm font-medium text-blue-600 hover:text-blue-800 group-hover:underline transition-colors"
          title={`访问: ${resource.title}`}
        >
          访问 →
        </a>
      </div>
    </div>
  );
}
