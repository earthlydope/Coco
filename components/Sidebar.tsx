import React from 'react';
import { IconDashboard, IconUsers, IconClipboard, IconSettings } from './ui/Icons';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
  isMobileOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isMobileOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
    { id: 'case', label: 'New Case', icon: IconClipboard },
    { id: 'team', label: 'Team', icon: IconUsers },
    { id: 'settings', label: 'Settings', icon: IconSettings },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
      ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
    `}>
      <div className="h-full flex flex-col">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <span className="text-2xl mr-2">🦷</span>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
            Coco
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${currentView === item.id 
                  ? 'bg-brand-50 text-brand-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-brand-600' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs">
              RD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Dr. Ramzi D.</p>
              <p className="text-xs text-slate-500 truncate">Main Office</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};