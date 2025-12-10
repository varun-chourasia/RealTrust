import React, { useState, useEffect } from 'react';
import { Home, LayoutDashboard } from 'lucide-react';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import { initMockData } from './services/api';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'admin'>('landing');

  useEffect(() => {
    initMockData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setCurrentView('landing')}
          className={`p-3 rounded-full shadow-lg transition-colors ${
            currentView === 'landing' ? 'bg-brand-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          title="Go to Landing Page"
        >
          <Home size={24} />
        </button>
        <button
          onClick={() => setCurrentView('admin')}
          className={`p-3 rounded-full shadow-lg transition-colors ${
            currentView === 'admin' ? 'bg-brand-orange text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          title="Go to Admin Panel"
        >
          <LayoutDashboard size={24} />
        </button>
      </div>

      {currentView === 'landing' ? (
        <LandingPage onNavigateToAdmin={() => setCurrentView('admin')} />
      ) : (
        <AdminPanel onNavigateToHome={() => setCurrentView('landing')} />
      )}
    </div>
  );
};

export default App;