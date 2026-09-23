import React from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-primary text-white w-full border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">


        <nav className="flex items-center gap-8">
          <a
            href="#"
            className="font-medium text-base text-white border-b-2 border-white pb-1 transition-all"
          >
            Início
          </a>
          <a
            href="#campanhas"
            className="font-medium text-base text-white/80 hover:text-white transition-colors"
          >
            Campanhas
          </a>
          <a
            href="#sobre"
            className="font-medium text-base text-white/80 hover:text-white transition-colors"
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
