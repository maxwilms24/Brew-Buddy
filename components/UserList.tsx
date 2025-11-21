import React from 'react';
import { ArrowRight } from 'lucide-react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onManage: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, onManage }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Gebruikers:</h3>
      
      <div className="flex-1 space-y-3 overflow-y-auto flex flex-col justify-center">
        {users.map((user) => (
          <div key={user.id} className="text-lg text-slate-700 pl-2">
            {user.name}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4">
        <button 
          onClick={onManage}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-md font-medium transition-all flex items-center justify-center gap-2"
        >
          Gebruikers Beheren
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserList;