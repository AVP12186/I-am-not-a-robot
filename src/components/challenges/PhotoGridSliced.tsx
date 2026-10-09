import React from 'react';
import { Check } from 'lucide-react';
import { sound } from '../../utils/sound';

interface PhotoGridSlicedProps {
  imageSrc: string;
  selectedIndices: Set<number>;
  onToggleIndex: (index: number) => void;
}

export const PhotoGridSliced: React.FC<PhotoGridSlicedProps> = ({
  imageSrc,
  selectedIndices,
  onToggleIndex,
}) => {
  return (
    <div className="grid grid-cols-3 gap-[2px] bg-white p-[2px] w-full max-w-[340px] aspect-square mx-auto select-none">
      {Array.from({ length: 9 }).map((_, idx) => {
        const isSelected = selectedIndices.has(idx);
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const posX = col * 50;
        const posY = row * 50;

        return (
          <button
            key={idx}
            type="button"
            onClick={() => {
              sound.playSelect();
              onToggleIndex(idx);
            }}
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundPosition: `${posX}% ${posY}%`,
              backgroundSize: '300% 300%',
              backgroundRepeat: 'no-repeat',
            }}
            className={`relative aspect-square w-full cursor-pointer transition-all duration-150 overflow-hidden outline-none ${
              isSelected
                ? 'scale-[0.93] ring-4 ring-[#1a73e8] z-10 rounded-[2px]'
                : 'hover:brightness-95'
            }`}
          >
            {isSelected && (
              <div className="absolute top-1 right-1 w-5 h-5 bg-[#1a73e8] text-white rounded-full flex items-center justify-center shadow-md animate-in zoom-in-75 duration-100">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
