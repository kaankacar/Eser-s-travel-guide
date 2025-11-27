import React, { useState } from 'react';
import { Coordinates, AttractionResult } from '../types';
import { findNearbyAttractions } from '../services/gemini';
import { MapPin, Navigation, ExternalLink, Loader2 } from 'lucide-react';

const AttractionsView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AttractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLocate = () => {
    setLoading(true);
    setError(null);
    setResult(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await findNearbyAttractions(latitude, longitude);
          setResult(data);
        } catch (err) {
          setError("Failed to fetch attractions. Please check your connection.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Unable to retrieve your location. Please allow location access.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="text-red-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">What's Nearby?</h2>
        <p className="text-slate-500 mb-6">
          Connect your location to find the best winter sights and historical spots around you right now.
        </p>
        <button
          onClick={handleLocate}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Searching...
            </>
          ) : (
            <>
              <Navigation size={20} />
              Find Attractions
            </>
          )}
        </button>
        {error && (
          <p className="mt-4 text-red-500 bg-red-50 p-3 rounded-lg text-sm">{error}</p>
        )}
      </div>

      {result && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">❄️</span> 
              Top Picks For You
            </h3>
            <div className="prose prose-slate prose-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {result.text}
            </div>
          </div>

          {result.places.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 ml-1">
                Locations Found
              </h4>
              <div className="space-y-3">
                {result.places.map((place, idx) => (
                  <a
                    key={idx}
                    href={place.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-red-500 group-hover:bg-red-50 transition-colors">
                        <MapPin size={20} />
                      </div>
                      <span className="font-medium text-slate-700 group-hover:text-slate-900 line-clamp-1">
                        {place.title}
                      </span>
                    </div>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-red-500" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttractionsView;
