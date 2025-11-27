import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import AttractionsView from './components/AttractionsView';
import TransportChat from './components/TransportChat';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.ATTRACTIONS:
        return <AttractionsView />;
      case ViewState.TRANSPORT:
        return <TransportChat />;
      case ViewState.HOME:
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      <main className="w-full">
        {renderView()}
      </main>
      <Navigation currentView={currentView} setView={setView} />
    </div>
  );
};

export default App;
