import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Heart, Share2, MessageSquare, MapPin, X, Camera, Globe, ChevronRight, Users } from 'lucide-react';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const mockPosts = [
  {
    id: '1',
    userName: 'João S.',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    isPro: true,
    time: 'postado às 19:38',
    title: 'Preciso de ajuda com instalação elétrica',
    description: 'Olá, estou precisando de um eletricista para fazer algumas instalações na minha casa. Tenho 3 pontos de tomada para instalar e preciso trocar o disjuntor principal.',
    location: 'São Paulo, SP - 1.8 km',
    budget: 'A combinar',
    category: 'Eletricista',
    likes: 12,
    recommends: 5,
    responses: 6
  },
  {
    id: '2',
    userName: 'Maria F.',
    userAvatar: 'https://i.pravatar.cc/150?img=45',
    isPro: false,
    time: 'postado às 19:18',
    title: 'Preciso de serviço de encanamento para desentupir vaso sanitário',
    description: 'Olá, preciso de serviço de encanamento para desentupir o vaso sanitário (elétrico). Há vazamento e a descarga não funciona mais corretamente.',
    location: 'Rio de Janeiro, RJ - 3.2 km',
    budget: 'R$ 300',
    category: 'Encanador',
    likes: 8,
    recommends: 3,
    responses: 12
  },
  {
    id: '3',
    userName: 'Carlos O.',
    userAvatar: 'https://i.pravatar.cc/150?img=33',
    isPro: false,
    time: 'postado às 18:45',
    title: 'Preciso de alguém com caminhão para mudança',
    description: 'Olá, preciso agora de alguém com caminhão para mudar comigo um sofá para a zona sul. Urgente!',
    location: 'Belo Horizonte, MG - 5 km',
    budget: 'A combinar',
    category: 'Mudança',
    likes: 15,
    recommends: 8,
    responses: 4
  }
];

const themes = [
  {
    id: 't1',
    title: 'Preciso de ajuda para pequenos trabalhos',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=400&h=300&fit=crop',
    likes: '10.0k',
    shares: '2.7k'
  },
  {
    id: 't2',
    title: 'Preciso de ajuda para limpeza',
    image: 'https://images.unsplash.com/photo-1758273238795-c284e5ae09b6?w=400&h=300&fit=crop',
    likes: '13.1k',
    shares: '3.5k'
  },
  {
    id: 't3',
    title: 'É primavera!',
    image: 'https://images.unsplash.com/photo-1606676539940-12768ce0e762?w=400&h=300&fit=crop',
    likes: '1.1k',
    shares: '277'
  }
];

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Card className="p-4 mb-3 hover:shadow-md transition-shadow border border-gray-100" data-testid={`post-${post.id}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Globe className="w-3.5 h-3.5" />
          <span>Pedido público</span>
        </div>
        <span className="text-xs text-gray-400">{post.time}</span>
      </div>

      <div className="flex items-start space-x-3 mb-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={post.userAvatar} alt={post.userName} />
          <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{post.userName}</h3>
          <p className="text-sm text-gray-700 mt-1">{post.description}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5" />
            <span>{post.location}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Orçamento: <span className="font-medium">{post.budget}</span>
          </p>
        </div>
      </div>

      <div className="text-xs text-gray-400 text-right mb-2">{post.responses} respostas</div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors ${liked ? 'text-red-500' : 'text-gray-500'}`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} />
          Curtir
        </button>
        <button className="flex items-center gap-1 text-xs text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <Users className="w-4 h-4" />
          Recomendar
        </button>
        <button className="flex items-center gap-1 text-xs text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <MessageSquare className="w-4 h-4" />
          Responder
        </button>
      </div>
    </Card>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showBanner, setShowBanner] = useState(true);
  const [postText, setPostText] = useState('Olá,');

  return (
    <div className="min-h-screen bg-[#FFF5F3] pb-16 md:pb-0">
      <Header />

      {/* Premium Banner */}
      {showBanner && (
        <div className="bg-[#FFE5E0]">
          <div className="max-w-7xl mx-auto px-4 py-3 text-center relative">
            <p className="text-sm text-[#E85D4A] font-medium">
              Acesse novamente ferramentas e serviços exclusivos: torne-se Premier!
            </p>
            <Button
              size="sm"
              className="bg-[#FF6B6B] hover:bg-[#E85D4A] text-white mt-2 rounded-full px-6"
              onClick={() => navigate('/abonamento')}
              data-testid="premium-banner-btn"
            >
              Assinar novamente
            </Button>
            <button onClick={() => setShowBanner(false)} className="absolute right-4 top-3 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Feed */}
          <div className="lg:col-span-2">
            {/* Posts Feed */}
            <div className="space-y-0">
              {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Themed Categories */}
            <div className="mt-6 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">&#127912;</span>
                <h3 className="font-bold text-base">Temáticas do momento</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">Ganhe tempo: publique todos os seus pedidos em um clique.</p>

              <div className="grid grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <div key={theme.id} className="relative rounded-xl overflow-hidden cursor-pointer group h-48" data-testid={`theme-${theme.id}`}>
                    <img src={theme.image} alt={theme.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-medium leading-tight">{theme.title}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-white/80">
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{theme.likes}</span>
                        <span className="flex items-center gap-1"><Share2 className="w-3 h-3" />{theme.shares}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <Button variant="outline" className="rounded-full text-sm" data-testid="view-all-themes-btn">
                  Ver todas as temáticas
                </Button>
              </div>
            </div>

            {/* More Posts */}
            {mockPosts.slice(0, 1).map((post) => (
              <PostCard key={`extra-${post.id}`} post={{ ...post, id: `extra-${post.id}` }} />
            ))}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Post Form Card */}
            <Card className="p-4" data-testid="post-form-card">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Olá,"
                className="w-full h-20 border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-200"
                data-testid="post-textarea"
              />

              <div className="mt-3">
                <p className="text-sm font-medium mb-1">Adicione fotos</p>
                <p className="text-xs text-gray-500 mb-2">Aumente suas chances em 25% ilustrando sua necessidade.</p>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <label key={i} className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors">
                      <Camera className="w-5 h-5 text-gray-400" />
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Endereço</span>
                <span className="text-xs text-gray-400 flex-1 truncate">{user?.location || 'São Paulo, SP'}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              <Button className="w-full bg-green-500 hover:bg-green-600 text-white mt-4 rounded-full h-11" data-testid="post-demand-btn">
                Publicar meu pedido
              </Button>
            </Card>

            {/* Earn Money Card */}
            <Card className="p-4" data-testid="earn-money-card">
              <h3 className="font-bold text-lg mb-2">Arredonde sua renda</h3>
              <p className="text-sm text-gray-600 mb-4">
                Responda aos pedidos publicados perto de você e gere um complemento de renda.
              </p>
              <Button className="w-full bg-[#FF9B8A] hover:bg-[#FF8A79] text-white rounded-full h-11" data-testid="offer-services-btn">
                Propor meus serviços
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
