import type { Post } from '@/types';
import { Calendar, Eye } from 'lucide-react';

interface HeroSectionProps {
  featuredPosts: Post[];
  onPostClick: (post: Post) => void;
}

export function HeroSection({ featuredPosts, onPostClick }: HeroSectionProps) {
  const mainPosts = featuredPosts.slice(0, 2);    // First 2 posts = main
  const sidePosts = featuredPosts.slice(2, 5);   // Next 3 posts = side

  if (mainPosts.length === 0) return null;

  return (
    <section className="py-6">
      <div className="container-ann">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* LEFT SIDE: 2 Main Posts (3 columns) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {mainPosts.map((post, index) => (
              <article 
                key={post.id}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-xl flex-1 min-h-[250px]"
                onClick={() => onPostClick(post)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-full min-h-[250px] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="category-badge mb-3 inline-block">
                    {post.category}
                  </span>
                  <h2 className="font-['Oswald'] text-xl md:text-2xl lg:text-3xl font-bold mb-3 leading-tight text-shadow group-hover:text-[#00a7b3] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-200 text-sm mb-4 line-clamp-2 max-w-2xl">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* RIGHT SIDE: 3 Side Posts (2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {sidePosts.map((post, index) => (
              <article
                key={post.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg flex-1 min-h-[160px]"
                onClick={() => onPostClick(post)}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-full min-h-[160px] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-['Oswald'] uppercase tracking-wider bg-[#00a7b3] rounded mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-['Oswald'] text-sm md:text-base font-bold leading-tight text-shadow group-hover:text-[#00a7b3] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}