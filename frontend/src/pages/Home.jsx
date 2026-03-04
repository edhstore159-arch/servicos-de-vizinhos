import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Heart, Share2, MessageSquare, MapPin, X, Camera, Euro } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router-dom';

// Mock posts/demandas
const mockPosts = [
  {
    id: '1',
    userName: 'João Silva',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    isPro: true,
    time: 'Há 3h',
    title: 'Preciso de ajuda com instalação elétrica',
    description: 'Olá, estou precisando de um eletricista para fazer algumas instalações na minha casa. Tenho 3 pontos de tomada para instalar e preciso trocar o disjuntor principal. Trabalho de aproximadamente 4 horas.',
    location: 'São Paulo, SP - 5 km',
    budget: 'R$ 300',
    category: 'Eletricista',
    likes: 12,
    responses: 5
  },
  {
    id: '2',
    userName: 'Maria Santos',
    userAvatar: 'https://i.pravatar.cc/150?img=45',
    isPro: false,
    time: 'Há 5h',
    title: 'Busco professor de matemática',
    description: 'Preciso de professor particular de matemática para minha filha que está no ensino médio. Aulas 2x por semana, preferencialmente aos sábados pela manhã.',
    location: 'Rio de Janeiro, RJ - 8 km',
    budget: 'R$ 80/aula',
    category: 'Professor',
    likes: 8,
    responses: 12
  },
  {
    id: '3',
    userName: 'Carlos Oliveira',
    userAvatar: 'https://i.pravatar.cc/150?img=33',
    isPro: false,
    time: 'Há 1 dia',
    title: 'Desenvolvedor para pequeno projeto',
    description: 'Procuro desenvolvedor para criar um site institucional simples. Preciso de algo profissional mas sem muita complexidade. Prazo de 2 semanas.',
    location: 'Belo Horizonte, MG - 3 km',
    budget: 'R$ 2.000',
    category: 'Desenvolvedor',
    likes: 15,
    responses: 8
  }
];

const PostCard = ({ post, onLike, onRespond }) => {
  return (
    <Card className="p-3 mb-2 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start space-x-2 mb-2">
        <Avatar className="w-9 h-9">
          <AvatarImage src={post.userAvatar} alt={post.userName} />
          <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-sm">{post.userName}</h3>
            {post.isPro && (
              <Badge variant="outline" className="text-xs px-1.5 py-0 bg-purple-50 text-purple-700 border-purple-200">
                PRO
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500">{post.time}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-2">
        <h4 className="font-medium text-sm mb-2">{post.title}</h4>
        <p className="text-sm text-gray-700 line-clamp-3">{post.description}</p>
      </div>

      {/* Location & Budget */}
      <div className="flex items-center justify-between mb-2 text-xs">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{post.location}</span>
        </div>
        <div className="font-semibold text-gray-800">
          Orçamento: <span className="text-green-600">{post.budget}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <span>{post.likes} Curtidas</span>
          <span>{post.responses} respostas</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 mt-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-xs h-8"
          onClick={() => onLike(post.id)}
        >
          <Heart className="w-4 h-4 mr-1" />
          Curtir
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-xs h-8"
        >
          <Share2 className="w-4 h-4 mr-1" />
          Compartilhar
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-xs h-8"
          onClick={() => onRespond(post.id)}
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Responder
        </Button>
      </div>
    </Card>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(mockPosts);
  const [showBanner, setShowBanner] = useState(true);

  const handleLike = (postId) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleRespond = (postId) => {
    navigate(`/mensagens`);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] pb-16 md:pb-0">
      <Header />

      {/* Banner */}
      {showBanner && (
        <div className="bg-[#FFE5E0] border-b border-[#FFD0C7]">
          <div className="max-w-7xl mx-auto px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#FF6B6B]" />
              <p className="text-xs text-gray-700">
                Adicione mais créditos para acessar recursos exclusivos!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                className="bg-[#FF9B8A] hover:bg-[#FF8A79] text-white h-7 text-xs px-3"
                onClick={() => navigate('/creditos')}
              >
                Comprar Créditos
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
            {/* Feed Header */}
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <h2 className="text-sm font-semibold">Feed Público</h2>
              <span className="text-xs text-gray-500">Atualizado agora</span>
            </div>

            {/* Posts Feed */}
            <div className="space-y-0">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onRespond={handleRespond}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-2">
            {/* Quick Post Card */}
            <Card className="p-3 mb-2">
              <h3 className="font-semibold text-sm mb-2">Olá!</h3>
              
              <div className="mb-2">
                <Label className="text-xs mb-2 block">Adicione fotos</Label>
                <p className="text-xs text-gray-600 mb-2">
                  Aumente suas chances em 25% ilustrando sua necessidade
                </p>
                <div className="flex space-x-2">
                  {[0, 1, 2].map((index) => (
                    <label
                      key={index}
                      className="w-14 h-14 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors"
                    >
                      <Camera className="w-4 h-4 text-gray-400" />
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <Label className="text-xs mb-2 block">Endereço</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Seu endereço"
                    className="text-xs h-8"
                  />
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-9 text-sm">
                Publicar Pedido
              </Button>
            </Card>

            {/* Earn Money Card */}
            <Card className="p-3 bg-gradient-to-br from-orange-50 to-pink-50">
              <h3 className="font-semibold text-sm mb-2">Arredonde sua renda</h3>
              <p className="text-xs text-gray-700 mb-2">
                Responda aos pedidos próximos e gere renda extra
              </p>
              <Button className="w-full bg-[#FF9B8A] hover:bg-[#FF8A79] text-white h-9 text-sm">
                Oferecer Serviços
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;