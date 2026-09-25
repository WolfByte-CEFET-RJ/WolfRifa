import React from 'react';
import { Calendar } from 'lucide-react';

export interface CampaignProps {
  id: string;
  type: 'vaquinha' | 'rifa';
  title: string;
  description: string;
  imageUrl: string;
  targetDate?: string;
  pricePerTicket?: string;
  drawDate?: string;
}

export const CampaignCard: React.FC<{ campaign: CampaignProps }> = ({ campaign }) => {
  const isRifa = campaign.type === 'rifa';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-brand-primary-light/40 transition-all duration-300 flex flex-col group cursor-pointer">
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-brand-primary-light/30">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />


        <div className="absolute top-3 left-3 bg-brand-primary text-white font-medium text-xs sm:text-sm px-4 py-1 rounded-full shadow-sm">
          {isRifa ? 'Rifa' : 'Vaquinha'}
        </div>
      </div>


      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-xl text-brand-title mb-2 group-hover:text-brand-primary transition-colors">
            {campaign.title}
          </h3>
          <p className="text-brand-body text-sm leading-relaxed line-clamp-2 mb-4">
            {campaign.description}
          </p>
        </div>


        <div className="pt-3 border-t border-brand-primary-light/30 flex flex-col gap-2 text-xs sm:text-sm text-brand-body">
          {isRifa ? (
            <>
              {campaign.pricePerTicket && (
                <div className="font-bold text-brand-title text-base">
                  {campaign.pricePerTicket} <span className="font-normal text-xs text-brand-body">por número</span>
                </div>
              )}
              {campaign.drawDate && (
                <div className="flex items-center gap-1.5 text-brand-body">
                  <Calendar className="w-4 h-4 text-brand-subtitle shrink-0" />
                  <span>Sorteio em {campaign.drawDate}</span>
                </div>
              )}
            </>
          ) : (
            <>
              {campaign.targetDate && (
                <div className="flex items-center gap-1.5 text-brand-body">
                  <Calendar className="w-4 h-4 text-brand-subtitle shrink-0" />
                  <span>Até {campaign.targetDate}</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-6">
          <button className="w-[85%] mx-auto block py-2.5 bg-[#2067A1] text-white rounded-lg font-semibold text-sm hover:bg-[#1a5585] transition-colors shadow-sm cursor-pointer">
            Ver campanha &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
