import type { Post } from '@/types';
import { NewsCard } from '@/components/ui/custom/NewsCard';
import { ArrowLeft, Search } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  results: Post[];
  onBack: () => void;
  onPostClick: (post: Post) => void;
}

export function SearchResults({ query, results, onBack, onPostClick }: SearchResultsProps) {
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
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#00a7b3]" />
            <h1 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-[#333]">
              Search Results
            </h1>
          </div>
        </div>

        {/* Search Info */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <p className="text-gray-600">
            Showing results for: <span className="font-bold text-[#00a7b3]">"{query}"</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Found {results.length} {results.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((post, index) => (
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
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-['Oswald'] text-xl font-bold text-gray-600 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any articles matching "{query}". 
              Try using different keywords or check your spelling.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
