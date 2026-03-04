import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Empregos from './pages/Empregos';
import Mapa from './pages/Mapa';
import Mensagens from './pages/Mensagens';
import Perfil from './pages/Perfil';
import Creditos from './pages/Creditos';
import Abonamento from './pages/Abonamento';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empregos" element={<Empregos />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/mensagens" element={<Mensagens />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/creditos" element={<Creditos />} />
        <Route path="/abonamento" element={<Abonamento />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;