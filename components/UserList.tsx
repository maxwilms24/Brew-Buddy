import React from 'react';
import { ArrowRight, Beer } from 'lucide-react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onManage: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, onManage }) => {
  // Sorteer gebruikers op consumptie (hoog naar laag) voor een leaderboard effect
  const sortedUsers = [...users].sort((a, b) => b.totalConsumption - a.totalConsumption);

  const getInitials = (name: string) => name.slice(0, 2).toUpperCase();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Actieve Gebruikers</h3>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">
          Toplijst
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
        {sortedUsers.length === 0 ? (
           <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm italic">
             Nog geen gebruikers toegevoegd.
           </div>
        ) : (
            sortedUsers.map((user, index) => (
            <div 
                key={user.id} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group"
            >
                {/* Avatar / Initials met rank kleuren */}
                <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm shrink-0
                    ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-orange-400' : 'bg-blue-500'}
                `}>
                    {getInitials(user.name)}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">
                        {index === 0 ? '👑 Kampioen' : `Lid sinds ${user.memberSince.split('-')[0]}`}
                    </p>
                </div>

                <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1.5 rounded-lg text-blue-700 shrink-0">
                    <Beer className="w-3.5 h-3.5" />
                    <span className="text-sm font-bold">{user.totalConsumption}</span>
                </div>
            </div>
            ))
        )}
      </div>

      <div className="mt-4 pt-2 border-t border-slate-50">
        <button 
          onClick={onManage}
          className="w-full group bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
        >
          Beheer gebruikers
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default UserList;