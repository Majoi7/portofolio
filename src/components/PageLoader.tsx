import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full border-4 border-[#d4f22b] border-t-transparent w-12 h-12 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;