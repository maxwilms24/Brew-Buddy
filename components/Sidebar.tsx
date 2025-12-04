import React from 'react';
import { LayoutDashboard, Receipt, Users, Beer } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'TRANSACTIONS', label: 'Transacties', icon: Receipt },
    { id: 'USERS', label: 'Gebruikersbeheer', icon: Users },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-slate-200 hidden md:flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-slate-900 p-2 rounded-lg">
          <Beer className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Brew Buddy</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewState)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              currentView === item.id
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="text-xs text-slate-400 text-center mt-auto">
        v1.2.0 - Demo Mode
      </div>
    </div>
  );
};

export default Sidebar;