import { Resource } from '../lib/types';

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

const TYPE_STYLES: Record<string, { badge: string; bar: string; hover: string }> = {
  article: { badge: 'bg-blue-100 text-blue-700', bar: 'bg-blue-500', hover: 'hover:border-blue-300' },
  video:   { badge: 'bg-red-100 text-red-700',   bar: 'bg-red-500',  hover: 'hover:border-red-300' },
  course:  { badge: 'bg-green-100 text-green-700', bar: 'bg-green-500', hover: 'hover:border-green-300' },
  tool:    { badge: 'bg-indigo-100 text-indigo-700', bar: 'bg-indigo-500', hover: 'hover:border-indigo-300' },
};

const DEFAULT_STYLE = { badge: 'bg-gray-100 text-gray-600', bar: 'bg-gray-400', hover: 'hover:border-gray-300' };

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const style = TYPE_STYLES[resource.type] ?? DEFAULT_STYLE;

  return (
    <div className={`group flex border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-200 hover:shadow-md ${style.hover}`}>
      {/* Left color bar */}
      <div className={`w-1 flex-shrink-0 ${style.bar}`} />

      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.badge}`}>
                {TYPE_ICONS[resource.type] ?? ''} {TYPE_LABELS[resource.type] ?? resource.type}
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
    </div>
  );
}
