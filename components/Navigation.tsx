import React from 'react';
import { ViewState } from '../types';
import { MapPin, Train, Home } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const getButtonClass = (view: ViewState) => {
    const base = "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200";
    return currentView === view 
      ? `${base} text-red-600` 
      : `${base} text-slate-400 hover:text-slate-600`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        <button onClick={() => setView(ViewState.HOME)} className={getButtonClass(ViewState.HOME)}>
          <Home size={24} />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button onClick={() => setView(ViewState.ATTRACTIONS)} className={getButtonClass(ViewState.ATTRACTIONS)}>
          <MapPin size={24} />
          <span className="text-xs font-medium">Explore</span>
        </button>
        <button onClick={() => setView(ViewState.TRANSPORT)} className={getButtonClass(ViewState.TRANSPORT)}>
          <Train size={24} />
          <span className="text-xs font-medium">Transport</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
