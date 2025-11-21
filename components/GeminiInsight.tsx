import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { getBrewInsights } from '../services/geminiService';
import { Transaction, User } from '../types';

interface GeminiInsightProps {
  transactions: Transaction[];
  users: User[];
}

const GeminiInsight: React.FC<GeminiInsightProps> = ({ transactions, users }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      if (!process.env.API_KEY) return; 
      
      setLoading(true);
      const text = await getBrewInsights(transactions, users);
      setInsight(text);
      setLoading(false);
    };

    // Debounce or check if we actually need to fetch to save tokens
    // For demo, just fetch on mount
    fetchInsight();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if (!process.env.API_KEY) return null;

  return (
    <div className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 p-1 rounded-2xl shadow-md">
      <div className="bg-white rounded-xl p-4 flex items-start gap-4">
        <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 shrink-0">
            {loading ? (
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <Sparkles className="w-5 h-5" />
            )}
        </div>
        <div>
            <h4 className="text-sm font-bold text-indigo-900 mb-1">BrewBot Inzicht</h4>
            <p className="text-sm text-slate-700 italic">
                {loading ? "Aan het nadenken over jullie drinkgedrag..." : insight || "Geen inzichten beschikbaar."}
            </p>
        </div>
      </div>
    </div>
  );
};

export default GeminiInsight;