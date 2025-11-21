import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [amount, setAmount] = useState(24);

  if (!isOpen) return null;

  const presets = [6, 12, 24, 48];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative animate-in fade-in zoom-in duration-200">
        <button 
            onClick={onClose} 
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-xl font-bold text-slate-900 mb-1">Voorraad Toevoegen</h3>
        <p className="text-slate-500 text-sm mb-6">Hoeveel biertjes leg je erin?</p>
        
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Aantal
          </label>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {presets.map(val => (
                <button 
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-2 text-sm font-medium rounded-lg border transition-all ${
                        amount === val 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                    +{val}
                </button>
            ))}
           </div>

           <div className="flex rounded-lg shadow-sm border border-slate-300 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 0))}
                className="block w-full border-0 py-3 pl-4 pr-4 bg-white text-slate-900 text-lg font-medium placeholder:text-slate-400 focus:ring-0 outline-none"
                min="1"
            />
            <div className="flex select-none items-center bg-slate-100 px-4 text-slate-500 font-medium text-sm border-l border-slate-200">
                stuks
            </div>
           </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
          >
            Annuleren
          </button>
          <button
            onClick={() => onConfirm(amount)}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
          >
            Toevoegen
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;