import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Transaction } from '../types';

interface ActivityFeedProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ transactions, onViewAll }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full justify-between">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Recente Transacties</h3>
      
      <div className="flex-1 overflow-hidden">
        <ul className="space-y-6 text-slate-600 mt-2">
          {transactions.slice(0, 5).map((t) => (
            <li key={t.id} className="flex items-start gap-3 text-lg">
              <span className="text-slate-400 mt-2">•</span>
              <span>
                <span className="text-slate-800">{t.userName}</span>
                {' '}heeft{' '}
                {t.type === 'CONSUMPTION' 
                  ? `${t.amount} ${t.item} gepakt` 
                  : `voorraad aangevuld (+${t.amount})`
                }
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4">
        <button 
          onClick={onViewAll}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium transition-all flex items-center justify-center gap-2 shadow-sm shadow-blue-200"
        >
          Bekijk alle transacties
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;