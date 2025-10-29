
import React, { useState, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { ConfigurationPanel, ResourceConfig } from './components/ConfigurationPanel';
import { ResponsePanel } from './components/ResponsePanel';
import { generateResourceStream } from './services/geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<ResourceConfig>({
    topic: 'Le cycle de l\'eau pour des élèves de CM1',
    bloomLevel: 'Comprendre',
    resourceType: 'Quiz',
    audience: 'Enfants',
    duration: '10 minutes',
    style: 'Ludique et illustré',
    languageLevel: 'Simple et adapté',
    feedbackType: 'Immédiat et positif',
    link: '',
  });
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!config.topic.trim()) {
      setError("Le sujet principal est obligatoire.");
      return;
    }

    setIsLoading(true);
    setResponse('');
    setError(null);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const stream = generateResourceStream(config, signal);
      for await (const chunk of stream) {
        setResponse((prev) => prev + chunk);
      }
    } catch (err) {
      if (err instanceof Error) {
        // Don't show an error message if the user cancelled the stream.
        if (err.name !== 'AbortError') {
          console.error("Error generating resource:", err);
          setError(`Une erreur est survenue: ${err.message}. Vérifiez la console pour plus de détails.`);
        }
      } else {
        console.error("An unknown error occurred:", err);
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [config]);

  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        <aside className="w-full md:w-1/3 flex flex-col bg-gray-800/50 p-4 rounded-lg border border-gray-700 shadow-lg overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 text-gray-200 sticky top-0 bg-gray-800/50 pb-2 -mt-4 pt-4 z-10">Configuration</h2>
          <ConfigurationPanel
            config={config}
            setConfig={setConfig}
            onSubmit={handleSubmit}
            onStop={handleStop}
            isLoading={isLoading}
          />
        </aside>
        <section className="w-full md:w-2/3 flex flex-col">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-lg mb-4 text-sm" role="alert">
              <strong>Erreur :</strong> {error}
            </div>
          )}
          <ResponsePanel
            title={isLoading ? 'Génération en cours...' : (response ? 'Ressource Générée' : 'En attente de génération')}
            response={response}
            isLoading={isLoading}
            config={config}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
