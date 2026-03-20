import { Facebook, Instagram, Youtube, Mail, MessageCircle, Send } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

// X (Twitter) Icon Component
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function TopBar() {
  const { settings } = useSettings();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="top-bar py-2">
      <div className="container-ann flex items-center justify-between">
        {/* Date */}
        <div className="hidden md:flex items-center gap-2 text-gray-300">
          <span className="text-xs">{today}</span>
        </div>

        {/* Contact */}
        <a 
          href={`mailto:${settings.email}`} 
          className="flex items-center gap-2 text-gray-300 hover:text-[#00a7b3] transition-colors text-xs"
        >
          <Mail className="w-3 h-3" />
          <span>Contact Us</span>
        </a>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
           {settings.social_facebook && (
              <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00a7b3] transition-all duration-200 hover:scale-110">
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {settings.social_twitter && (
              <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00a7b3] transition-all duration-200 hover:scale-110">
                <XIcon className="w-4 h-4" />
              </a>
            )}
            {settings.social_instagram && (
              <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00a7b3] transition-all duration-200 hover:scale-110">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {settings.social_youtube && (
              <a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00a7b3] transition-all duration-200 hover:scale-110">
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {settings.social_whatsapp && (
              <a href={settings.social_whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00a7b3] transition-all duration-200 hover:scale-110">
                <MessageCircle className="w-4 h-4" />
              </a>
            )}
            {settings.social_telegram && (
              <a href={settings.social_telegram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00a7b3] transition-all duration-200 hover:scale-110">
                <Send className="w-4 h-4" />
              </a>
            )}
        </div>
      </div>
    </div>
  );
}
