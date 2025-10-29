import React, { useEffect, useRef } from 'react';
import { ExportIcon } from './icons';
import type { ResourceConfig } from './ConfigurationPanel';

// Extend the Window interface to include libraries loaded from CDN
declare global {
    interface Window {
        marked: {
            parse(markdown: string, options?: any): string;
        };
        DOMPurify: {
            sanitize(dirty: string): string;
        };
        hljs: {
            highlightAll(): void;
            highlightElement(element: HTMLElement): void;
        };
        html2canvas: (element: HTMLElement, options?: Partial<any>) => Promise<HTMLCanvasElement>;
    }
}

interface ResponsePanelProps {
  title: string;
  response: string;
  isLoading: boolean;
  config: ResourceConfig;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center space-x-2 text-gray-400">
        <div className="w-3 h-3 bg-gemini-blue rounded-full animate-pulse-fast"></div>
        <div className="w-3 h-3 bg-gemini-green rounded-full animate-pulse-fast" style={{animationDelay: '0.2s'}}></div>
        <div className="w-3 h-3 bg-gemini-yellow rounded-full animate-pulse-fast" style={{animationDelay: '0.4s'}}></div>
      </div>
    </div>
);

export const ResponsePanel: React.FC<ResponsePanelProps> = ({ title, response, isLoading, config }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && window.marked && window.DOMPurify) {
      const sanitizedHtml = window.DOMPurify.sanitize(window.marked.parse(response));
      contentRef.current.innerHTML = sanitizedHtml;
      contentRef.current.querySelectorAll('pre code').forEach((block) => {
        if(window.hljs) {
            window.hljs.highlightElement(block as HTMLElement);
        }
      });

      // Auto-scroll to bottom
      if(panelRef.current) {
          panelRef.current.scrollTop = panelRef.current.scrollHeight;
      }
    }
  }, [response]);

  const handleExport = async (format: 'md' | 'json' | 'png') => {
    if (!response || isLoading) return;

    const download = (content: string, filename: string, contentType: string) => {
      const blob = new Blob([content], { type: contentType });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    };

    const filenameBase = `hybrido_${config.resourceType.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    switch (format) {
      case 'md':
        download(response, `${filenameBase}.md`, 'text/markdown;charset=utf-8');
        break;
      case 'json':
        const jsonData = JSON.stringify({ config, response }, null, 2);
        download(jsonData, `${filenameBase}.json`, 'application/json;charset=utf-8');
        break;
      case 'png':
        if (contentRef.current && window.html2canvas) {
          try {
            const canvas = await window.html2canvas(contentRef.current, {
                backgroundColor: '#1f2937', // bg-gray-800
                useCORS: true,
                scale: 2,
            });
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${filenameBase}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.error('Error exporting to PNG:', error);
            alert("Une erreur est survenue lors de l'exportation en PNG.");
          }
        }
        break;
    }
  };

  const isExportDisabled = isLoading || !response;

  return (
    <div ref={panelRef} className="bg-gray-800 rounded-lg shadow-md overflow-y-auto flex flex-col h-full border border-gray-700">
      <div className="p-3 border-b border-gray-700 bg-gray-800/80 sticky top-0 backdrop-blur-sm z-10 flex justify-between items-center">
        <h2 className="font-mono text-sm text-gray-300 tracking-wider truncate mr-4">{title}</h2>
        
        <div className="relative">
          <details className="group">
            <summary 
              className={`list-none flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-300 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 transition-colors ${isExportDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={(e) => { if (isExportDisabled) e.preventDefault(); }}
              aria-disabled={isExportDisabled}
            >
              <ExportIcon className="h-4 w-4" />
              Exporter
            </summary>
            <div className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-20 hidden group-open:block">
              <ul className="py-1 text-sm text-gray-200">
                <li><button onClick={() => handleExport('png')} className="w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors">Image (.png)</button></li>
                <li><button onClick={() => handleExport('md')} className="w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors">Markdown (.md)</button></li>
                <li><button onClick={() => handleExport('json')} className="w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors">JSON (.json)</button></li>
              </ul>
            </div>
          </details>
        </div>
      </div>

      <div className="p-4 flex-grow prose prose-invert prose-sm max-w-none prose-pre:bg-gray-900/50 prose-pre:rounded-lg">
        {isLoading ? <LoadingIndicator /> : <div ref={contentRef} />}
        {!isLoading && response && <div className="inline-block w-2 h-4 bg-gemini-blue animate-pulse ml-1"></div>}
      </div>
    </div>
  );
};