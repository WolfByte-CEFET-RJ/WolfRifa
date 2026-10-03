import React from 'react';
import { Logo } from './Logo';
interface HeaderProps {
  activeTab?: 'home' | 'campanhas' | 'sobre';
}

export const Header: React.FC<HeaderProps> = ({ activeTab = 'home' }) => {
  return (
    <header className="bg-brand-primary text-white w-full border-b border-white/10 relative overflow-hidden">
      {/* Elementos decorativos de fundo (losangos) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-10 w-48 h-48 bg-white/5 rotate-45 rounded-3xl"></div>
        <div className="absolute top-4 left-1/3 w-20 h-20 bg-white/5 border border-white/10 rotate-45 rounded-xl"></div>
        <div className="absolute -bottom-20 right-[30%] w-32 h-32 bg-white/10 rotate-45 rounded-2xl"></div>
        <div className="absolute -top-10 right-1/4 w-16 h-16 bg-white/10 rotate-45 rounded-xl"></div>
        <div className="absolute top-6 right-[10%] w-24 h-24 border-2 border-white/10 rotate-45 rounded-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">


        <nav className="flex items-center gap-8">
          <a
            href="#"
            className={`font-medium text-base transition-all ${activeTab === 'home' ? 'text-white border-b-2 border-white pb-1' : 'text-white/80 hover:text-white'}`}
          >
            Início
          </a>
          <a
            href="#campanhas"
            className={`font-medium text-base transition-all ${activeTab === 'campanhas' ? 'text-white border-b-2 border-white pb-1' : 'text-white/80 hover:text-white'}`}
          >
            Campanhas
          </a>
          <a
            href="#sobre"
            className={`font-medium text-base transition-all ${activeTab === 'sobre' ? 'text-white border-b-2 border-white pb-1' : 'text-white/80 hover:text-white'}`}
          >
            Sobre
          </a>
        </nav>


        <div className="flex items-center gap-4">
          <button className="bg-white hover:bg-gray-100 text-brand-primary font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm text-sm sm:text-base cursor-pointer">
            Criar campanha
          </button>

          <button className="border border-white/80 hover:bg-white/10 text-white font-medium px-6 py-2.5 rounded-lg transition-all text-sm sm:text-base cursor-pointer">
            Entrar
          </button>

          <div className="pl-4 border-l border-white/20">
            <Logo variant="light" />
          </div>
        </div>

      </div>
    </header>
  );
};
