import React from 'react';

interface CampaignImageProps {
  src: string;
  alt: string;
  badgeText: string;
  badgeIcon?: React.ReactNode;
}

export const CampaignImage: React.FC<CampaignImageProps> = ({ src, alt, badgeText, badgeIcon }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden w-full aspect-[4/3] sm:aspect-video object-cover border-4 border-brand-primary/10 shadow-sm">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 bg-brand-primary/90 text-white px-4 py-2.5 rounded-full flex items-center gap-2 backdrop-blur-sm">
        {badgeIcon}
        <span className="font-medium text-sm">{badgeText}</span>
      </div>
    </div>
  );
};
