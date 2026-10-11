import React from 'react';

interface CampaignInfoItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const CampaignInfoItem: React.FC<CampaignInfoItemProps> = ({ icon, children }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="text-brand-primary mt-1">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 24, strokeWidth: 1.5 })}
      </div>
      <div className="text-brand-primary text-sm sm:text-base leading-tight mt-1 flex flex-col gap-0.5">
        {children}
      </div>
    </div>
  );
};

export const CampaignInfoGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-10">
      {children}
    </div>
  );
};
