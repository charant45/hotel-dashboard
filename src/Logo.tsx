import React from 'react'

const Logo: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 150 180">
    <defs>
      <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A5568" />
        <stop offset="100%" stopColor="#2D3748" />
      </linearGradient>
    </defs>

    {/* Decreased the height of the building */}
    <rect x="15" y="40" width="120" height="100" fill="url(#buildingGradient)" stroke="white" strokeWidth="6" />
    <rect x="15" y="40" width="120" height="10" fill="#718096" opacity="0.7" />
    <rect x="125" y="40" width="10" height="100" fill="#718096" opacity="0.7" />

    {/* Increased the size of the roof */}
    <polygon points="0,40 75,10 150,40" fill="#A0AEC0" />
    <polygon points="75,10 150,40 140,35" fill="#718096" />

    {/* Door */}
    <rect x="60" y="90" width="30" height="50" fill="#4A5568" />
    <rect x="60" y="90" width="30" height="5" fill="#718096" />
    <rect x="85" y="90" width="5" height="50" fill="#718096" />
    <circle cx="85" cy="115" r="3" fill="#F6E05E" />

    {/* Windows */}
    <rect x="30" y="60" width="30" height="30" fill="#81E6D9" />
    <rect x="30" y="60" width="30" height="5" fill="#4FD1C5" />
    <rect x="55" y="60" width="5" height="30" fill="#4FD1C5" />

    <rect x="90" y="60" width="30" height="30" fill="#81E6D9" />
    <rect x="90" y="60" width="30" height="5" fill="#4FD1C5" />
    <rect x="115" y="60" width="5" height="30" fill="#4FD1C5" />
    
  </svg>
)

export default Logo
