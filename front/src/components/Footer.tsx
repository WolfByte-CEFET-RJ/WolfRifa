import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-primary text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">


          <Logo variant="light" />


          <div className="text-center md:text-right text-white/80 text-sm">
            <p className="font-medium text-white">
              Ramo Estudantil IEEE CEFET/RJ — Equipe WolfByte
            </p>
            <p className="mt-1 text-white/70">
              © {new Date().getFullYear()} WolfRifa. Plataforma de arrecadação e apoio social.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
