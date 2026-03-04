import React, { useState } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Send } from 'lucide-react';
import { mockProviders } from '../mock/data';

const Mensagens = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations] = useState(mockProviders);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] pb-16 md:pb-0">
      <Header />
      <div className="max-w-6xl mx-auto px-3 py-3">
        <Card className="h-[calc(100vh-140px)] flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-3 border-b border-gray-200">
              <h2 className="text-lg font-bold mb-2">Mensagens</h2>
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar..."
                  className="pl-8 h-8 text-sm"
                />
              </div>
            </div>
            <Tabs defaultValue="todas" className="flex-1">
              <TabsList className="w-full grid grid-cols-2 rounded-none border-b">
                <TabsTrigger value="todas" className="text-xs">Todas</TabsTrigger>
                <TabsTrigger value="nao-lidas" className="text-xs">Não lidas</TabsTrigger>
              </TabsList>
              <TabsContent value="todas" className="m-0">
                <div className="space-y-0">
                  {conversations.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedUser?.id === user.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                          <p className="text-xs text-gray-600 truncate">
                            Clique para ver a conversa
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="nao-lidas" className="m-0">
                <div className="p-4 text-center text-sm text-gray-500">
                  Nenhuma mensagem não lida
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-3 border-b border-gray-200 flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{selectedUser.name}</h3>
                    <p className="text-xs text-gray-500">{selectedUser.address}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-2 max-w-xs">
                        <p className="text-sm">Olá! Vi que você está procurando por serviços. Posso ajudar?</p>
                        <span className="text-xs text-gray-500">Há 2h</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-green-600 text-white rounded-lg p-2 max-w-xs">
                        <p className="text-sm">Perfeito! Quando você está disponível?</p>
                        <span className="text-xs opacity-90">Há 1h</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 h-9"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="text-sm">Selecione uma conversa</p>
                  <p className="text-xs">para começar a conversar</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Mensagens;