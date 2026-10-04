import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { FeaturedCampaigns } from '../components/FeaturedCampaigns';
import { CallToActionBanner } from '../components/CallToActionBanner';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <FeaturedCampaigns />
        <CallToActionBanner />
      </main>
      <Footer />
    </div>
  );
};
