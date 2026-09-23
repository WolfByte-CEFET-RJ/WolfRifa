import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CallToActionBanner: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-primary-light/50 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-brand-primary-light">
          
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-title mb-2">
              Tem alguma ideia que precisa de apoio?
            </h2>
            <p className="text-brand-body text-base sm:text-lg">
              Crie sua campanha no WolfRifa.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-base px-8 py-3.5 rounded-xl transition-all shadow-sm hover:shadow group shrink-0 cursor-pointer">
            <span>Criar campanha</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </div>
    </section>
  );
};
