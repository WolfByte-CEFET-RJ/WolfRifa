import React from 'react';

interface CampaignProgressBarProps {
  currentAmount: number;
  targetAmount: number;
}

export const CampaignProgressBar: React.FC<CampaignProgressBarProps> = ({ currentAmount, targetAmount }) => {
  const percentage = Math.min(100, Math.round((currentAmount / targetAmount) * 100));
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 bg-white mb-8">
      <div className="flex justify-end mb-2">
        <span className="text-sm text-brand-primary/80 font-medium">Meta: {formatCurrency(targetAmount)}</span>
      </div>
      <div className="w-full bg-brand-primary/10 rounded-full h-2.5 mb-3">
        <div 
          className="bg-brand-primary h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-start">
        <span className="text-sm text-brand-primary/80 font-medium">Progresso: {formatCurrency(currentAmount)}</span>
      </div>
    </div>
  );
};
