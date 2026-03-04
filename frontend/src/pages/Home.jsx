import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { jobCategories, searchTips } from '../mock/data';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('São Paulo');

  const handleSearch = () => {
    navigate(`/empregos?q=${searchQuery}&loc=${location}`);
  };

  const quickSearch = (category) => {
    navigate(`/empregos?q=${category}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16 md:pb-0">
      <Header />

      <div className="max-w-6xl mx-auto px-3 py-6">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-pink-50 px-4 py-2 rounded-full mb-4">
            <Briefcase className="w-5 h-5 text-pink-600" />
            <span className="text-sm font-semibold text-pink-600">Empregos</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Encontre seu próximo emprego
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Busque vagas em múltiplos sites ou acesse nossos parceiros
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-4 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Cargo, empresa ou palavra-chave"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Localização"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-11"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white h-11 px-8"
            >
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>
        </Card>

        {/* Popular Categories */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-semibold text-gray-700">✨ Popular:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobCategories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors px-3 py-1.5 text-sm"
                onClick={() => quickSearch(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Search Section */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-pink-50 to-orange-50">
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase className="w-5 h-5 text-pink-600" />
            <h2 className="text-lg font-bold text-gray-900">Encontre seu próximo emprego</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Busque vagas ou acesse diretamente nossos parceiros
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="border-pink-300 text-pink-700 hover:bg-pink-100"
              onClick={() => quickSearch('Desenvolvedor')}
            >
              Buscar "Desenvolvedor"
            </Button>
            <Button
              variant="outline"
              className="border-pink-300 text-pink-700 hover:bg-pink-100"
              onClick={() => quickSearch('Vendedor')}
            >
              Buscar "Vendedor"
            </Button>
            <Button
              variant="outline"
              className="border-pink-300 text-pink-700 hover:bg-pink-100"
              onClick={() => quickSearch('Motorista')}
            >
              Buscar "Motorista"
            </Button>
          </div>
        </Card>

        {/* Search Tips */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xl">💡</span>
            <h2 className="text-lg font-bold text-gray-900">Dicas para sua busca</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {searchTips.map((tip) => (
              <Card key={tip.number} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {tip.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">{tip.title}</h3>
                    <p className="text-xs text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;