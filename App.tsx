
import React, { useState, useCallback } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SupportPage from './pages/SupportPage';
import AiSupportPage from './pages/AiSupportPage';
import { AuthProvider } from './context/AuthContext';
import { ServerProvider } from './context/ServerContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage navigate={navigate} />;
      case Page.Login:
        return <LoginPage navigate={navigate} />;
      case Page.Signup:
        return <SignupPage navigate={navigate} />;
      case Page.Dashboard:
        return <DashboardPage />;
      case Page.Support:
        return <SupportPage navigate={navigate} />;
      case Page.AiSupport:
        return <AiSupportPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <ServerProvider>
        <div className="min-h-screen flex flex-col bg-primary text-gray-200 font-sans">
          <Header navigate={navigate} />
          <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
            {renderPage()}
          </main>
          <Footer navigate={navigate} />
        </div>
      </ServerProvider>
    </AuthProvider>
  );
};

export default App;
