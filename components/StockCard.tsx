import React from 'react';
import { StockItem } from '../types';

interface StockCardProps {
  stock: StockItem;
  onAddStock: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onAddStock }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center">
        <div className="mb-4">
            <svg 
                className="w-24 h-24 text-slate-900" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                {/* Base of the bottle */}
                <path d="M7 22h10" />
                <path d="M7 22v-8.5c0-1 .6-2 1.5-2.6L10 9.5V5h4v4.5l1.5 1.4c.9.6 1.5 1.6 1.5 2.6V22" />
                
                {/* Neck details */}
                <path d="M10 5h4" />
                
                {/* Cap */}
                <path d="M9 2h6" />
                <path d="M9 2v3" />
                <path d="M15 2v3" />
                
                {/* Oval Label */}
                <ellipse cx="12" cy="16" rx="2.5" ry="3.5" />
            </svg>
        </div>
        
        <div className="text-6xl font-bold mb-2 text-slate-900">
          {stock.quantity}
        </div>
        
        <h3 className="text-xl text-slate-600 font-normal mb-8">
          Biertjes resterend
        </h3>
        
        <button 
          onClick={onAddStock}
          className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-md font-medium transition-all active:scale-95"
        >
          Bier Toevoegen
        </button>
      </div>
    </div>
  );
};

export default StockCard;