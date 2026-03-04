import React, { useState } from 'react';
import Header from '../components/Header';
import DemandCard from '../components/DemandCard';
import ThematiqueCard from '../components/ThematiqueCard';
import QuickDemandForm from '../components/QuickDemandForm';
import MonthEndCard from '../components/MonthEndCard';
import { Button } from '../components/ui/button';
import { X, MapPin } from 'lucide-react';
import { mockDemands, mockThematiques } from '../mock/data';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [demands, setDemands] = useState(mockDemands);
  const [showBanner, setShowBanner] = useState(true);

  const handleLike = (demandId) => {
    setDemands(prev =>
      prev.map(d =>
        d.id === demandId ? { ...d, likes: d.likes + 1 } : d
      )
    );
  };

  const handleRecommend = (demandId) => {
    setDemands(prev =>
      prev.map(d =>
        d.id === demandId ? { ...d, recommends: d.recommends + 1 } : d
      )
    );
  };

  const handleRespond = (demandId) => {
    navigate(`/respond/${demandId}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <Header />

      {/* Banner */}
      {showBanner && (
        <div className="bg-[#FFE5E0] border-b border-[#FFD0C7]">
          <div className="max-w-7xl mx-auto px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#FF6B6B]" />
              <p className="text-xs text-gray-700">
                Accédez de nouveau à des outils et services exclusifs : redevenez Premier !
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                className="bg-[#FF9B8A] hover:bg-[#FF8A79] text-white h-7 text-xs px-3"
              >
                Me réabonner
              </Button>
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column - Feed */}
          <div className="lg:col-span-2">
            {/* Demand Type Header */}
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <h2 className="text-sm font-semibold">Demande publique</h2>
              <span className="text-xs text-gray-500">postée à 18:35</span>
            </div>

            {/* Demands Feed */}
            <div className="space-y-0">
              {demands.map((demand) => (
                <DemandCard
                  key={demand.id}
                  demand={demand}
                  onLike={handleLike}
                  onRecommend={handleRecommend}
                  onRespond={handleRespond}
                />
              ))}
            </div>

            {/* Thematiques Section */}
            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-[#FF9B8A] rounded-full"></div>
                <h2 className="text-base font-semibold">Thématiques du moment</h2>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Gagnez du temps : postez toutes vos demandes en un clic.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {mockThematiques.map((thematique) => (
                  <ThematiqueCard key={thematique.id} thematique={thematique} />
                ))}
              </div>
              <div className="flex justify-center mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  Voir toutes les thématiques
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-2">
            <QuickDemandForm />
            <MonthEndCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;