import { useEffect, useState } from 'react';
import type { Post } from '@/types';
import { Calendar, User, Eye, ArrowLeft, Share2, X, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { NewsCard } from '@/components/ui/custom/NewsCard';

interface SinglePostProps {
  post: Post;
  relatedPosts: Post[];
  onBack: () => void;
  onPostClick: (post: Post) => void;
  isPreview?: boolean;
  onExitPreview?: () => void;
}

export function SinglePost({ post, relatedPosts, onBack, onPostClick, isPreview = false, onExitPreview }: SinglePostProps) {
  const [copied, setCopied] = useState(false);

  // Increment views when post is opened
  useEffect(() => {
    // Views increment logic would go here
  }, [post.id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = encodeURIComponent(post.title);
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Post link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <article className="py-8 animate-fade-in">
      {/* Preview Banner */}
      {isPreview && (
        <div className="bg-amber-500 text-white py-3 mb-6">
          <div className="container-ann flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-['Oswald'] font-bold uppercase tracking-wide">Preview Mode</span>
              <span className="text-amber-100 text-sm hidden sm:inline">This is how your post will appear to readers</span>
            </div>
            <button
              onClick={onExitPreview}
              className="flex items-center gap-2 bg-white text-amber-600 px-4 py-1.5 rounded-lg hover:bg-amber-50 transition-colors font-['Oswald'] text-sm uppercase"
            >
              <X className="w-4 h-4" />
              Exit Preview
            </button>
          </div>
        </div>
      )}

      <div className="container-ann">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-[#00a7b3] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{isPreview ? 'Back to Editor' : 'Back to News'}</span>
            </button>

            {/* Category Badge */}
            <span className="category-badge mb-4 inline-block">
              {post.category}
            </span>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden mb-6 shadow-md border border-gray-100 bg-gray-50 flex items-center justify-center">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto max-h-[600px] object-contain"
              />
            </div>

            {/* Premium Native Share Block */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Share Article</span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Facebook Hex #1877F2 */}
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2 px-3 py-2 bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2] hover:text-white rounded-lg transition-all font-medium text-sm"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                
                {/* X (Twitter) Hex #000000 */}
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-black hover:bg-black hover:text-white rounded-lg transition-all font-medium text-sm"
                  aria-label="Share on X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="hidden sm:inline">Post</span>
                </button>

                {/* LinkedIn Hex #0A66C2 */}
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center gap-2 px-3 py-2 bg-[#0a66c2]/10 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white rounded-lg transition-all font-medium text-sm"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                  <span className="hidden sm:inline">LinkedIn</span>
                </button>

                {/* WhatsApp Hex #25D366 */}
                <button
                  onClick={() => {
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + window.location.href)}`, '_blank');
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-[#25d366]/10 text-[#1da851] hover:bg-[#25d366] hover:text-white rounded-lg transition-all font-medium text-sm"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="hidden sm:inline">Send</span>
                </button>

                <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>

                {/* Secure Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium text-sm ${copied ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  aria-label="Copy Link"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? "Copied!" : "Link"}</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-['Oswald'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#333] leading-tight mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
              <span className="flex items-center gap-1 font-medium text-gray-700">
                <User className="w-4 h-4 text-[#00a7b3]" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views.toLocaleString()} views
              </span>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-6 font-medium">
                {post.excerpt}
              </p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <span className="text-sm text-gray-500 mb-3 block">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#00a7b3] hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Posts */}
            <div className="bg-white rounded-xl shadow-md p-5 sticky top-24">
              <h3 className="font-['Oswald'] font-bold text-lg mb-5">Related Posts</h3>
              <div className="space-y-4">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((relatedPost) => (
                    <NewsCard
                      key={relatedPost.id}
                      post={relatedPost}
                      onClick={() => onPostClick(relatedPost)}
                      variant="compact"
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No related posts found.</p>
                )}
              </div>


            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
