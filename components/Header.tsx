
import React from 'react';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  navigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(Page.Home);
  }

  return (
    <header className="bg-secondary/50 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate(Page.Home)}>
          <svg className="w-8 h-8 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-1.096.906-2.48.906-4.132 0-1.652-.261-3.206-.906-4.634M10 11a2 2 0 114 0 2 2 0 01-4 0z" /></svg>
          <span className="text-2xl font-bold text-white tracking-wider">
            The <span className="text-accent-red">Hacker</span> Hosting
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-gray-300">
          <a onClick={() => navigate(Page.Home)} className="hover:text-accent-red transition duration-300 cursor-pointer">Home</a>
          <a onClick={() => navigate(Page.Support)} className="hover:text-accent-red transition duration-300 cursor-pointer">Support</a>
          <a onClick={() => navigate(Page.AiSupport)} className="hover:text-accent-red transition duration-300 cursor-pointer">AI Support</a>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-400">Welcome, {user?.username}</span>
              <button onClick={() => navigate(Page.Dashboard)} className="bg-accent-red text-white font-semibold px-4 py-2 rounded-md hover:bg-accent-red-hover transition duration-300">
                Dashboard
              </button>
              <button onClick={handleLogout} className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate(Page.Login)} className="text-gray-300 hover:text-white transition duration-300">
                Log In
              </button>
              <button onClick={() => navigate(Page.Signup)} className="bg-accent-red text-white font-semibold px-4 py-2 rounded-md hover:bg-accent-red-hover transition duration-300">
                Sign Up Free
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
