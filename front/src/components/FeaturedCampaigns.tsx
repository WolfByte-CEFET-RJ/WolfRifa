import React from 'react';
import { CampaignCard } from './CampaignCard';
import type { CampaignProps } from './CampaignCard';
import { ArrowRight } from 'lucide-react';

const mockCampaigns: CampaignProps[] = [
  {
    id: '1',
    type: 'vaquinha',
    title: 'Tratamento do Thor',
    description: 'Lorem Ipsum is not simply random text. It has roots.',
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
    targetDate: '20/10/2026',
  },
  {
    id: '2',
    type: 'rifa',
    title: 'Periféricos Gamer',
    description: 'Lorem Ipsum is not simply random text. It has roots.',
    imageUrl: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=600&q=80',
    pricePerTicket: 'R$ 5,00',
    drawDate: '15/10/2026',
  },
  {
    id: '3',
    type: 'vaquinha',
    title: 'Tratamento do Thor',
    description: 'Lorem Ipsum is not simply random text. It has roots.',
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
    targetDate: '20/10/2026',
  },
];

export const FeaturedCampaigns: React.FC = () => {
  return (
    <section id="campanhas" className="bg-[#F4F8FC] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-brand-subtitle font-medium text-sm sm:text-base tracking-wide block mb-1">
              Campanhas em destaque
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-title">
              Conheça algumas campanhas
            </h2>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-brand-subtitle font-semibold hover:text-brand-title transition-colors group text-sm sm:text-base"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

      </div>
    </section>
  );
};
