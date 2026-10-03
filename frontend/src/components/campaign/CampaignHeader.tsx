import React from 'react';
import { Eye } from 'lucide-react';

interface CampaignHeaderProps {
  title: string;
  description: string;
  type?: 'Publica' | 'Privada';
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({ title, description, type = 'Publica' }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-brand-primary mb-4 text-sm font-medium">
        <Eye size={18} />
        <span>{type === 'Publica' ? 'Pública' : 'Privada'}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-6 leading-tight">
        {title}
      </h1>
      <p className="text-brand-primary/80 leading-relaxed text-sm sm:text-base">
        {description}
      </p>
    </div>
  );
};
