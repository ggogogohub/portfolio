import React from "react";

/* Media Gallery — corrected SVG diagram based on verified repo evidence
   Source: https://github.com/ggogogohub/Media-Gallery (React, Vite, Azure Blob, Cosmos DB, Logic Apps)
*/
export default function MediaGalleryDiagram() {
  return (
    <svg
      viewBox="0 0 480 260"
      className="w-full h-auto"
      role="img"
      aria-label="Media Gallery architecture: Upload interface → Azure Blob Storage → Logic Apps / Cosmos DB → Preview result"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="mg-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6b7f5e" />
          <stop offset="100%" stopColor="#8aa07a" />
        </linearGradient>
      </defs>

      {/* Nodes */}
      <g fontFamily="system-ui, sans-serif">
        {/* Upload */}
        <rect x="20" y="30" width="110" height="56" rx="12" fill="#ebe9e2" stroke="#cfc9bc" strokeWidth="1.5" />
        <text x="75" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="#121211">Upload</text>
        <text x="75" y="76" textAnchor="middle" fontSize="10" fill="#78736b">UI / React · Vite</text>

        {/* Storage */}
        <rect x="160" y="30" width="110" height="56" rx="12" fill="#ebe9e2" stroke="#cfc9bc" strokeWidth="1.5" />
        <text x="215" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="#121211">Storage</text>
        <text x="215" y="76" textAnchor="middle" fontSize="10" fill="#78736b">Azure Blob Storage</text>

        {/* API + Meta */}
        <rect x="300" y="30" width="140" height="56" rx="12" fill="#ebe9e2" stroke="#6b7f5e" strokeWidth="2" />
        <text x="370" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="#121211">API + Meta</text>
        <text x="370" y="76" textAnchor="middle" fontSize="10" fill="#78736b">Logic Apps · Cosmos DB</text>

        {/* Result */}
        <rect x="160" y="160" width="160" height="64" rx="14" fill="#ebe9e2" stroke="#6b7f5e" strokeWidth="2.5" />
        <text x="240" y="188" textAnchor="middle" fontSize="14" fontWeight="600" fill="#121211">Result — preview &amp; manage</text>
        <text x="240" y="206" textAnchor="middle" fontSize="10" fill="#78736b">Verified: React → Storage → API → User</text>
      </g>

      {/* Arrows — precise from node edges */}
      <g stroke="url(#mg-grad)" strokeWidth="2.5" fill="none" markerEnd="url(#mg-arrow)" strokeLinecap="round">
        {/* Upload → Storage */}
        <line x1="130" y1="58" x2="160" y2="58" />
        {/* Storage → API */}
        <line x1="270" y1="58" x2="300" y2="58" />
        {/* API → Result (down + left) */}
        <polyline points="370,86 370,160 240,160" />
      </g>

      {/* Arrow marker */}
      <defs>
        <marker id="mg-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 10 3, 0 6" fill="#6b7f5e" />
        </marker>
      </defs>
    </svg>
  );
}
