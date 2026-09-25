import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CampaignCard } from '../components/CampaignCard';
import type { CampaignProps } from '../components/CampaignCard';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const baseVaquinha: Omit<CampaignProps, 'id'> = {
  type: 'vaquinha',
  title: 'Tratamento do Thor',
  description: 'Lorem Ipsum is not simply random text. It has roots.',
  imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
  targetDate: '20/10/2026'
};

const baseRifa: Omit<CampaignProps, 'id'> = {
  type: 'rifa',
  title: 'Periféricos Gamer',
  description: 'Lorem Ipsum is not simply random text. It has roots.',
  imageUrl: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=600&q=80',
  pricePerTicket: 'R$ 5,00',
  drawDate: '15/10/2026'
};

const mockCampaigns: CampaignProps[] = Array.from({ length: 12 }).map((_, index) => ({
  id: String(index + 1),
  ...(index % 2 === 0 ? baseVaquinha : baseRifa)
}));

type FilterType = 'todas' | 'vaquinha' | 'rifa';
const ITEMS_PER_PAGE = 6;

export const Campanhas: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Voltar para a página 1 sempre que o filtro ou busca mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  // Filtragem local dos dados
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesFilter = filter === 'todas' || campaign.type === filter;
    // Busca intencionalmente desativada por enquanto
    const matchesSearch = true;
    return matchesFilter && matchesSearch;
  });

  // Lógica de Paginação
  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  const currentData = filteredCampaigns.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="bg-brand-primary w-full">
        <Header activeTab="campanhas" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Explore campanhas</h1>
        </div>
      </div>
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Controles: Filtros e Barra de Busca */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
          <div className="flex bg-[#EAF2F8] rounded-xl p-1.5 inline-flex shadow-sm overflow-x-auto">
            <button 
              onClick={() => setFilter('todas')}
              className={`px-6 sm:px-8 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${filter === 'todas' ? 'bg-[#2067A1] text-white shadow-md' : 'text-[#2067A1] hover:bg-white/60'}`}
            >
              Todas
            </button>
            <button 
              onClick={() => setFilter('vaquinha')}
              className={`px-6 sm:px-8 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${filter === 'vaquinha' ? 'bg-[#2067A1] text-white shadow-md' : 'text-[#2067A1] hover:bg-white/60'}`}
            >
              Vaquinha
            </button>
            <button 
              onClick={() => setFilter('rifa')}
              className={`px-6 sm:px-8 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${filter === 'rifa' ? 'bg-[#2067A1] text-white shadow-md' : 'text-[#2067A1] hover:bg-white/60'}`}
            >
              Rifa
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Buscar campanhas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Grid de Campanhas */}
        {currentData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentData.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Search className="w-12 h-12 mb-4 text-gray-300" />
            <p className="text-lg font-medium text-brand-title">Nenhuma campanha encontrada.</p>
            <p className="text-sm">Tente ajustar seus filtros ou termos de busca.</p>
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4 mb-8">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border border-gray-200 text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center ${
                    currentPage === page 
                      ? 'bg-brand-primary text-white shadow-sm' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white border border-gray-200 text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
