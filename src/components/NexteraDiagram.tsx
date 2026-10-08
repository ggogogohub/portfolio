import React from "react";
export default function NexteraDiagram() {
  return (
    <svg style={{ colorScheme: 'light' }} viewBox="0 0 480 260" className="w-full h-auto" role="img" aria-label="Nextera Workforce architecture" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="nx-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6b7f5e"/><stop offset="100%" stopColor="#8aa07a"/></linearGradient>
        <marker id="nx-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><polygon points="0 0, 10 3, 0 6" fill="#6b7f5e"/></marker>
      </defs>
      <g fontFamily="system-ui, sans-serif">
        <rect x="20" y="30" width="110" height="56" rx="12" fill="#ebe9e2" stroke="#cfc9bc" strokeWidth="1.5"/><text x="75" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="#121211">Frontend</text><text x="75" y="76" textAnchor="middle" fontSize="10" fill="#78736b">React · TypeScript</text>
        <rect x="160" y="30" width="100" height="56" rx="12" fill="#ebe9e2" stroke="#cfc9bc" strokeWidth="1.5"/><text x="210" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="#121211">API</text><text x="210" y="76" textAnchor="middle" fontSize="10" fill="#78736b">FastAPI</text>
        <rect x="290" y="30" width="110" height="56" rx="12" fill="#ebe9e2" stroke="#6b7f5e" strokeWidth="2"/><text x="345" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="#121211">Data · Container</text><text x="345" y="76" textAnchor="middle" fontSize="10" fill="#78736b">MongoDB · Docker</text>
        <rect x="160" y="130" width="110" height="56" rx="12" fill="#ebe9e2" stroke="#6b7f5e" strokeWidth="2"/><text x="215" y="158" textAnchor="middle" fontSize="13" fontWeight="600" fill="#121211">Optimization</text><text x="215" y="176" textAnchor="middle" fontSize="10" fill="#78736b">OR-Tools · Planning</text>
        <rect x="290" y="130" width="160" height="64" rx="14" fill="#ebe9e2" stroke="#6b7f5e" strokeWidth="2.5"/><text x="370" y="158" textAnchor="middle" fontSize="13" fontWeight="600" fill="#121211">Rota &amp; Management</text><text x="370" y="176" textAnchor="middle" fontSize="10" fill="#78736b">Verified: scheduling + output</text>
      </g>
      <g stroke="url(#nx-grad)" strokeWidth="2.5" fill="none" markerEnd="url(#nx-arrow)" strokeLinecap="round">
        <line x1="130" y1="58" x2="160" y2="58"/>
        <line x1="260" y1="58" x2="290" y2="58"/>
        <polyline points="345,86 345,130 215,130"/>
        <line x1="270" y1="158" x2="290" y2="158"/>
      </g>
    </svg>
  );
}
