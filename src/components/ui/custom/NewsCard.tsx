import type { Post } from '@/types';
import { Calendar, Eye, User } from 'lucide-react';

interface NewsCardProps {
  post: Post;
  onClick: () => void;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function NewsCard({ post, onClick, variant = 'default' }: NewsCardProps) {
  if (variant === 'horizontal') {
    return (
      <article 
        className="news-card flex gap-4 cursor-pointer group"
        onClick={onClick}
      >
        {/* Image */}
        <div className="news-card-image w-1/3 min-w-[120px] aspect-[4/3] rounded-l-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-3 pr-4 flex flex-col justify-center">
          <span className="category-badge text-[10px] px-2 py-0.5 mb-2 w-fit">
            {post.category}
          </span>
          <h3 className="font-['Oswald'] font-bold text-base leading-tight group-hover:text-[#00a7b3] transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 mb-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {post.views.toLocaleString()}
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article 
        className="group cursor-pointer"
        onClick={onClick}
      >
        <div className="flex gap-3">
          <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-[#00a7b3] font-['Oswald'] uppercase">
              {post.category}
            </span>
            <h4 className="font-['Oswald'] font-bold text-sm leading-tight group-hover:text-[#00a7b3] transition-colors line-clamp-2">
              {post.title}
            </h4>
            <span className="text-[10px] text-gray-400 mt-1 block">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article 
      className="news-card cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="news-card-image aspect-[4/3]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="category-badge">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-['Oswald'] font-bold text-lg leading-tight group-hover:text-[#00a7b3] transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 gap-2">
          <span className="flex items-center gap-1 min-w-0">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{post.author}</span>
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </article>
  );
}
