import React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/buttons';
import Logo from '/logo_asteria.svg';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full text-center flex flex-col items-center">
        
        <img 
          src={Logo} 
          alt="Logo Astéria" 
          className="w-32 mb-6" 
        />
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">Página Não Encontrada</h2>
        <p className="text-gray-400 mb-6">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>

        <Link to="/" className="w-full">
          <PrimaryButton>Voltar ao Início</PrimaryButton>
        </Link>

      </div>
    </div>
  );
}