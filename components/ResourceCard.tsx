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
  article: {
    badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
    bar: 'bg-blue-500',
    hover: 'hover:border-blue-500 hover:shadow-blue-500/20',
  },
  video: {
    badge: 'bg-red-500/20 text-red-400 border border-red-500/50',
    bar: 'bg-red-500',
    hover: 'hover:border-red-500 hover:shadow-red-500/20',
  },
  course: {
    badge: 'bg-green-500/20 text-green-400 border border-green-500/50',
    bar: 'bg-green-500',
    hover: 'hover:border-green-500 hover:shadow-green-500/20',
  },
  tool: {
    badge: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50',
    bar: 'bg-indigo-500',
    hover: 'hover:border-indigo-500 hover:shadow-indigo-500/20',
  },
};

const DEFAULT_STYLE = {
  badge: 'bg-slate-500/20 text-slate-400 border border-slate-500/50',
  bar: 'bg-slate-500',
  hover: 'hover:border-slate-500 hover:shadow-slate-500/20',
};

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const style = TYPE_STYLES[resource.type] ?? DEFAULT_STYLE;

  return (
    <div
      className={`group flex border border-slate-700 rounded-xl overflow-hidden bg-slate-900 transition-all duration-200 hover:shadow-lg ${style.hover}`}
    >
      <div className={`w-1 flex-shrink-0 ${style.bar}`} />

      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.badge}`}>
                {TYPE_ICONS[resource.type] ?? ''} {TYPE_LABELS[resource.type] ?? resource.type}
              </span>
            </div>
            <h3 className="font-semibold text-white text-sm leading-snug">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
              {resource.description}
            </p>
          </div>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 mt-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 group-hover:underline transition-colors"
            title={`访问: ${resource.title}`}
          >
            访问 →
          </a>
        </div>
      </div>
    </div>
  );
}
