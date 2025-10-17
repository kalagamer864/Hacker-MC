
import React from 'react';
import { Plan, Page } from '../types';

const plans: Plan[] = [
  {
    name: 'Basic',
    price: '$0',
    ram: '4GB DDR4',
    cpu: '2 vCores',
    storage: '10GB NVMe SSD',
    features: [
      'Instant Setup',
      'DDoS Protection',
      'Unlimited Slots',
      '24/7 Support',
    ],
  },
  {
    name: 'Standard',
    price: '$0',
    ram: '8GB DDR4',
    cpu: '4 vCores',
    storage: '20GB NVMe SSD',
    features: [
      'All Basic Features',
      'Free Modpack Support',
      'Custom JARs',
      'Daily Backups',
    ],
    isPopular: true,
  },
  {
    name: 'Ultimate',
    price: '$0',
    ram: '16GB DDR4',
    cpu: '8 vCores',
    storage: '40GB NVMe SSD',
    features: [
      'All Standard Features',
      'Dedicated IP Address',
      'Priority Support',
      'Lowest Latency',
    ],
  },
];

interface PlanCardProps {
  plan: Plan;
  navigate: (page: Page) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, navigate }) => {
  return (
    <div className={`bg-secondary rounded-lg p-6 flex flex-col border-2 ${plan.isPopular ? 'border-accent-red' : 'border-gray-800'} transform hover:-translate-y-2 transition duration-300`}>
      {plan.isPopular && (
        <div className="absolute top-0 right-0 -mt-3 mr-3 bg-accent-red text-white text-xs font-bold px-3 py-1 rounded-full">
          POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold text-white text-center">{plan.name}</h3>
      <p className="text-4xl font-extrabold text-center my-4 text-white">
        {plan.price}
        <span className="text-base font-normal text-gray-400">/month</span>
      </p>
      <div className="text-center text-gray-400 mb-6">
          <p>{plan.ram} RAM</p>
          <p>{plan.cpu} CPU</p>
          <p>{plan.storage} Storage</p>
      </div>
      <ul className="space-y-3 text-gray-300 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-accent-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(Page.Signup)} className="mt-8 w-full bg-accent-red text-white font-bold py-3 rounded-md hover:bg-accent-red-hover transition duration-300">
        Get Started For Free
      </button>
    </div>
  );
};


interface PlansProps {
    navigate: (page: Page) => void;
}

const Plans: React.FC<PlansProps> = ({ navigate }) => {
  return (
    <div className="py-12" id="plans">
      <h2 className="text-4xl font-extrabold text-center text-white mb-2">Absolutely Free Hosting Plans</h2>
      <p className="text-center text-gray-400 mb-10">No hidden fees, no credit card required. Ever.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map(plan => (
          <PlanCard key={plan.name} plan={plan} navigate={navigate}/>
        ))}
      </div>
    </div>
  );
};

export default Plans;
