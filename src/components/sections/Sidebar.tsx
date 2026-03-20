import { useState } from 'react';
import type { Post } from '@/types';
import { TrendingUp, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

interface SidebarProps {
  trendingPosts: Post[];
  onPostClick: (post: Post) => void;
}

export function Sidebar({ trendingPosts, onPostClick }: SidebarProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) return;

    setIsSubscribing(true);
    try {
      const { error } = await supabase.from('subscribers').insert([{ email }]);
      
      if (error) {
        if (error.code === '23505') { // PostgreSQL unique violation code
          toast.error('You are already subscribed to the newsletter!');
        } else {
          throw error;
        }
      } else {
        toast.success('Successfully subscribed to the newsletter!');
        setEmail('');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to process your subscription. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <aside className="space-y-6">
      {/* Trending Posts */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-[#00a7b3]" />
          <h3 className="font-['Oswald'] font-bold text-lg">Trending Now</h3>
        </div>

        <div className="space-y-4">
          {trendingPosts.map((post, index) => (
            <div key={post.id} className="group cursor-pointer" onClick={() => onPostClick(post)}>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-[#00a7b3] text-white text-sm font-bold rounded group-hover:scale-110 transition-transform">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-['Oswald'] font-bold text-sm leading-tight group-hover:text-[#00a7b3] transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {post.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Newsletter */}
      <div className="bg-gradient-to-br from-[#00a7b3] to-[#008891] rounded-xl shadow-md p-5 text-white">
        <h3 className="font-['Oswald'] font-bold text-lg mb-2">Newsletter</h3>
        <p className="text-sm text-white/80 mb-4">
          Subscribe to get the latest news delivered to your inbox.
        </p>
        <form className="space-y-3" onSubmit={handleSubscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-2.5 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            required
            disabled={isSubscribing}
          />
          <button
            type="submit"
            disabled={isSubscribing}
            className="w-full bg-white flex items-center justify-center gap-2 text-[#00a7b3] font-['Oswald'] font-bold uppercase text-sm py-2.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-80"
          >
            {isSubscribing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Subscribe'}
          </button>
        </form>
      </div>
    </aside>
  );
}
