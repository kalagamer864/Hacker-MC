
import React from 'react';
import { Page } from '../types';

interface SupportPageProps {
  navigate: (page: Page) => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ navigate }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email or create a support ticket.
    alert("Thank you for your message! Our (free) support team will get back to you shortly.");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Support & Contact</h1>
      
      <div className="bg-secondary p-6 rounded-lg border border-accent-red mb-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Need a Quick Answer?</h2>
        <p className="text-gray-400 mb-4">Try our new AI Support Chat for instant help with your questions about server setup, mods, and more!</p>
        <button
          onClick={() => navigate(Page.AiSupport)}
          className="bg-accent-red text-white font-bold py-2 px-6 rounded-md hover:bg-accent-red-hover transition duration-300"
        >
          Chat with AI
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-accent-red mb-4">Contact Us</h2>
          <div className="bg-secondary p-6 rounded-lg border border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="email">Your Email</label>
                <input type="email" id="email" className="w-full p-2 bg-primary text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red" required />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="subject">Subject</label>
                <input type="text" id="subject" className="w-full p-2 bg-primary text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red" required />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="message">Message</label>
                <textarea id="message" rows={5} className="w-full p-2 bg-primary text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red" required></textarea>
              </div>
              <button type="submit" className="w-full bg-accent-red text-white font-bold py-2 rounded-md hover:bg-accent-red-hover transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-accent-red mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-secondary p-4 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-white">Is this really free? What's the catch?</h3>
              <p className="text-gray-400 mt-1">Yes, it is 100% free, forever. There is no catch. We are powered by a passion for gaming and open-source technology. No trials, no ads, no selling your data.</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-white">How many servers can I create?</h3>
              <p className="text-gray-400 mt-1">You can create a fair number of servers. We monitor for abuse, but for normal use, you won't hit a limit.</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-white">Can I install mods and plugins?</h3>
              <p className="text-gray-400 mt-1">Absolutely. Our Standard and Ultimate (both free) plans come with full support for modpacks and custom JAR files. You have full control.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
