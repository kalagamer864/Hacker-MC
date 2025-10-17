
import React, { useState } from 'react';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';

interface SignupPageProps {
  navigate: (page: Page) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(username && email && password) {
        signup(username, email);
        navigate(Page.Dashboard);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-secondary p-8 rounded-lg shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-white mb-2">Create Your Free Account</h2>
        <p className="text-center text-gray-400 mb-6">No payment required, ever.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-primary text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-primary text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-primary text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red"
              required
            />
          </div>
          <button type="submit" className="w-full bg-accent-red text-white font-bold py-3 rounded-md hover:bg-accent-red-hover transition duration-300">
            Sign Up For Free
          </button>
        </form>
         <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <a onClick={() => navigate(Page.Login)} className="text-accent-red hover:underline cursor-pointer">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
