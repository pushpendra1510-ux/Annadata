import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b-2 border-green-100 py-6">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        {/* App Name and Tagline */}
        <div className="flex flex-col items-center gap-2">
          <h1 style={{ fontFamily: 'serif', fontWeight: 700, fontSize: '2.5rem', color: '#B05A1E', letterSpacing: 1 }}>
            Rait
          </h1>
          <p className="text-lg font-medium" style={{ color: '#B05A1E' }}>
            Know More Grow More
          </p>
        </div>
      </div>
    </header>
  );
};