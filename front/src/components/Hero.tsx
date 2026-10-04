import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-brand-primary text-white overflow-hidden py-16 sm:py-24">

      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="w-full h-full diamond-pattern" />
      </div>


      <div className="absolute top-10 right-1/4 w-32 h-32 border border-white/20 rotate-45 pointer-events-none opacity-20" />
      <div className="absolute bottom-6 right-10 w-48 h-48 border border-white/10 rotate-45 pointer-events-none opacity-15" />
      <div className="absolute -bottom-10 left-10 w-24 h-24 border border-white/20 rotate-45 pointer-events-none opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-relaxed text-white mb-8">
            No WolfRifa você encontra rifas e vaquinhas criadas para apoiar projetos , ideias e causas que fazem a diferença.
          </h1>

          <div>
            <a
              href="#campanhas"
              className="inline-block bg-white hover:bg-gray-100 text-brand-primary font-semibold text-base px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Explorar campanhas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
