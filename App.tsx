import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CaseWorkflow } from './components/CaseWorkflow';
import { AICoach } from './components/AICoach';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to handle navigation
  const navigateTo = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        onChangeView={navigateTo} 
        isMobileOpen={isMobileMenuOpen}
      />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-30">
        <span className="text-lg font-bold text-brand-700">Coco</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <main className="md:pl-64 p-4 md:p-8 min-h-screen">
        {currentView === 'dashboard' && (
          <Dashboard 
            onNewCase={() => navigateTo('case')}
            onViewCase={() => navigateTo('case')}
          />
        )}
        
        {currentView === 'case' && (
          <CaseWorkflow />
        )}
        
        {(currentView === 'team' || currentView === 'settings') && (
          <div className="flex items-center justify-center h-[50vh] text-slate-400">
            <div className="text-center">
              <p className="text-lg font-medium">Work in Progress</p>
              <p className="text-sm">This module is part of Phase 2.</p>
            </div>
          </div>
        )}
      </main>

      {/* Global AI Coach Overlay */}
      <AICoach />
      
      {/* Mobile Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;