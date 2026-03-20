import { useState } from 'react';
import type { Post, Category } from '@/types';
import { CATEGORIES } from '@/types';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Save, Eye, Image as ImageIcon, X, Loader2, LayoutPanelLeft } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/SearchableSelect';

interface PostEditorProps {
  post?: Post | null;
  onSave: (post: Omit<Post, 'id' | 'views'>) => Promise<void>;
  onUpdate?: (id: string, post: Partial<Post>) => Promise<void>;
  onCancel: () => void;
  onPreview: (post: Post) => void;
}

export function PostEditor({ post, onSave, onUpdate, onCancel, onPreview }: PostEditorProps) {
  const isEditing = !!post;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '',
    category: post?.category || CATEGORIES[0],
    author: post?.author || 'ANN Editorial Team',
    date: post?.date || new Date().toISOString().split('T')[0],
    featured: post?.featured || false,
    breaking: post?.breaking || false,
    tags: post?.tags?.join(', ') || ''
  });

  const [imagePreview, setImagePreview] = useState(post?.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return toast.error("Title and Content are strongly required vectors.");
    
    setIsSubmitting(true);
    let finalImageUrl = formData.image;

    // Upload to Supabase Storage if there's a new file
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, imageFile);
        
      if (error) {
        setIsSubmitting(false);
        console.error("Upload error: ", error);
        return toast.error("Failed to execute media payload strictly to Supabase Storage.");
      }
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);
        
      finalImageUrl = publicUrlData.publicUrl;
    } else if (!finalImageUrl && !isEditing) {
      // Default placeholder if none
      finalImageUrl = '/images/placeholder.jpg';
    }

    const postData = {
      ...formData,
      image: finalImageUrl,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    try {
      if (isEditing && post && onUpdate) {
        await onUpdate(post.id, postData);
        toast.success("Post successfully integrated across the live cluster!");
      } else {
        await onSave(postData as Omit<Post, 'id' | 'views'>);
        toast.success("New payload fully deployed to operational production feeds!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Severe Database connection fault detected.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    const previewPost: Post = {
      id: post?.id || 'preview',
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image || '/images/placeholder.jpg',
      category: formData.category as Category,
      author: formData.author,
      date: formData.date,
      views: post?.views || 0,
      featured: formData.featured,
      breaking: formData.breaking,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    onPreview(previewPost);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans mb-10 pb-20">
      
      {/* Super Responsive Sticky Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="p-2 -ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors inline-block"
                title="Return gracefully"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
                <div className="w-10 h-10 bg-[#00a7b3]/10 flex items-center justify-center rounded-xl text-[#00a7b3]">
                  <LayoutPanelLeft className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight uppercase leading-none">
                    {isEditing ? 'Compile Overwrite' : 'Create New Vector'}
                  </h1>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{isEditing ? 'Editing Live Production Node' : 'Drafting Fresh Schema'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center w-full justify-between sm:w-auto gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={handlePreview}
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm uppercase tracking-wider"
              >
                <Eye className="w-4 h-4" />
                <span>Live View</span>
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 bg-[#00a7b3] text-white px-5 py-2.5 sm:px-8 sm:py-3 rounded-xl hover:bg-[#008891] transition-all font-bold uppercase tracking-wider text-sm shadow-xl shadow-[#00a7b3]/20 hover:shadow-[#00a7b3]/40 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{isEditing ? 'Deploy Changes' : 'Initialize Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Payload */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <form id="editor-form" className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Main Primary Content Sector */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Title Node */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-focus-within:bg-[#00a7b3] transition-colors" />
              <label className="block text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">
                Title String Header *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter master title syntax here..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 text-lg sm:text-xl tracking-tight font-medium transition-all"
                required
              />
            </div>

            {/* Excerpt Node */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-focus-within:bg-[#00a7b3] transition-colors" />
              <label className="block text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">
                Micro Excerpt Buffer *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                placeholder="Declare brief front-page summary node..."
                rows={3}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 resize-none font-medium transition-all"
                required
              />
            </div>

            {/* Markdown Syntax Body Content Node */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 relative overflow-hidden group flex-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-focus-within:bg-[#00a7b3] transition-colors" />
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                 <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
                   HTML Paragraph Pipeline *
                 </label>
                 <span className="bg-slate-100 text-slate-500 font-mono text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest leading-none">Standard Txt</span>
              </div>
              <textarea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Start compiling syntax logic blocks here..."
                rows={18}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 resize-y font-mono text-sm leading-relaxed transition-all shadow-inner"
                required
              />
              <div className="flex items-center justify-between mt-3 text-xs font-semibold text-slate-400">
                <p>Use strict line breaks to structure paragraph branches.</p>
                <p>{formData.content.length} bytes loaded</p>
              </div>
            </div>
          </div>

          {/* Right Architecture Sidebar Framework */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Visual Media Node */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-slate-400" /> Hero Graphic Image
              </label>
              <div className="relative">
                {imagePreview ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-inner group">
                    <img 
                      src={imagePreview} 
                      alt="Preview Buffer" 
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, image: '' }));
                        setImageFile(null);
                      }}
                      className="absolute top-3 right-3 w-9 h-9 bg-slate-900/60 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors backdrop-blur-md shadow-xl z-20"
                      title="Cancel and remove image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-slate-300 bg-slate-50 rounded-xl cursor-pointer hover:border-[#00a7b3] hover:bg-[#00a7b3]/5 transition-all group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-[#00a7b3] transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-slate-500 group-hover:text-[#00a7b3] transition-colors">Import Cloud Image</span>
                    <span className="text-xs font-medium text-slate-400 mt-1">Accepts PNG/JPG stream</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* System Metadata Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 flex flex-col gap-6">
              
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <div className="w-2 h-6 bg-slate-800 rounded-sm" />
                <h3 className="font-extrabold text-lg text-slate-900 tracking-tight uppercase">Core Routing Meta</h3>
              </div>

              {/* Taxonomy Select Array */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  Category Route Branch *
                </label>
                <div className="bg-slate-50 rounded-xl p-1 border border-slate-200 focus-within:border-[#00a7b3] focus-within:ring-4 focus-within:ring-[#00a7b3]/10 transition-all">
                  <SearchableSelect
                    options={CATEGORIES.map(cat => ({ label: cat, value: cat }))}
                    value={formData.category}
                    onChange={(val) => handleChange('category', val)}
                  />
                </div>
              </div>

              {/* Author Signature */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  Origin Author Node
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleChange('author', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 font-medium transition-all"
                />
              </div>

              {/* Temporal Clock */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  System Timestamp Override
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 font-mono text-sm transition-all"
                />
              </div>

              {/* Metadata Tags */}
              <div className="pb-2">
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  Search Engine Lexical Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  placeholder="syntax, grid, layout"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-slate-800 transition-all font-mono text-sm"
                />
              </div>

              {/* Boolean Toggles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 pt-4 border-t border-slate-100">
                <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all ${formData.featured ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                    className="w-5 h-5 text-emerald-500 border-slate-300 rounded focus:ring-emerald-500 bg-white"
                  />
                  <div>
                    <span className="block text-sm font-bold text-slate-800 leading-none mb-1">Featured Layout</span>
                    <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Global Override</span>
                  </div>
                </label>
                <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all ${formData.breaking ? 'border-rose-500 bg-rose-50' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                  <input
                    type="checkbox"
                    checked={formData.breaking}
                    onChange={(e) => handleChange('breaking', e.target.checked)}
                    className="w-5 h-5 text-rose-500 border-slate-300 rounded focus:ring-rose-500 bg-white"
                  />
                  <div>
                    <span className="block text-sm font-bold text-slate-800 leading-none mb-1">Breaking Syntax</span>
                    <span className="block text-[10px] font-bold text-rose-600 uppercase tracking-widest leading-none">Emergency Broadcast</span>
                  </div>
                </label>
              </div>

            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
