import React from 'react';
import { X, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';

interface InfoModalProps {
  hint?: string;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ hint, onClose }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '#';

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-[4px] shadow-2xl max-w-[360px] w-full p-5 text-gray-800 relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1 rounded transition-colors"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-[#1a73e8] mb-3">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <h4 className="font-bold text-sm tracking-tight">reCAPTCHA Guidance</h4>
        </div>

        {/* OPEN IN NEW TAB BUTTON */}
        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-[3px] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm mb-4 group"
        >
          <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Open Game in New Tab
        </a>

        <p className="text-xs text-gray-600 leading-relaxed mb-4">
          This system verifies that a biological entity is interacting with the computer.
          Machines and neural networks often stumble on common-sense visual reasoning,
          botanical taxonomy, fine analog motor control, and existential self-awareness.
        </p>

        {hint && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-900 font-medium mb-4">
            <div className="flex items-center gap-1.5 font-bold mb-1 text-[#1a73e8]">
              <HelpCircle className="w-3.5 h-3.5" />
              Challenge Guidance
            </div>
            <div className="leading-normal">{hint}</div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors"
        >
          Understood
        </button>
      </div>
    </div>
  );
};
