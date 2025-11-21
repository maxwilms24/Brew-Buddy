import React, { useState } from 'react';
import { X, User, QrCode } from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, rfid: string) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [rfid, setRfid] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (name.trim() && rfid.trim()) {
      onConfirm(name, rfid);
      setName('');
      setRfid('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative animate-in fade-in zoom-in duration-200">
        <button 
            onClick={onClose} 
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-xl font-bold text-slate-900 mb-1">Nieuwe Gebruiker</h3>
        <p className="text-slate-500 text-sm mb-6">Voeg een nieuwe bewoner toe aan BrewBuddy.</p>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Naam
            </label>
            <div className="flex rounded-lg shadow-sm border border-slate-300 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              <div className="flex items-center justify-center pl-3 text-slate-400">
                 <User className="w-5 h-5" />
              </div>
              <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bijv. Jan Willem"
                  className="block w-full border-0 py-2.5 pl-3 pr-4 bg-white text-slate-900 font-medium placeholder:text-slate-400 focus:ring-0 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              RFID Code
            </label>
            <div className="flex rounded-lg shadow-sm border border-slate-300 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              <div className="flex items-center justify-center pl-3 text-slate-400">
                 <QrCode className="w-5 h-5" />
              </div>
              <input
                  type="text"
                  value={rfid}
                  onChange={(e) => setRfid(e.target.value.toUpperCase())}
                  placeholder="Bijv. A1-B2-C3-D4"
                  className="block w-full border-0 py-2.5 pl-3 pr-4 bg-white text-slate-900 font-medium placeholder:text-slate-400 focus:ring-0 outline-none uppercase"
              />
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
            onClick={handleSubmit}
            disabled={!name || !rfid}
            className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Toevoegen
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;