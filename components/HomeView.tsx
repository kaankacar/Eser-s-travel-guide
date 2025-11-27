import React from 'react';
import { ViewState } from '../types';
import { MapPin, Train, Heart } from 'lucide-react';

interface HomeViewProps {
  setView: (view: ViewState) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 pb-24">
      <div className="w-full max-w-md space-y-8 mt-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full text-red-600 mb-2">
            <Heart fill="currentColor" size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Eser's Russia Guide 🇷🇺
          </h1>
          <p className="text-slate-500 text-lg">
            Moscow & St. Petersburg <br/> New Year's Edition
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-4">
          <button 
            onClick={() => setView(ViewState.ATTRACTIONS)}
            className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-red-200 transition-all text-left"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Find Attractions</h3>
              <p className="text-slate-500 text-sm">
                Near a metro stop or walking around Red Square? See what's cool around you.
              </p>
            </div>
          </button>

          <button 
            onClick={() => setView(ViewState.TRANSPORT)}
            className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all text-left"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Train size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Transport Guide</h3>
              <p className="text-slate-500 text-sm">
                Chat with AI about Sapsan tickets, Metro maps, and how to not get lost.
              </p>
            </div>
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-slate-200/50 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Trip Status</p>
            <div className="flex justify-between items-center text-sm text-slate-700 font-semibold px-4">
                <span>Moscow</span>
                <span className="text-slate-400">✈️</span>
                <span>St. Petersburg</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default HomeView;
