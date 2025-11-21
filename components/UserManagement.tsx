import React from 'react';
import { User } from '../types';
import { UserPlus, QrCode } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gebruikersbeheer</h2>
          <p className="text-slate-500 mt-1">Beheer wie toegang heeft tot de BrewBuddy.</p>
        </div>
        <button 
          onClick={onAddUserClick}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm active:scale-95"
        >
          <UserPlus className="w-5 h-5" />
          Nieuwe Gebruiker
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">Totaal Gebruikers</h3>
            <p className="text-4xl font-bold text-slate-900">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">Grootste Verbruiker</h3>
            <p className="text-4xl font-bold text-blue-600">{topConsumer?.name || '-'}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">Totaal Gezopen</h3>
            <p className="text-4xl font-bold text-orange-500">{totalConsumed}</p>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {getInitials(user.name)}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
                    <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-2 py-1 rounded text-xs font-medium mt-1 w-fit">
                        <QrCode className="w-3 h-3" />
                        <span className="uppercase tracking-wider">{user.rfid}</span>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                <div>
                    <p className="text-xs text-slate-500 mb-1">Totaal Gepakt</p>
                    <p className="text-xl font-bold text-slate-900">{user.totalConsumption}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Lid Sinds</p>
                    <p className="text-sm font-medium text-slate-900">{user.memberSince}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;