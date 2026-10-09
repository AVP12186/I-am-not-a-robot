import React from 'react';
import { Check } from 'lucide-react';
import { GridItem } from '../../types/game';
import { sound } from '../../utils/sound';

interface PhotoGridItemsProps {
  items: GridItem[];
  selectedIndices: Set<number>;
  onToggleIndex: (index: number) => void;
}

export const PhotoGridItems: React.FC<PhotoGridItemsProps> = ({
  items,
  selectedIndices,
  onToggleIndex,
}) => {
  return (
    <div className="grid grid-cols-3 gap-1 bg-white p-1 w-full max-w-[340px] aspect-square mx-auto select-none rounded-[3px] border border-gray-300 shadow-sm">
      {items.map((item, idx) => {
        const isSelected = selectedIndices.has(idx);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              sound.playSelect();
              onToggleIndex(idx);
            }}
            className={`relative aspect-square w-full rounded-[2px] bg-gray-100 cursor-pointer transition-all duration-150 outline-none overflow-hidden ${
              isSelected
                ? 'scale-[0.93] ring-4 ring-[#1a73e8] z-10 shadow-md'
                : 'hover:brightness-95'
            }`}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                {item.icon}
              </div>
            )}

            {isSelected && (
              <div className="absolute top-1 right-1 w-5 h-5 bg-[#1a73e8] text-white rounded-full flex items-center justify-center shadow-md animate-in zoom-in-75 duration-100 z-20">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
