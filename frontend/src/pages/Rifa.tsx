import React from 'react';
import { Header } from '../components/Header';
import { CampaignImage } from '../components/campaign/CampaignImage';
import { CampaignSocialLinks } from '../components/campaign/CampaignSocialLinks';
import { CampaignAbout } from '../components/campaign/CampaignAbout';
import { CampaignHeader } from '../components/campaign/CampaignHeader';
import { CampaignInfoGrid, CampaignInfoItem } from '../components/campaign/CampaignInfoGrid';
import { Users, Tag, Calendar, MapPin, Ticket, Trophy, DollarSign, CalendarDays, Hash } from 'lucide-react';

export const Rifa: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="campanhas" />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Coluna da Esquerda */}
          <div>
            <CampaignImage 
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Rifa - Periféricos gamer"
              badgeText="Rifa"
              badgeIcon={<Ticket size={18} />}
            />
            
            <CampaignSocialLinks />
            
            <CampaignAbout 
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </div>

          {/* Coluna da Direita */}
          <div>
            <CampaignHeader 
              title="Rifa - Periféricos gamer"
              description="Lorem Ipsum is not simply random text. It has roots.Lorem Ipsum is not simply random text. It has roots.Lorem Ipsum is not simply random text. It has roots.Lorem Ipsum is not simply random text. It has roots.Lorem Ipsum is not simply random text. It has roots."
              type="Publica"
            />
            
            <CampaignInfoGrid>
              <CampaignInfoItem icon={<Users />}>
                <div className="text-brand-primary/70 text-sm">Organizado por</div>
                <div className="font-semibold text-brand-primary">WolfBotz</div>
              </CampaignInfoItem>
              
              <CampaignInfoItem icon={<Tag />}>
                <div className="font-medium text-brand-primary/80 mt-2">Educação . Tecnologia</div>
              </CampaignInfoItem>
              
              <CampaignInfoItem icon={<Calendar />}>
                <div className="font-medium text-brand-primary/80 mt-2">Criada em 12/09/2026</div>
              </CampaignInfoItem>
              
              <CampaignInfoItem icon={<MapPin />}>
                <div className="font-medium text-brand-primary/80 mt-1 leading-relaxed">Rua General Canabarro, 4567,<br/>Rio de janeiro - RJ</div>
              </CampaignInfoItem>
              
              <CampaignInfoItem icon={<Trophy />}>
                <div className="text-brand-primary/80 mt-1 leading-relaxed">
                  <span className="font-bold text-brand-primary">Prêmio:</span> Teclado e mouse gamer.
                </div>
              </CampaignInfoItem>
              
              <CampaignInfoItem icon={<DollarSign />}>
                <div className="text-brand-primary/80 mt-2">
                  <span className="font-bold text-brand-primary">R$ 5,00</span> cada número
                </div>
              </CampaignInfoItem>
              
              <CampaignInfoItem icon={<CalendarDays />}>
                <div className="text-brand-primary/80 mt-2">
                  Sorteio em 21/12/2026
                </div>
              </CampaignInfoItem>
              
              <CampaignInfoItem icon={<Hash />}>
                <div className="text-brand-primary/80 mt-2">
                  <span className="font-bold text-brand-primary">500</span> números
                </div>
              </CampaignInfoItem>
            </CampaignInfoGrid>
            
            <div className="flex justify-center mt-6 w-full">
              <button className="w-full sm:w-[85%] max-w-md px-12 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all hover:scale-[1.02] text-xl shadow-md cursor-pointer flex items-center justify-center">
                Participar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
