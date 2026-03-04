import React from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { MapPin, Star, Edit, Settings, CreditCard } from 'lucide-react';
import { getCurrentUser } from '../mock/data';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <div className="min-h-screen bg-[#F5F8FA] pb-16 md:pb-0">
      <Header />
      <div className="max-w-5xl mx-auto px-3 py-3">
        {/* Profile Header */}
        <Card className="p-4 mb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="text-xl font-bold">{user.name}</h1>
                  {user.isPremium && (
                    <Badge className="bg-yellow-500 text-white text-xs">Premium</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded">
                    <span className="text-sm font-semibold text-yellow-700">💳 {user.credits} créditos</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <Button 
              onClick={() => navigate('/creditos')}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Comprar Mais Créditos
            </Button>
          </div>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="atividades" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-3">
            <TabsTrigger value="atividades">Atividades</TabsTrigger>
            <TabsTrigger value="candidaturas">Candidaturas</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="atividades">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Atividades Recentes</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 pb-3 border-b">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">Candidatura enviada para <span className="font-semibold">Desenvolvedor Full Stack</span></p>
                    <span className="text-xs text-gray-500">Há 2 horas</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 pb-3 border-b">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">Mensagem recebida de <span className="font-semibold">João Silva</span></p>
                    <span className="text-xs text-gray-500">Há 5 horas</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">Perfil visualizado por <span className="font-semibold">Tech Solutions</span></p>
                    <span className="text-xs text-gray-500">Há 1 dia</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="candidaturas">
            <Card className="p-4 text-center text-sm text-gray-500">
              Você ainda não se candidatou a nenhuma vaga
            </Card>
          </TabsContent>

          <TabsContent value="avaliacoes">
            <div className="space-y-2">
              <Card className="p-3">
                <div className="flex items-start space-x-2 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=25" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">Carlos Mendes</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700">
                      Ótimo profissional! Recomendo.
                    </p>
                    <span className="text-xs text-gray-500">Há 1 semana</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Perfil;