import React from 'react';
import { LayoutDashboard, Receipt, Users, Beer, Database, Zap } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMockMode: boolean;
  setIsMockMode: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isMockMode, setIsMockMode }) => {
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

      {/* Mock Mode Toggle */}
      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Data Bron
            </span>
        </div>
        <label className="flex items-center cursor-pointer relative group p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isMockMode}
                onChange={(e) => setIsMockMode(e.target.checked)}
            />
            <div className={`w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer relative peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${isMockMode ? 'peer-checked:bg-blue-600' : ''}`}></div>
            <span className="ml-3 text-sm font-medium text-slate-700 flex items-center gap-2">
                {isMockMode ? (
                    <>
                        <Zap className="w-4 h-4 text-orange-500" />
                        Demo Modus
                    </>
                ) : (
                    <>
                        <Database className="w-4 h-4 text-slate-400" />
                        Live Database
                    </>
                )}
            </span>
        </label>
      </div>
    </div>
  );
};

export default Sidebar;