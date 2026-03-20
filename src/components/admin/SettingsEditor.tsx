import React, { useState, useEffect } from 'react';
import { useSettings, UserProfile } from '@/contexts/SettingsContext';
import { Loader2, Save, User, Shield, MapPin, Image as ImageIcon, X, Eye, EyeOff } from 'lucide-react';
import { Country, State, City } from 'country-state-city';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { SearchableSelect } from '@/components/ui/SearchableSelect';

export function SettingsEditor() {
  const { settings, isLoading, updateSettings } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  
  // UI Tabs
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'location'>('personal');

  // Security Form
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password Visibility
  const [showPasswords, setShowPasswords] = useState(false);

  // Image Uploading
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isLoading && settings) {
      setFormData(settings);
      setImagePreview(settings.image || '');
    }
  }, [settings, isLoading]);

  if (isLoading || !formData) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-slate-100">
        <Loader2 className="w-10 h-10 animate-spin text-[#00a7b3]" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setIsSaving(true);
    
    let finalPayload = { ...formData };

    // Validations: Security
    if (oldPassword || newPassword || confirmPassword) {
      if (oldPassword !== settings.password) {
        toast.error("Old password does not match current records.");
        setIsSaving(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("New password and matching confirm password do not match.");
        setIsSaving(false);
        return;
      }
      if (newPassword.length < 6) {
        toast.error("New password must be at least 6 characters.");
        setIsSaving(false);
        return;
      }
      finalPayload.password = newPassword;
    }

    // Storage Uploads: Avatar
    if (imageFile) {
      setIsUploading(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `avatar-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, imageFile);
        
      if (error) {
        console.error("Upload error: ", error);
        toast.error("Failed to upload avatar to Supabase Cloud.");
        setIsUploading(false);
        setIsSaving(false);
        return;
      }
      
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);
        
      finalPayload.image = publicUrlData.publicUrl;
      setIsUploading(false);
    }

    // Commit changes
    const success = await updateSettings(finalPayload);
    if (success) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setImageFile(null);
    }
    setIsSaving(false);
  };

  // Maps Engine
  const countries = Country.getAllCountries();
  const selectedCountryIso = countries.find(c => c.name === formData.country)?.isoCode;
  const states = selectedCountryIso ? State.getStatesOfCountry(selectedCountryIso) : [];
  const selectedStateIso = states.find(s => s.name === formData.state_region)?.isoCode;
  const cities = selectedCountryIso && selectedStateIso ? City.getCitiesOfState(selectedCountryIso, selectedStateIso) : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
      
      {/* Super Responsive Tab Header */}
      <div className="p-3 sm:p-0 sm:border-b sm:border-slate-100 bg-slate-100 sm:bg-slate-50/50">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 no-scrollbar">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 font-medium text-sm sm:text-base transition-all flex-1 rounded-xl sm:rounded-none sm:border-b-2 sm:-mb-[1px] ${activeTab === 'personal' ? 'text-[#00a7b3] sm:border-[#00a7b3] bg-white shadow-sm sm:shadow-none' : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200 sm:hover:bg-slate-100'}`}
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" /> <span>Personal Details</span>
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 font-medium text-sm sm:text-base transition-all flex-1 rounded-xl sm:rounded-none sm:border-b-2 sm:-mb-[1px] ${activeTab === 'security' ? 'text-[#00a7b3] sm:border-[#00a7b3] bg-white shadow-sm sm:shadow-none' : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200 sm:hover:bg-slate-100'}`}
          >
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" /> <span>Security Profile</span>
          </button>
          <button 
            onClick={() => setActiveTab('location')}
            className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 font-medium text-sm sm:text-base transition-all flex-1 rounded-xl sm:rounded-none sm:border-b-2 sm:-mb-[1px] ${activeTab === 'location' ? 'text-[#00a7b3] sm:border-[#00a7b3] bg-white shadow-sm sm:shadow-none' : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200 sm:hover:bg-slate-100'}`}
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" /> <span>Location Context</span>
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* PERSONAL DETAILS TAB */}
          {activeTab === 'personal' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Avatar Drag/Drop Column */}
                <div className="w-full lg:w-1/3 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
                    Profile Avatar
                  </label>
                  <div className="relative w-full max-w-[220px]">
                    {imagePreview ? (
                      <div className="relative group p-2">
                        <div className="aspect-square rounded-full overflow-hidden border-4 border-slate-100 shadow-sm transition-transform group-hover:scale-[1.02]">
                          <img 
                            src={imagePreview} 
                            alt="Avatar Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setFormData(prev => prev ? ({ ...prev, image: '' }) : null);
                            setImageFile(null);
                          }}
                          className="absolute top-0 right-0 sm:right-2 w-9 h-9 bg-white text-slate-500 border-2 border-slate-100 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-lg z-10 hover:scale-110"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-square rounded-full border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-[#00a7b3] hover:bg-[#00a7b3]/5 transition-all">
                        <ImageIcon className="w-10 h-10 text-slate-400 mb-3" />
                        <span className="text-sm font-medium text-slate-500 px-6">Click or drag an image here</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-400 mt-4 leading-relaxed max-w-[220px]">Recommended: Square JPG or PNG. Max size 2MB for optimal loading speeds.</p>
                </div>

                {/* Info Column */}
                <div className="w-full lg:w-2/3 space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all text-slate-900 font-medium" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all text-slate-900 font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Contact Phone</label>
                      <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all text-slate-900 font-medium" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Connects nested inside Personal */}
              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-xl font-extrabold text-slate-800 mb-6 tracking-tight border-l-4 border-[#00a7b3] pl-3">Social Networks API</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Facebook Page</label>
                    <input type="url" name="social_facebook" value={formData.social_facebook} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="https://facebook.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">X (Twitter)</label>
                    <input type="url" name="social_twitter" value={formData.social_twitter} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/20 transition-all" placeholder="https://x.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Instagram Profile</label>
                    <input type="url" name="social_instagram" value={formData.social_instagram} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all" placeholder="https://instagram.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">YouTube Channel</label>
                    <input type="url" name="social_youtube" value={formData.social_youtube} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all" placeholder="https://youtube.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">WhatsApp Direct</label>
                    <input type="url" name="social_whatsapp" value={formData.social_whatsapp} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" placeholder="https://wa.me/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Telegram Channel</label>
                    <input type="url" name="social_telegram" value={formData.social_telegram} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all" placeholder="https://t.me/..." />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in max-w-2xl mx-auto py-4">
              <div className="bg-amber-50 border border-amber-200/50 p-5 rounded-xl mb-8 flex gap-4 items-start shadow-sm">
                 <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                 <div>
                   <h4 className="font-bold text-amber-900 mb-1">Authorization Required</h4>
                   <p className="text-sm font-medium text-amber-800/80 leading-relaxed">
                     To update your security payload, you must provide your current active password. Generating a new cryptographic key will immediately disconnect previous active sessions.
                   </p>
                 </div>
              </div>
              
              <div className="space-y-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                {/* Passwords */}
                <div className="relative">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Current Integrity Password</label>
                  <div className="relative">
                    <input 
                      type={showPasswords ? "text" : "password"} 
                      value={oldPassword} 
                      onChange={(e) => setOldPassword(e.target.value)} 
                      className="w-full px-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all font-mono tracking-widest text-lg" 
                      placeholder="••••••••" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00a7b3] transition-colors"
                    >
                      {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 relative">
                  <label className="block text-sm font-bold text-slate-700 mb-2">New Identity Password</label>
                  <div className="relative">
                    <input 
                      type={showPasswords ? "text" : "password"} 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      className="w-full px-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all font-mono tracking-widest text-lg" 
                      placeholder="••••••••" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00a7b3] transition-colors"
                    >
                      {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">Minimum 6 characters strongly enforced.</p>
                </div>

                <div className="relative">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Identity Payload</label>
                  <div className="relative">
                    <input 
                      type={showPasswords ? "text" : "password"} 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="w-full px-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all font-mono tracking-widest text-lg" 
                      placeholder="••••••••" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00a7b3] transition-colors"
                    >
                      {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LOCATION TAB */}
          {activeTab === 'location' && (
            <div className="space-y-6 animate-fade-in pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sovereign Country</label>
                  <div className="bg-slate-50 rounded-xl p-1 border border-slate-200 focus-within:border-[#00a7b3] focus-within:ring-4 focus-within:ring-[#00a7b3]/10 transition-all">
                    <SearchableSelect 
                      options={countries.map(c => ({ label: c.name, value: c.name }))}
                      value={formData.country} 
                      onChange={(val) => {
                        setFormData({ ...formData, country: val, state_region: '', city: '' });
                      }} 
                      placeholder="Search Nation..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">State / Region Sector</label>
                  <div className={`bg-slate-50 rounded-xl p-1 border border-slate-200 transition-all ${!selectedCountryIso ? 'opacity-50 cursor-not-allowed bg-slate-100' : 'focus-within:border-[#00a7b3] focus-within:ring-4 focus-within:ring-[#00a7b3]/10'}`}>
                    <SearchableSelect 
                      options={states.map(s => ({ label: s.name, value: s.name }))}
                      value={formData.state_region} 
                      onChange={(val) => {
                        setFormData({ ...formData, state_region: val, city: '' });
                      }} 
                      placeholder="Search Framework Region..."
                      disabled={!selectedCountryIso}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Metropolis Array (City)</label>
                  <div className={`bg-slate-50 rounded-xl p-1 border border-slate-200 transition-all ${!selectedStateIso ? 'opacity-50 cursor-not-allowed bg-slate-100' : 'focus-within:border-[#00a7b3] focus-within:ring-4 focus-within:ring-[#00a7b3]/10'}`}>
                    <SearchableSelect 
                      options={cities.map(c => ({ label: c.name, value: c.name }))}
                      value={formData.city} 
                      onChange={(val) => {
                        setFormData({ ...formData, city: val });
                      }} 
                      placeholder="Search City Grid..."
                      disabled={!selectedStateIso}
                    />
                  </div>
                </div>

                <div className="md:col-span-3 mt-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Precise Street Vector</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all text-slate-900 font-medium" 
                    placeholder="Enter precise manual address here (Building grid coordinates, street layout vectors...)"
                  />
                  <p className="text-sm font-medium text-slate-400 mt-2 ml-1">Combine your explicit local markers here to finalize geographic mapping.</p>
                </div>

              </div>
            </div>
          )}

          {/* Persistent Action Footer */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-8 border-t border-slate-100 mt-10">
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase tracking-wider text-sm shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 transform hover:-translate-y-0.5 active:scale-95"
            >
              {(isSaving || isUploading) ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isUploading ? 'Encrypting Media Payload...' : isSaving ? 'Executing Database Write...' : 'Save Site Settings'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
