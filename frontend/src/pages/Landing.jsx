import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Eye, EyeOff, X } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simular login
    localStorage.setItem('user', JSON.stringify({ email: loginData.email, name: 'Usuário' }));
    setShowLoginModal(false);
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    // Simular cadastro
    localStorage.setItem('user', JSON.stringify({ email: registerData.email, name: registerData.name }));
    setShowRegisterModal(false);
    navigate('/');
  };

  const handleSocialLogin = (provider) => {
    // Simular login social
    localStorage.setItem('user', JSON.stringify({ email: `user@${provider}.com`, name: 'Usuário' }));
    setShowLoginModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="text-xl font-bold text-gray-800">servivizinhos</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowRegisterModal(true)}
              className="border-2 border-gray-300 hover:border-green-500"
            >
              Cadastrar-se
            </Button>
            <Button
              onClick={() => setShowLoginModal(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white"
            >
              Entrar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                  S
                </div>
                <div>
                  <h1 className="text-4xl font-bold">
                    <span className="text-pink-500">servi</span>
                    <span className="text-green-500">vizinhos</span>
                  </h1>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Facilitador de Projetos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Paint Roller Image */}
          <div className="mb-8">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-pink-200 to-pink-100 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">🎨</div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Prestações de serviços
            <br />
            e locação de materiais
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Milhões de pessoas e profissionais em todo o Brasil
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => setShowRegisterModal(true)}
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-6 text-lg h-auto"
          >
            Criar uma conta
          </Button>
        </div>
      </div>

      {/* App Store Section */}
      <div className="bg-gray-700 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <a href="#" className="flex flex-col items-center">
              <div className="bg-gray-800 text-white px-6 py-3 rounded-lg mb-2 hover:bg-gray-900 transition-colors">
                <span className="text-lg">▶ Google Play</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="text-white text-sm">4.6/5</span>
              </div>
              <span className="text-white text-xs">Baseado em mais de 194 mil avaliações</span>
            </a>
            <a href="#" className="flex flex-col items-center">
              <div className="bg-gray-800 text-white px-6 py-3 rounded-lg mb-2 hover:bg-gray-900 transition-colors">
                <span className="text-lg">🍎 App Store</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="text-white text-sm">4.6/5</span>
              </div>
              <span className="text-white text-xs">Baseado em mais de 66 mil avaliações</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-green-500 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-lg mb-4">
            Conecte-se para aproveitar plenamente o Servivizinhos
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => setShowRegisterModal(true)}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3"
            >
              Cadastrar-me
            </Button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-white underline hover:no-underline"
            >
              Já inscrito? Fazer login
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="max-w-md">
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Que bom te ver de volta!</h2>
            
            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full h-12 border-2"
                onClick={() => handleSocialLogin('google')}
              >
                <span className="mr-2">🔍</span>
                Entrar com Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 border-2"
                onClick={() => handleSocialLogin('facebook')}
              >
                <span className="mr-2">📘</span>
                Continuar com Facebook
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
              <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 h-12">
                Entrar
              </Button>
            </form>

            <div className="text-center mt-4">
              <button className="text-sm text-gray-600 hover:underline">
                Esqueceu a senha?
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="max-w-md">
          <button
            onClick={() => setShowRegisterModal(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Criar uma conta</h2>
            
            {/* Social Register */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full h-12 border-2"
                onClick={() => handleSocialLogin('google')}
              >
                <span className="mr-2">🔍</span>
                Cadastrar com Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 border-2"
                onClick={() => handleSocialLogin('facebook')}
              >
                <span className="mr-2">📘</span>
                Cadastrar com Facebook
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Nome completo"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Senha"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirmar senha"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12">
                Criar conta
              </Button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }}
                className="text-sm text-gray-600 hover:underline"
              >
                Já tem uma conta? Faça login
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;