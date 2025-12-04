import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'CONSUMPTION' | 'RESTOCK'>('ALL');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('nl-NL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Transactie Geschiedenis</h2>
                <p className="text-slate-500 mt-1">Een overzicht van alle mutaties in de koelkast.</p>
            </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 bg-white">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Zoek op naam..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                    />
                </div>
                <div className="relative min-w-[160px]">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as any)}
                        className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                    >
                        <option value="ALL">Alle Acties</option>
                        <option value="CONSUMPTION">Consumptie</option>
                        <option value="RESTOCK">Aanvulling</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white border-b border-slate-100">
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tijdstip</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Gebruiker</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Actie</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-left w-32">Aantal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredTransactions.map((t) => (
                            <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-5 px-6 text-slate-500 font-medium text-sm whitespace-nowrap">
                                    {formatDate(t.timestamp)}
                                </td>
                                <td className="py-5 px-6 font-bold text-slate-900">
                                    {t.userName}
                                </td>
                                <td className="py-5 px-6">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                        t.type === 'CONSUMPTION'
                                            ? 'bg-slate-100 text-slate-600'
                                            : 'bg-green-50 text-green-700'
                                    }`}>
                                        {t.type === 'CONSUMPTION' ? 'Consumptie' : 'Aanvulling'}
                                    </span>
                                </td>
                                <td className={`py-5 px-6 font-bold text-left ${
                                    t.type === 'CONSUMPTION' ? 'text-slate-900' : 'text-green-600'
                                }`}>
                                    {t.type === 'CONSUMPTION' ? '-1' : `+${t.amount}`}
                                </td>
                            </tr>
                        ))}
                        {filteredTransactions.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-slate-500">
                                    Geen transacties gevonden die voldoen aan de criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default TransactionHistory;