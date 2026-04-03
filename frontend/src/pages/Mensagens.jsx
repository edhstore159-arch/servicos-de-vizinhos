import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Send, Paperclip, Camera, Star, Phone, Video, Share2, Pin, Archive, Flag, Ban, X, Calendar, CreditCard, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const mockConversations = [
  {
    id: '1',
    name: 'Linda L.',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    reviewCount: 2,
    date: '01/11/2025',
    service: 'Mudanças e ajuda com mudança',
    lastMessage: 'Você: sim',
    unread: false,
    messages: [
      { id: 'm1', type: 'system', text: 'Pedido privado', detail: 'Aqui está meu pedido privado. Aguardo sua resposta.', time: '10:10', date: 'seg. 16 jun 2025', fromMe: false, hasAction: true },
      { id: 'm2', type: 'text', text: 'sim', time: '19:15', date: 'sáb. 01 nov 2025', fromMe: true, read: false },
    ]
  },
  {
    id: '2',
    name: 'Usuário suspens...',
    avatar: '',
    rating: 0,
    reviewCount: 0,
    date: '03/04/2025',
    service: 'Vendedor - Comercial',
    lastMessage: 'Você: Olá',
    unread: true,
    messages: [
      { id: 'm3', type: 'text', text: 'Olá, tudo bem?', time: '14:30', date: 'qui. 03 abr 2025', fromMe: false },
      { id: 'm4', type: 'text', text: 'Olá', time: '14:35', date: 'qui. 03 abr 2025', fromMe: true, read: true },
    ]
  },
  {
    id: '3',
    name: 'Cléo M.',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 0,
    reviewCount: 5,
    date: '25/09/2024',
    service: 'Montagem de móveis em kit',
    lastMessage: 'Você: Disponível',
    unread: false,
    messages: [
      { id: 'm5', type: 'text', text: 'Preciso de ajuda para montar um armário.', time: '09:00', date: 'qua. 25 set 2024', fromMe: false },
      { id: 'm6', type: 'text', text: 'Disponível', time: '09:15', date: 'qua. 25 set 2024', fromMe: true, read: true },
    ]
  },
  {
    id: '4',
    name: 'Julien S.',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 0,
    reviewCount: 5,
    date: '25/09/2024',
    service: 'Montagem de móveis em kit',
    lastMessage: 'Você: Disponível',
    unread: false,
    messages: []
  },
  {
    id: '5',
    name: 'Milla R.',
    avatar: 'https://i.pravatar.cc/150?img=23',
    rating: 0,
    reviewCount: 5,
    date: '24/09/2024',
    service: 'Mudanças e ajuda com mudança',
    lastMessage: 'Você: Disponível',
    unread: false,
    messages: []
  }
];

const Mensagens = () => {
  const { user } = useAuth();
  const [selectedConv, setSelectedConv] = useState(null);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('todas');
  const [conversations, setConversations] = useState(mockConversations);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConv]);

  const handleSend = () => {
    if (!message.trim() || !selectedConv) return;
    const newMsg = {
      id: `m${Date.now()}`,
      type: 'text',
      text: message,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      date: 'Hoje',
      fromMe: true,
      read: false
    };
    setConversations(prev => prev.map(c =>
      c.id === selectedConv.id
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: `Você: ${message}` }
        : c
    ));
    setSelectedConv(prev => prev ? { ...prev, messages: [...prev.messages, newMsg] } : null);
    setMessage('');
  };

  const filtered = filter === 'nao-lidas' ? conversations.filter(c => c.unread) : filter === 'arquivadas' ? [] : conversations;

  const conv = selectedConv;

  return (
    <div className="min-h-screen bg-[#FFF5F3] pb-16 md:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto px-2 py-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-80px)] flex overflow-hidden">

          {/* LEFT - Conversation List */}
          <div className="w-72 border-r border-gray-200 flex flex-col" data-testid="conversations-list">
            <div className="flex border-b border-gray-200">
              {['todas', 'nao-lidas', 'arquivadas'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  data-testid={`filter-${f}`}
                  className={`flex-1 py-3 text-xs font-medium transition-colors ${filter === f ? 'text-gray-900 border-b-2 border-gray-900 bg-gray-50' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {f === 'todas' ? 'Todas' : f === 'nao-lidas' ? 'Não lidas' : 'Arquivadas'}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">Nenhuma conversa</p>
              ) : (
                filtered.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedConv(c)}
                    data-testid={`conv-${c.id}`}
                    className={`px-3 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConv?.id === c.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src={c.avatar} />
                        <AvatarFallback className="bg-gray-200 text-gray-500 text-sm">{c.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm truncate">{c.name}</h4>
                          <span className="text-xs text-gray-400 flex-shrink-0">{c.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span>{c.rating}/5 ({c.reviewCount} avis)</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{c.service}</p>
                        <p className="text-xs text-gray-400 truncate">{c.lastMessage}</p>
                      </div>
                      {c.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CENTER - Chat Area */}
          <div className="flex-1 flex flex-col" data-testid="chat-area">
            {conv ? (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-white">
                  {conv.messages.map((msg, i) => {
                    const showDate = i === 0 || conv.messages[i - 1]?.date !== msg.date;
                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div className="text-center my-4">
                            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{msg.date}</span>
                          </div>
                        )}
                        <div className={`flex mb-3 ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
                          {!msg.fromMe && (
                            <Avatar className="w-7 h-7 mr-2 flex-shrink-0 mt-1">
                              <AvatarImage src={conv.avatar} />
                              <AvatarFallback className="text-xs">{conv.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                            msg.fromMe
                              ? 'bg-blue-500 text-white rounded-br-md'
                              : msg.type === 'system'
                                ? 'bg-[#E8F4FD] rounded-bl-md'
                                : 'bg-gray-100 rounded-bl-md'
                          }`}>
                            {msg.type === 'system' && (
                              <p className="text-sm font-semibold text-blue-700 mb-1">{msg.text}</p>
                            )}
                            {msg.type === 'system' && msg.detail && (
                              <p className="text-sm text-gray-700">{msg.detail}</p>
                            )}
                            {msg.type === 'system' && msg.hasAction && (
                              <Button size="sm" variant="outline" className="mt-2 text-xs border-blue-300 text-blue-700">
                                Consultar
                              </Button>
                            )}
                            {msg.type === 'text' && <p className="text-sm">{msg.text}</p>}
                            <div className={`flex items-center gap-1 mt-1 ${msg.fromMe ? 'justify-end' : ''}`}>
                              <span className={`text-xs ${msg.fromMe ? 'text-blue-100' : 'text-gray-400'}`}>{msg.time}</span>
                              {msg.fromMe && msg.read === false && (
                                <span className="text-xs text-blue-100">Não lido</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Action Buttons */}
                <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-2 overflow-x-auto">
                  <button className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors" data-testid="action-decline">
                    <X className="w-5 h-5 text-gray-500" />
                    <span className="text-xs text-gray-500 mt-0.5">Recusar</span>
                  </button>
                  <button className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors" data-testid="action-schedule">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-xs text-gray-500 mt-0.5">Agendar</span>
                  </button>
                  <button className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors" data-testid="action-payment">
                    <CreditCard className="w-5 h-5 text-green-500" />
                    <span className="text-xs text-gray-500 mt-0.5">Pagamento</span>
                  </button>
                  <button className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors relative" data-testid="action-more">
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    <span className="text-xs text-gray-500 mt-0.5">Ver tudo</span>
                  </button>
                </div>

                {/* Message Input */}
                <div className="px-4 py-3 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-gray-600"><Paperclip className="w-5 h-5" /></button>
                    <button className="text-gray-400 hover:text-gray-600"><Camera className="w-5 h-5" /></button>
                    <Input
                      data-testid="message-input"
                      placeholder="Sua mensagem"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      className="flex-1 h-10 rounded-full border-gray-200"
                    />
                    <Button
                      data-testid="send-message-btn"
                      onClick={handleSend}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 rounded-full w-10 h-10 p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-base">Selecione uma conversa</p>
                  <p className="text-sm">para começar a conversar</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT - Profile Sidebar */}
          {conv && (
            <div className="w-72 border-l border-gray-200 flex flex-col p-4 overflow-y-auto" data-testid="profile-sidebar">
              <div className="text-center mb-4">
                <Avatar className="w-16 h-16 mx-auto mb-2">
                  <AvatarImage src={conv.avatar} />
                  <AvatarFallback className="text-xl bg-gray-200">{conv.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{conv.name}</h3>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{conv.rating}/5 ({conv.reviewCount} avis)</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 mb-4">
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <Video className="w-4 h-4 text-gray-500" />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <Phone className="w-4 h-4 text-gray-500" />
                </button>
                <Button variant="outline" size="sm" className="rounded-full text-xs" data-testid="view-profile-btn">
                  Ver perfil
                </Button>
              </div>

              <div className="space-y-1 border-t border-gray-100 pt-4">
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" /> Compartilhar perfil
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Pin className="w-4 h-4" /> Fixar conversa
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Archive className="w-4 h-4" /> Arquivar conversa
                </button>
              </div>

              <div className="space-y-1 border-t border-gray-100 pt-4 mt-4">
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Flag className="w-4 h-4" /> Denunciar perfil
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Ban className="w-4 h-4" /> Bloquear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mensagens;
