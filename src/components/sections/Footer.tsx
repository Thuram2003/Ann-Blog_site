import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowUp, MessageCircle, Send } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

interface FooterProps {
  onHomeClick: () => void;
}

// X (Twitter) Icon Component
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer({ onHomeClick }: FooterProps) {
  const { settings } = useSettings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Advertise', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  const categories = [
    'Politics',
    'Sports',
    'Health',
    'Environment',
    'Tourism',
    'Family',
    'Human Interest',
    'Pictorial',
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white pt-12 pb-6">
      <div className="container-ann">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div 
              className="flex items-center gap-3 mb-[-20px] cursor-pointer"
              onClick={onHomeClick}
            >
              <img 
                src="/images/ann-logo-main.png" 
                alt="Agbor News Network Logo" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted source for local news, sports, politics, and community updates. 
              Delivering accurate and timely information to the people of {settings.state_region} and beyond.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {settings.social_facebook && (
                <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00a7b3] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.social_twitter && (
                <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00a7b3] transition-colors">
                  <XIcon className="w-4 h-4" />
                </a>
              )}
              {settings.social_instagram && (
                <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00a7b3] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.social_youtube && (
                <a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00a7b3] transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings.social_whatsapp && (
                <a href={settings.social_whatsapp} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00a7b3] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {settings.social_telegram && (
                <a href={settings.social_telegram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00a7b3] transition-colors">
                  <Send className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Grouped Links (Mobile Side-by-Side) */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-['Oswald'] font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-[#00a7b3] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-['Oswald'] font-bold text-lg mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <a 
                      href="#"
                      className="text-gray-400 text-sm hover:text-[#00a7b3] transition-colors"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Oswald'] font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00a7b3] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  {settings.address}, {settings.city}, {settings.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#00a7b3] flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {settings.phone_number}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#00a7b3] flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {settings.email}
                </span>
              </li>
            </ul>


          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Agbor News Network. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-[#00a7b3] transition-colors text-sm"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
