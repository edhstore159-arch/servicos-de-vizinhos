import React, { useState } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { MapPin, Briefcase, DollarSign, Clock, Search } from 'lucide-react';
import { mockJobs, jobCategories } from '../mock/data';
import { useSearchParams } from 'react-router-dom';

const Empregos = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-6xl mx-auto px-3 py-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Vagas de Emprego</h1>
          <p className="text-sm text-gray-600">{filteredJobs.length} vagas encontradas</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-3 mb-4">
          <div className="flex flex-col md:flex-row gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar vaga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
          </div>
          
          {/* Category Pills */}
          <div className="flex overflow-x-auto gap-2 pb-2">
            <Badge
              variant={selectedCategory === 'Todos' ? 'default' : 'outline'}
              className={`cursor-pointer whitespace-nowrap ${
                selectedCategory === 'Todos' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory('Todos')}
            >
              Todos
            </Badge>
            {jobCategories.filter(c => c !== 'Popular').map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Jobs List */}
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start space-x-3">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {job.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Há {Math.floor(Math.random() * 5) + 1} dias</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-8">
                      Candidatar-se
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="p-8 text-center">
            <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">Nenhuma vaga encontrada</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Empregos;