import React from 'react';
import { Users, Gift, PlusCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="bg-white py-16 sm:py-20 border-b border-brand-primary-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">


          <div className="lg:col-span-5">
            <span className="text-brand-subtitle font-medium text-sm sm:text-base tracking-wide block mb-2">
              Sobre o WolfRifa
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-title mb-4 leading-tight">
              Uma plataforma da nossa comunidade.
            </h2>
            <p className="text-brand-body text-sm sm:text-base leading-relaxed">
              O WolfRifa é um projeto social criado pela equipe WolfByte do IEEE CEFET/RJ para facilitar a organização, divulgação e gestão transparente de campanhas de arrecadação de dinheiro como rifas e vakinhas.
            </p>
          </div>


          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2 lg:pt-6">


            <div className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-brand-primary-light/60 flex items-center justify-center text-brand-primary mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-title mb-1">
                Apoie causas
              </h3>
              <p className="text-brand-body text-sm leading-snug">
                Contribua com campanhas e projetos.
              </p>
            </div>

            <div className="flex flex-col items-start border-t sm:border-t-0 sm:border-l border-brand-primary-light/40 pt-6 sm:pt-0 sm:pl-6">
              <div className="w-12 h-12 rounded-xl bg-brand-primary-light/60 flex items-center justify-center text-brand-primary mb-4">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-title mb-1">
                Participe de rifas
              </h3>
              <p className="text-brand-body text-sm leading-snug">
                Concorra e ajude projetos de forma simples.
              </p>
            </div>


            <div className="flex flex-col items-start border-t sm:border-t-0 sm:border-l border-brand-primary-light/40 pt-6 sm:pt-0 sm:pl-6">
              <div className="w-12 h-12 rounded-xl bg-brand-primary-light/60 flex items-center justify-center text-brand-primary mb-4">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-title mb-1">
                Crie sua campanha
              </h3>
              <p className="text-brand-body text-sm leading-snug">
                Organize sua vaquinha ou rifa e alcance mais pessoas.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
