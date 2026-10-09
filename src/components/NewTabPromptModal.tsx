import React from 'react';
import { ExternalLink, X, Monitor, CheckCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface NewTabPromptModalProps {
  onOpenNewTab: () => void;
  onDismiss: () => void;
}

export const NewTabPromptModal: React.FC<NewTabPromptModalProps> = ({
  onOpenNewTab,
  onDismiss,
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : '#';

  const handleOpen = () => {
    sound.playClick();
    onOpenNewTab();
  };

  const handleStay = () => {
    sound.playClick();
    onDismiss();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-2xl max-w-[360px] w-full p-5 text-gray-800 relative border border-gray-200">
        <button
          onClick={handleStay}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1 rounded transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 text-[#1a73e8] mb-3">
          <div className="p-2 bg-blue-50 rounded-full border border-blue-200">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 leading-tight">
              Open in a New Tab?
            </h3>
            <span className="text-[11px] text-gray-500 font-medium">
              Optimal Display Recommendation
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-4">
          For full-screen challenges like <strong>Waymo Parallel Parking</strong>, <strong>Drawing Circles</strong>, and <strong>Cursor Mazes</strong>, playing in a dedicated browser tab provides the best experience.
        </p>

        <div className="flex flex-col gap-2">
          {/* Direct link button to ensure popup blockers don't intercept */}
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpen}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open in New Tab</span>
          </a>

          <button
            type="button"
            onClick={handleStay}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-semibold border border-gray-300 transition-colors"
          >
            Stay in this Window
          </button>
        </div>
      </div>
    </div>
  );
};
