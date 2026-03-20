import type { Post, Category } from '@/types';
import { NewsCard } from '@/components/ui/custom/NewsCard';
import { ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  category: Category;
  posts: Post[];
  onBack: () => void;
  onPostClick: (post: Post) => void;
}

export function CategoryPage({ category, posts, onBack, onPostClick }: CategoryPageProps) {
  return (
    <div className="py-8 animate-fade-in">
      <div className="container-ann">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-[#00a7b3] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-[#333]">
            {category}
          </h1>
          <span className="text-gray-400 text-sm">
            ({posts.length} {posts.length === 1 ? 'article' : 'articles'})
          </span>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <div 
                key={post.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <NewsCard
                  post={post}
                  onClick={() => onPostClick(post)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📰</span>
            </div>
            <h3 className="font-['Oswald'] text-xl font-bold text-gray-600 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500">
              There are no articles in this category yet. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
