import type { Post } from '@/types';
import { NewsCard } from '@/components/ui/custom/NewsCard';

interface LatestNewsProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export function LatestNews({ posts, onPostClick }: LatestNewsProps) {
  return (
    <section className="py-8">
      <div className="container-ann">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="section-title">Latest News</h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <div 
              key={post.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <NewsCard
                post={post}
                onClick={() => onPostClick(post)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
