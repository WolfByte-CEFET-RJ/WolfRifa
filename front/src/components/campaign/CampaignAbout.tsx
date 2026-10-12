import React from 'react';

interface CampaignAboutProps {
  content: string;
}

export const CampaignAbout: React.FC<CampaignAboutProps> = ({ content }) => {
  return (
    <div className="border border-gray-100 rounded-2xl p-6 sm:p-8 bg-white shadow-sm mt-4">
      <h2 className="text-2xl font-bold text-brand-primary mb-6">Sobre a campanha</h2>
      <p className="text-brand-primary/80 leading-relaxed text-sm sm:text-base">
        {content}
      </p>
    </div>
  );
};
