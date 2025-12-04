import React from 'react';
import { StockItem } from '../types';

interface StockCardProps {
  stock: StockItem;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  // 1. Bereken percentage (begrens tussen 0 en 100)
  const max = stock.maxCapacity || 24; // Fallback als maxCapacity mist
  const percentage = Math.min(100, Math.max(0, (stock.quantity / max) * 100));
  
  // 2. Bepaal kleur en status
  const isLowStock = percentage < 20;
  const liquidColor = isLowStock ? '#ef4444' : '#f59e0b'; // Red-500 vs Amber-500
  
  // Bereken de hoogte van de vloeistof in de SVG coördinaten
  // De fles bodem is op Y=22, de nek begint ongeveer bij Y=6.
  // Totale vulbare hoogte is dus 16 units.
  const liquidHeight = (percentage / 100) * 16;
  const liquidY = 22 - liquidHeight;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center">
        <div className="mb-6 relative">
            <svg 
                className="w-32 h-32 drop-shadow-sm" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <defs>
                    {/* Clip path definieert de binnenvorm van de fles zodat vloeistof er niet 'uit lekt' */}
                    <clipPath id="bottleClip">
                        <path d="M7 22 H17 V13.5 C17 12.5 16.4 11.5 15.5 10.9 L14 9.5 V5 H10 V9.5 L8.5 10.9 C7.6 11.5 7 12.5 7 13.5 V22 Z" />
                    </clipPath>
                </defs>

                {/* Achtergrond van de fles (leeg glas) */}
                <path 
                    d="M7 22 H17 V13.5 C17 12.5 16.4 11.5 15.5 10.9 L14 9.5 V5 H10 V9.5 L8.5 10.9 C7.6 11.5 7 12.5 7 13.5 V22 Z" 
                    fill="#f1f5f9" 
                    stroke="none"
                />

                {/* De Vloeistof (Dynamisch) */}
                <rect 
                    x="0" 
                    y={liquidY} 
                    width="24" 
                    height={liquidHeight} 
                    fill={liquidColor} 
                    clipPath="url(#bottleClip)"
                    className="transition-all duration-700 ease-in-out"
                    stroke="none"
                />
                
                {/* Schuimlaagje (optioneel, alleen als er bier in zit) */}
                {percentage > 0 && (
                    <line 
                        x1="7" 
                        y1={liquidY} 
                        x2="17" 
                        y2={liquidY} 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeOpacity="0.8"
                        clipPath="url(#bottleClip)"
                        className="transition-all duration-700 ease-in-out"
                    />
                )}

                {/* Fles Outline (Tekening er bovenop) */}
                {/* Base & Body */}
                <path d="M7 22h10" className="text-slate-900" />
                <path d="M7 22v-8.5c0-1 .6-2 1.5-2.6L10 9.5V5h4v4.5l1.5 1.4c.9.6 1.5 1.6 1.5 2.6V22" className="text-slate-900" />
                
                {/* Neck detail */}
                <path d="M10 5h4" className="text-slate-900" />
                
                {/* Cap */}
                <path d="M9 2h6" className="text-slate-900" />
                <path d="M9 2v3" className="text-slate-900" />
                <path d="M15 2v3" className="text-slate-900" />
                
                {/* Label (Wit gevuld zodat je de vloeistof er niet doorheen ziet) */}
                <ellipse cx="12" cy="16" rx="2.5" ry="3.5" fill="white" className="text-slate-900" />
            </svg>

            {/* Waarschuwingsicoontje bij lage voorraad */}
            {isLowStock && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-pulse border-2 border-white">
                    !
                </div>
            )}
        </div>
        
        <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-6xl font-bold transition-colors duration-500 ${isLowStock ? 'text-red-500' : 'text-slate-900'}`}>
                {stock.quantity}
            </span>
            <span className="text-xl text-slate-400 font-medium">
                / {max}
            </span>
        </div>
        
        <h3 className="text-xl text-slate-600 font-normal">
          Biertjes resterend
        </h3>
        
        {isLowStock && (
            <p className="mt-2 text-sm text-red-500 font-medium animate-pulse">
                Bijna op! Tijd om in te slaan.
            </p>
        )}
      </div>
    </div>
  );
};

export default StockCard;