import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Empregos from './pages/Empregos';
import Mapa from './pages/Mapa';
import Mensagens from './pages/Mensagens';
import Perfil from './pages/Perfil';
import Creditos from './pages/Creditos';
import Abonamento from './pages/Abonamento';
import Assinatura from './pages/Assinatura';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Orcamentos from './pages/admin/Orcamentos';
import Clientes from './pages/admin/Clientes';
import Parametros from './pages/admin/Parametros';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Home />} />
        <Route path="/empregos" element={<Empregos />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/mensagens" element={<Mensagens />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/creditos" element={<Creditos />} />
        <Route path="/abonamento" element={<Abonamento />} />
        <Route path="/assinatura" element={<Assinatura />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orcamentos" element={<Orcamentos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="parametros" element={<Parametros />} />
          <Route path="demandas" element={<AdminDashboard />} />
          <Route path="perimetro" element={<AdminDashboard />} />
          <Route path="perfil" element={<AdminDashboard />} />
          <Route path="editar-perfil" element={<AdminDashboard />} />
          <Route path="avaliacoes" element={<AdminDashboard />} />
          <Route path="seo" element={<AdminDashboard />} />
          <Route path="comunicacao" element={<AdminDashboard />} />
          <Route path="faturas" element={<AdminDashboard />} />
          <Route path="recebimentos" element={<AdminDashboard />} />
          <Route path="catalogo" element={<AdminDashboard />} />
          <Route path="tutoriais" element={<AdminDashboard />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;