import type { Post } from '@/types';
import { AlertCircle } from 'lucide-react';

interface BreakingNewsProps {
  post?: Post;
  onClick: () => void;
}

export function BreakingNews({ post, onClick }: BreakingNewsProps) {
  if (!post) return null;

  return (
    <div className="breaking-news-bar py-3 overflow-hidden">
      <div className="container-ann flex items-center gap-4">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded">
          <AlertCircle className="w-4 h-4 animate-pulse" />
          <span className="font-['Oswald'] font-bold text-sm uppercase tracking-wider">
            Breaking News
          </span>
        </div>

        {/* Ticker */}
        <div className="flex-1 overflow-hidden">
          <button
            onClick={onClick}
            className="ticker-animation whitespace-nowrap text-sm font-medium hover:underline text-left"
          >
            {post.title}
          </button>
        </div>

        {/* Time Badge */}
        <div className="hidden sm:flex-shrink-0 text-xs bg-white/20 px-3 py-1 rounded">
          Just Now
        </div>
      </div>
    </div>
  );
}
