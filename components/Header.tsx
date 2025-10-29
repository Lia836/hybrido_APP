
import React from 'react';
import { GeminiIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center p-4 bg-gray-800/80 border-b border-gray-700 sticky top-0 backdrop-blur-sm z-10">
      <GeminiIcon className="h-8 w-8 mr-3" />
      <h1 className="text-2xl font-bold tracking-tight text-white">
        Hybrido <span className="text-gray-400">Créateur de ressources multimodales</span>
      </h1>
    </header>
  );
};
