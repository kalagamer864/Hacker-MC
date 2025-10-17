
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  navigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-secondary border-t border-gray-800">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} The Hacker Hosting. All Rights Reserved.</p>
        <p>Providing 100% free Minecraft server hosting, forever.</p>
        <div className="mt-4 flex justify-center space-x-6">
            <a onClick={() => navigate(Page.Home)} className="hover:text-accent-red transition duration-300 cursor-pointer">Home</a>
            <a onClick={() => navigate(Page.Support)} className="hover:text-accent-red transition duration-300 cursor-pointer">Support</a>
            <a onClick={() => navigate(Page.AiSupport)} className="hover:text-accent-red transition duration-300 cursor-pointer">AI Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
