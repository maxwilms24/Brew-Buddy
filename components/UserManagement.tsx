import React from 'react';
import { User } from '../types';
import { UserPlus, QrCode, Trophy, Users, Beer, Calendar, Crown } from 'lucide-react';

interface UserManagementProps {
  users: User[];
  onAddUserClick: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onAddUserClick }) => {
  // Calculate stats
  const totalUsers = users.length;
  
  const topConsumer = users.length > 0 
    ? users.reduce((prev, current) => (prev.totalConsumption > current.totalConsumption) ? prev : current, users[0])
    : null;

  const totalConsumed = users.reduce((sum, user) => sum + user.totalConsumption, 0);

  const getInitials = (name: string) => name.slice(0, 2).toUpperCase();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gebruikersbeheer</h2>
          <p className="text-slate-500 mt-1">Beheer wie toegang heeft tot de BrewBuddy.</p>
        </div>
        <button 
          onClick={onAddUserClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 border border-blue-500"
        >
          <UserPlus className="w-5 h-5" />
          Nieuwe Gebruiker
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Users */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:border-blue-200 transition-colors">
            <div className="bg-blue-50 p-4 rounded-xl text-blue-600 group-hover:bg-blue-100 transition-colors">
                <Users className="w-8 h-8" />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Totaal Gebruikers</p>
                <p className="text-3xl font-bold text-slate-900">{totalUsers}</p>
            </div>
            {/* Decoration */}
            <div className="absolute -right-6 -bottom-6 text-blue-50 opacity-50 group-hover:scale-110 transition-transform">
                <Users className="w-32 h-32" />
            </div>
        </div>

        {/* Card 2: Top Drinker */}
        <div className="bg-white p-6 rounded-2xl border border-yellow-100 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:border-yellow-300 transition-colors">
            <div className="bg-yellow-50 p-4 rounded-xl text-yellow-600 group-hover:bg-yellow-100 transition-colors">
                <Trophy className="w-8 h-8" />
            </div>
            <div className="z-10">
                <p className="text-sm font-bold text-yellow-600/70 uppercase tracking-wide">Grootste Zuipschuit</p>
                <p className="text-3xl font-bold text-slate-900 truncate max-w-[180px]">
                    {topConsumer?.name || '-'}
                </p>
            </div>
             {/* Decoration */}
             <div className="absolute -right-4 -bottom-4 text-yellow-50 opacity-80 group-hover:rotate-12 transition-transform">
                <Trophy className="w-32 h-32" />
            </div>
        </div>

        {/* Card 3: Total Beer */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:border-orange-200 transition-colors">
            <div className="bg-orange-50 p-4 rounded-xl text-orange-600 group-hover:bg-orange-100 transition-colors">
                <Beer className="w-8 h-8" />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Totaal Gezopen</p>
                <p className="text-3xl font-bold text-slate-900">{totalConsumed}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 text-orange-50 opacity-50 group-hover:scale-110 transition-transform">
                <Beer className="w-32 h-32" />
            </div>
        </div>
      </div>

      {/* User Grid */}
      <h3 className="text-xl font-bold text-slate-900 pt-4">Alle Leden</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user) => {
            const isTopConsumer = topConsumer && user.id === topConsumer.id && user.totalConsumption > 0;
            
            return (
              <div 
                key={user.id} 
                className={`group bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative ${isTopConsumer ? 'border-yellow-200 ring-1 ring-yellow-100' : 'border-slate-200'}`}
              >
                {/* Crown for top consumer */}
                {isTopConsumer && (
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-white p-2 rounded-full shadow-md rotate-12 group-hover:rotate-0 transition-transform z-10">
                        <Crown className="w-5 h-5 fill-white" />
                    </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-md ${
                        isTopConsumer 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                        : 'bg-gradient-to-br from-slate-700 to-slate-900'
                    }`}>
                        {getInitials(user.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-slate-900 truncate">{user.name}</h3>
                        <div className="flex items-center gap-2 mt-1.5">
                             {/* RFID Chip Style */}
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-mono text-slate-500">
                                <QrCode className="w-3 h-3" />
                                <span className="tracking-widest">{user.rfid}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                    <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Lid sinds
                        </p>
                        <p className="text-sm font-bold text-slate-700">
                            {user.memberSince.split('-')[0]}
                        </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                            <Beer className="w-3 h-3" />
                            Verbruik
                        </p>
                        <p className="text-sm font-bold text-slate-700">
                            {user.totalConsumption} <span className="text-xs font-normal text-slate-400">stuks</span>
                        </p>
                    </div>
                </div>
              </div>
            );
        })}
        
        {/* Add new user card button */}
        <button 
            onClick={onAddUserClick}
            className="group border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/50 transition-all min-h-[240px]"
        >
            <div className="w-16 h-16 rounded-full bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <UserPlus className="w-8 h-8" />
            </div>
            <span className="font-semibold">Nieuwe Gebruiker</span>
        </button>
      </div>
    </div>
  );
};

export default UserManagement;