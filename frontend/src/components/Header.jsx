import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, FileText, CreditCard, MessageCircle, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getCurrentUser } from '../mock/data';

const Header = () => {
  const location = useLocation();
  const user = getCurrentUser();

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/offreurs', label: 'Offreurs', icon: Users },
    { path: '/demande', label: 'Demande', icon: FileText },
    { path: '/abonnement', label: 'Abonnement', icon: CreditCard },
    { path: '/messages', label: 'Messages', icon: MessageCircle }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-xl font-bold">
              <span className="text-[#FF6B6B]">allo</span>
              <span className="text-[#4ECDC4]">voisins</span>
            </div>
            <span className="text-xs text-gray-500 ml-2">Paris (Châtelet)</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center text-xs transition-colors ${
                    isActive ? 'text-[#7CB342]' : 'text-gray-600 hover:text-[#7CB342]'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-0.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <button className="relative p-1 text-gray-600 hover:text-gray-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF6B6B] rounded-full"></span>
            </button>
            <Link to="/profile" className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden lg:block">{user.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;