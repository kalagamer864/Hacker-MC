
import React from 'react';
import { Page } from '../types';
import Plans from '../components/Plans';

interface HomePageProps {
  navigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
          The <span className="text-accent-red">Hacker</span> Hosting
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mt-4 max-w-3xl mx-auto">
          Your Ultimate <span className="font-bold text-white">100% FREE</span> Minecraft Server Hosting Solution.
        </p>
        <p className="text-lg text-gray-500 mt-2">No catches. No trials. Just free servers, forever.</p>
        <button onClick={() => navigate(Page.Signup)} className="mt-8 bg-accent-red text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-accent-red-hover transform hover:scale-105 transition duration-300">
          Create Your Free Server Now
        </button>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-secondary p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold text-accent-red">Smooth Performance</h3>
            <p className="text-gray-400 mt-2">Enterprise-grade hardware ensures your server runs lag-free.</p>
          </div>
          <div className="bg-secondary p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold text-accent-red">Low Latency</h3>
            <p className="text-gray-400 mt-2">Globally distributed network for the best possible ping.</p>
          </div>
          <div className="bg-secondary p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold text-accent-red">DDoS Protection</h3>
            <p className="text-gray-400 mt-2">Always-on protection to keep your server online during attacks.</p>
          </div>
          <div className="bg-secondary p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold text-accent-red">Unlimited Slots</h3>
            <p className="text-gray-400 mt-2">Invite as many friends as you want. No player limits, completely free.</p>
          </div>
        </div>
      </div>
      
      {/* Plans Section */}
      <Plans navigate={navigate} />

    </div>
  );
};

export default HomePage;
