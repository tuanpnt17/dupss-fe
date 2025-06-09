import React from 'react';

const LandingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold">Landing Page</h1>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2023 Your Company</p>
        </footer>

    </div>
  )
}

export default LandingLayout