import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, PlusCircle, MessageCircle, MapPin, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { getCurrentUser } from '../mock/data';

const Header = () => {
  const location = useLocation();
  const user = getCurrentUser();

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/empregos', label: 'Empregos', icon: Briefcase },
    { path: '/mensagens', label: 'Mensagens', icon: MessageCircle },
    { path: '/mapa', label: 'Mapa', icon: MapPin },
    { path: '/perfil', label: 'Perfil', icon: User }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="ml-2 text-lg font-bold text-gray-800">servivizinhos</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 text-sm transition-colors ${
                    isActive ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-yellow-700">💳 {user.credits}</span>
            </div>
            <Link to="/perfil" className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            if (item.path === '/publicar') {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center -mt-6"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </Link>
              );
            }
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center text-xs py-2 ${
                  isActive ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;