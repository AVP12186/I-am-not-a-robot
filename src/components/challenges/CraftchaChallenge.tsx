import React, { useState } from 'react';
import { sound } from '../../utils/sound';
import { Trash2 } from 'lucide-react';

interface CraftchaChallengeProps {
  craftGrid: (string | null)[];
  onSlotClick: (index: number, selectedTool: string | null) => void;
}

export const CraftchaChallenge: React.FC<CraftchaChallengeProps> = ({
  craftGrid,
  onSlotClick,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>('💎');

  const inventory = [
    { icon: '💎', name: 'Diamond' },
    { icon: '🥢', name: 'Stick' },
    { icon: '🪵', name: 'Oak Plank' },
    { icon: '🪨', name: 'Cobblestone' },
    { icon: '🪙', name: 'Iron Ingot' },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-2">
      {/* 3x3 Minecraft Crafting Grid */}
      <div className="bg-[#c6c6c6] p-3 rounded-[3px] border-4 border-[#373737] shadow-md mb-3">
        <div className="grid grid-cols-3 gap-1.5">
          {craftGrid.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                sound.playClick();
                onSlotClick(idx, selectedItem);
              }}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center text-3xl select-none hover:brightness-105 active:brightness-95 transition-all outline-none"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Bar */}
      <div className="flex items-center gap-1.5 bg-[#dcdcdc] p-1.5 rounded border border-gray-400">
        {inventory.map((inv) => (
          <button
            key={inv.name}
            type="button"
            onClick={() => {
              sound.playClick();
              setSelectedItem(selectedItem === inv.icon ? null : inv.icon);
            }}
            className={`w-10 h-10 sm:w-11 sm:h-11 bg-white border-2 rounded flex items-center justify-center text-2xl transition-all ${
              selectedItem === inv.icon
                ? 'border-[#1a73e8] ring-2 ring-[#1a73e8]/40 scale-105 shadow-sm'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            title={inv.name}
          >
            {inv.icon}
          </button>
        ))}

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            for (let i = 0; i < 9; i++) {
              onSlotClick(i, null);
            }
          }}
          className="p-2 h-10 sm:h-11 text-xs font-semibold rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 flex items-center gap-1"
          title="Clear Crafting Table"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-xs text-gray-500 font-medium text-center mt-2.5">
        Select a material below and place in the correct 3x3 crafting pattern
      </div>
    </div>
  );
};
