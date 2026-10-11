import React from 'react';
import { Link2 } from 'lucide-react';

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16.113 11.543A5 5 0 1 1 11.542 6.97a5 5 0 0 1 4.57 4.573z" /><line x1="16.5" x2="16.51" y1="7.5" y2="7.5" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

export const CampaignSocialLinks: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <a href="#" className="w-12 h-12 rounded-full border-2 border-pink-500 flex items-center justify-center text-pink-500 hover:bg-pink-50 transition-colors">
        <InstagramIcon size={24} />
      </a>
      <a href="#" className="w-12 h-12 rounded-full border-2 border-[#82b5cf] flex items-center justify-center text-[#82b5cf] hover:bg-[#82b5cf]/10 transition-colors">
        <LinkedinIcon size={24} />
      </a>
      <a href="#" className="w-12 h-12 rounded-full border-2 border-brand-primary flex items-center justify-center text-brand-primary hover:bg-brand-primary/10 transition-colors">
        <Link2 size={24} />
      </a>
    </div>
  );
};
