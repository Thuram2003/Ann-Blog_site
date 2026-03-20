import type { Post, Category } from '@/types';
import { NewsCard } from '@/components/ui/custom/NewsCard';
import { 
  Trophy, 
  Landmark, 
  Mountain, 
  Heart, 
  Stethoscope, 
  TreePine, 
  Camera, 
  Users 
} from 'lucide-react';

interface CategorySectionProps {
  category: Category;
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const categoryIcons: Record<Category, typeof Trophy> = {
  'Sports': Trophy,
  'Politics': Landmark,
  'Tourism': Mountain,
  'Human Interest': Heart,
  'Health': Stethoscope,
  'Environment': TreePine,
  'Pictorial': Camera,
  'Family': Users
};

const categoryColors: Record<Category, string> = {
  'Sports': '#e74c3c',
  'Politics': '#3498db',
  'Tourism': '#27ae60',
  'Human Interest': '#f39c12',
  'Health': '#9b59b6',
  'Environment': '#1abc9c',
  'Pictorial': '#e67e22',
  'Family': '#ff6b9d'
};

export function CategorySection({ category, posts, onPostClick }: CategorySectionProps) {
  if (posts.length === 0) return null;

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 4);
  const Icon = categoryIcons[category];
  const color = categoryColors[category];

  return (
    <section className="py-8">
      <div className="container-ann">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          <h2 className="section-title" style={{ '--accent-color': color } as React.CSSProperties}>
            {category}
          </h2>
          <div 
            className="flex-1 h-px ml-4"
            style={{ backgroundColor: `${color}30` }}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <article 
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg h-full"
              onClick={() => onPostClick(featuredPost)}
            >
              <div className="relative h-full min-h-[300px] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span 
                  className="inline-block px-3 py-1 text-xs font-['Oswald'] uppercase tracking-wider rounded mb-3"
                  style={{ backgroundColor: color }}
                >
                  {featuredPost.category}
                </span>
                <h3 className="font-['Oswald'] text-xl md:text-2xl font-bold leading-tight text-shadow group-hover:text-white/90 transition-colors mb-2">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-200 text-sm line-clamp-2">
                  {featuredPost.excerpt}
                </p>
              </div>
            </article>
          </div>

          {/* Other Posts */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {otherPosts.map((post) => (
              <NewsCard
                key={post.id}
                post={post}
                onClick={() => onPostClick(post)}
                variant="horizontal"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
