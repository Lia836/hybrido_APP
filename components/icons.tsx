import React from 'react';

// You can find more icons at https://heroicons.com/

export const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.53125 8.25C5.06437 6.46875 6.46875 5.06437 8.25 4.53125C9.09375 4.2575 10.0625 4.0625 11.125 4.0625C13.4375 4.0625 15.375 4.75 16.75 6.125C17.75 7.125 18.375 8.375 18.75 9.75H12.875C12.4375 9.75 12.0625 10.125 12.0625 10.5625V17.9062C12.0625 18.3438 12.4375 18.7188 12.875 18.7188H19.125V19.0938C19.125 19.5312 18.75 19.9062 18.3125 19.9062H5.6875C5.25 19.9062 4.875 19.5312 4.875 19.0938V10.1562C4.875 9.09375 4.6875 8.65625 4.53125 8.25Z" fill="#4285F4"/>
    <path d="M12.0625 17.9062V10.5625C12.0625 10.125 12.4375 9.75 12.875 9.75H18.75C18.375 8.375 17.75 7.125 16.75 6.125C15.375 4.75 13.4375 4.0625 11.125 4.0625C10.0625 4.0625 9.09375 4.2575 8.25 4.53125C6.46875 5.06437 5.06437 6.46875 4.53125 8.25C4.6875 8.65625 4.875 9.09375 4.875 10.1562V19.0938C4.875 19.5312 5.25 19.9062 5.6875 19.9062H18.3125C18.75 19.9062 19.125 19.5312 19.125 19.0938V18.7188H12.875C12.4375 18.7188 12.0625 18.3438 12.0625 17.9062Z" fill="url(#paint0_linear_1_2)"/>
    <defs>
      <linearGradient id="paint0_linear_1_2" x1="11.8281" y1="4.0625" x2="11.8281" y2="19.9062" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34A853"/>
        <stop offset="0.5" stopColor="#FBBC05"/>
        <stop offset="1" stopColor="#EA4335"/>
      </linearGradient>
    </defs>
  </svg>
);


export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);

export const StopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
    </svg>
);

export const ExportIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const PaperClipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.122 2.122l7.81-7.81" />
  </svg>
);

export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
);

export const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);
