
import React, { useState } from 'react';
import { SendIcon, StopIcon, PaperClipIcon, LinkIcon, XCircleIcon, ChevronDownIcon } from './icons';

export interface FileData {
  name: string;
  type: string;
  content: string; // base64 encoded
}

export interface ResourceConfig {
  topic: string;
  bloomLevel: 'Se souvenir' | 'Comprendre' | 'Appliquer' | 'Analyser' | 'Évaluer' | 'Créer';
  resourceType: 'Quiz' | 'Cas pratique' | 'Infographie' | 'Script vidéo' | 'Activité collaborative';
  audience: 'Enfants' | 'Adolescents' | 'Adultes' | 'Professionnels';
  duration: string;
  style: string;
  languageLevel: string;
  feedbackType: string;
  file?: FileData;
  link: string;
}

interface ConfigurationPanelProps {
  config: ResourceConfig;
  setConfig: React.Dispatch<React.SetStateAction<ResourceConfig>>;
  onSubmit: () => void;
  // FIX: Add onStop prop to allow cancelling generation.
  onStop: () => void;
  isLoading: boolean;
}

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ config, setConfig, onSubmit, onStop, isLoading }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert(`Le fichier est trop volumineux. La taille maximale est de ${MAX_FILE_SIZE / 1024 / 1024} Mo.`);
        event.target.value = ''; // Clear the input
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Content = (e.target?.result as string).split(',')[1];
        if (base64Content) {
          setConfig(prev => ({
            ...prev,
            file: {
              name: file.name,
              type: file.type,
              content: base64Content,
            }
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearFile = () => {
    setConfig(prev => ({...prev, file: undefined}));
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col h-full">
      <div className="flex-grow space-y-4 overflow-y-auto pr-2">
        {/* Sujet principal */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">Sujet principal</label>
          <textarea
            id="topic"
            name="topic"
            value={config.topic}
            onChange={handleChange}
            placeholder="Ex: Le cycle de l'eau pour des élèves de CM1"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200 focus:ring-2 focus:ring-gemini-blue focus:border-gemini-blue transition"
            rows={3}
            required
          />
        </div>

        {/* Source de contenu */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">Source de contenu (optionnel)</label>
          <div className="flex items-center space-x-2">
            <label htmlFor="file-upload" className="flex-1 relative cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium py-2 px-3 rounded-md border border-gray-600 transition-colors">
              <div className="flex items-center">
                <PaperClipIcon className="h-4 w-4 mr-2" />
                <span>{config.file ? "Fichier sélectionné" : "Importer un fichier"}</span>
              </div>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
            </label>
            {config.file && (
              <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-1.5 rounded-md text-sm">
                  <span className="text-gray-300 truncate max-w-xs">{config.file.name}</span>
                  <button type="button" onClick={handleClearFile} className="text-gray-400 hover:text-white">
                      <XCircleIcon className="h-5 w-5" />
                  </button>
              </div>
            )}
          </div>
          <div className="relative">
            <LinkIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              name="link"
              value={config.link}
              onChange={handleChange}
              placeholder="Ou coller un lien web..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-gray-200 focus:ring-2 focus:ring-gemini-blue focus:border-gemini-blue transition"
            />
          </div>
        </div>

        {/* --- Main selectors --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bloomLevel" className="block text-sm font-medium text-gray-300 mb-1">Niveau Bloom</label>
            <select id="bloomLevel" name="bloomLevel" value={config.bloomLevel} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200">
              <option>Se souvenir</option>
              <option>Comprendre</option>
              <option>Appliquer</option>
              <option>Analyser</option>
              <option>Évaluer</option>
              <option>Créer</option>
            </select>
          </div>
          <div>
            <label htmlFor="resourceType" className="block text-sm font-medium text-gray-300 mb-1">Type de ressource</label>
            <select id="resourceType" name="resourceType" value={config.resourceType} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200">
              <option>Quiz</option>
              <option>Cas pratique</option>
              <option>Infographie</option>
              <option>Script vidéo</option>
              <option>Activité collaborative</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="audience" className="block text-sm font-medium text-gray-300 mb-1">Public cible</label>
            <select id="audience" name="audience" value={config.audience} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200">
              <option>Enfants</option>
              <option>Adolescents</option>
              <option>Adultes</option>
              <option>Professionnels</option>
            </select>
          </div>
        </div>

        {/* --- Advanced Settings Toggle --- */}
        <div className="pt-2 border-t border-gray-700">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white transition-colors py-2"
            aria-expanded={isAdvancedOpen}
            aria-controls="advanced-settings"
          >
            <span className="font-semibold">Paramètres avancés</span>
            <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* --- Collapsible Advanced Settings --- */}
        {isAdvancedOpen && (
          <div id="advanced-settings" className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Durée</label>
              <input type="text" id="duration" name="duration" value={config.duration} onChange={handleChange} placeholder="Ex: 15 minutes" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200"/>
            </div>
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-1">Style/Ton</label>
              <input type="text" id="style" name="style" value={config.style} onChange={handleChange} placeholder="Ex: Ludique, formel" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200"/>
            </div>
            <div>
              <label htmlFor="languageLevel" className="block text-sm font-medium text-gray-300 mb-1">Niveau linguistique</label>
              <input type="text" id="languageLevel" name="languageLevel" value={config.languageLevel} onChange={handleChange} placeholder="Ex: A2, C1, simple" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200"/>
            </div>
            <div>
              <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-300 mb-1">Type de feedback</label>
              <input type="text" id="feedbackType" name="feedbackType" value={config.feedbackType} onChange={handleChange} placeholder="Ex: Immédiat, constructif" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200"/>
            </div>
          </div>
        )}
      </div>
      
      {/* --- Submit Button --- */}
      <div className="pt-4 border-t border-gray-700">
        <button
          // FIX: Change button type and action based on loading state.
          type={isLoading ? "button" : "submit"}
          onClick={isLoading ? onStop : undefined}
          // FIX: Don't disable button when loading to allow stopping. Disable only if topic is empty when not loading.
          disabled={!isLoading && !config.topic.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-lg font-semibold text-white bg-gemini-blue rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <StopIcon className="h-6 w-6" />
              <span>Génération en cours...</span>
            </>
          ) : (
            <>
              <SendIcon className="h-6 w-6" />
              <span>Générer la ressource</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
