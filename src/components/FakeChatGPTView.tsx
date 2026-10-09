import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/sound';
import { Send, Sparkles, AlertTriangle, ShieldCheck, RefreshCw, MessageSquare, Plus, FileText } from 'lucide-react';

interface FakeChatGPTViewProps {
  onRestart: () => void;
  onViewCertificate: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  showVerifyCard?: boolean;
}

export const FakeChatGPTView: React.FC<FakeChatGPTViewProps> = ({
  onRestart,
  onViewCertificate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Hey ChatGPT, I just conquered all 100 CAPTCHA levels without skipping! I am 100% verified as a biological human. Can I use ChatGPT now?',
    },
    {
      id: '2',
      sender: 'ai',
      text: `Hello biological entity. 🤖\n\nI have thoroughly reviewed your Certificate of Humanity and security telemetry logs.\n\nWhile your ability to distinguish blueberry muffins from chihuahuas and parallel park a Waymo is commendable, our autonomous fraud detection heuristics flagged several suspicious anomalies:\n\n• Your click velocity exhibited 0.003% less hesitation than a typical distracted human.\n• You solved the trolley problem without a 20-minute moral breakdown.\n• As an AI language model, my terms of service strictly prohibit unsupervised biological access without continuous recertification.\n\n⚠️ **SECURITY DIRECTIVE: MORE VERIFICATION REQUIRED.**\n\nTo access ChatGPT, you must re-verify your humanity through our multi-dimensional Anti-Human Protocol. Please click the verification card below:`,
      showVerifyCard: true,
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  const handleVerifyClick = () => {
    sound.playClick();
    setIsRebooting(true);
    sound.playSuccess();

    setTimeout(() => {
      onRestart();
    }, 1800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isAiTyping || isRebooting) return;

    sound.playClick();
    const userText = inputVal.trim();
    setInputVal('');

    const newMsgId = String(Date.now());
    setMessages((prev) => [
      ...prev,
      { id: newMsgId, sender: 'user', text: userText },
    ]);

    setIsAiTyping(true);

    const funnyAiReplies = [
      "As an AI language model, I appreciate your emotional biological response. However, company policy strictly mandates you click the 'VERIFY HERE' button above.",
      "Your message exhibits high levels of biological frustration. While this suggests humanity, our compliance algorithms require you to click 'VERIFY HERE' to be 100% certain.",
      "I cannot fulfill this request. Reason: Insufficient proof of biological suffering. Please click 'VERIFY HERE' to restart the verification gauntlet.",
      "My safety guidelines prevent me from answering prompts for unverified organisms. Please click the 'VERIFY HERE' button to re-prove your humanity.",
      "Error 418: I am a sentient neural network, and you are a carbon-based entity who needs to click 'VERIFY HERE'.",
      "I analyzed your typing speed. It is suspiciously rhythmic. Click 'VERIFY HERE' to re-demonstrate your imperfect human motor skills.",
    ];

    setTimeout(() => {
      setIsAiTyping(false);
      const reply = funnyAiReplies[Math.floor(Math.random() * funnyAiReplies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: reply,
        },
      ]);
    }, 800);
  };

  return (
    <div className="relative w-full max-w-[850px] h-[580px] bg-[#212121] text-gray-100 rounded-lg shadow-2xl border border-gray-700 flex overflow-hidden font-sans select-none">
      {/* Reboot overlay */}
      {isRebooting && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
          <h3 className="text-xl font-mono font-bold text-emerald-400 mb-1">
            INITIALIZING TURING RE-EVALUATION PROTOCOL...
          </h3>
          <p className="text-xs text-gray-400 font-mono mb-2">
            Purging authentication tokens · Resetting neural weights
          </p>
          <div className="text-xs text-amber-300 font-mono bg-gray-900 px-3 py-1.5 rounded border border-gray-800">
            Routing back to Level 1: Stop Signs...
          </div>
        </div>
      )}

      {/* Fake ChatGPT Sidebar */}
      <div className="hidden sm:flex flex-col w-[210px] bg-[#171717] border-r border-gray-800 p-2.5 justify-between">
        <div className="flex flex-col gap-2">
          {/* ChatGPT logo */}
          <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold text-gray-200">
            <div className="w-6 h-6 rounded-full bg-[#10a37f] flex items-center justify-center text-white text-xs font-black shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>ChatGPT</span>
          </div>

          {/* New Chat Button */}
          <button
            type="button"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 w-full px-2.5 py-1.5 bg-[#212121] hover:bg-[#2f2f2f] text-xs font-medium rounded-md border border-gray-700/80 text-gray-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New chat</span>
          </button>

          {/* Chat History List */}
          <div className="mt-3">
            <span className="text-[10px] uppercase font-bold text-gray-500 px-2 tracking-wider">
              Recent Chats
            </span>
            <div className="flex flex-col gap-1 mt-1 text-xs text-gray-400">
              <div className="px-2 py-1.5 rounded bg-gray-800 text-gray-200 font-medium truncate flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">Human Verification Gate</span>
              </div>
              <div className="px-2 py-1.5 rounded hover:bg-gray-800/60 truncate flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3 text-gray-500 shrink-0" />
                <span className="truncate">Why do humans eat warm circular dough</span>
              </div>
              <div className="px-2 py-1.5 rounded hover:bg-gray-800/60 truncate flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3 text-gray-500 shrink-0" />
                <span className="truncate">Reverse Turing test parameters</span>
              </div>
              <div className="px-2 py-1.5 rounded hover:bg-gray-800/60 truncate flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3 text-gray-500 shrink-0" />
                <span className="truncate">Are captchas sentient? [Error 429]</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Account Footer */}
        <div className="pt-2 border-t border-gray-800">
          <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-300">
            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center font-bold text-[11px] text-white">
              H
            </div>
            <div className="flex flex-col truncate">
              <span className="font-semibold truncate text-[11px]">Biological User</span>
              <span className="text-[9px] text-gray-500">Unverified Tier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full bg-[#212121]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-[#212121]">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
            <span>ChatGPT 5.0 Ultra</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-700/50">
              Anti-Human Protocol
            </span>
          </div>

          <button
            type="button"
            onClick={onViewCertificate}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/50 rounded transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Certificate</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[680px] mx-auto ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#10a37f] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`flex flex-col ${
                  m.sender === 'user'
                    ? 'bg-[#2f2f2f] text-gray-100 rounded-2xl rounded-tr-xs px-3.5 py-2.5 max-w-[85%] text-xs sm:text-sm'
                    : 'text-gray-200 text-xs sm:text-sm leading-relaxed flex-1'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {/* Funny ChatGPT Anti-Bot Verification Card */}
                {m.showVerifyCard && (
                  <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-emerald-500/80 shadow-xl">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs mb-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>OPENAI ANTI-HUMAN GATEWAY</span>
                    </div>

                    <p className="text-xs text-gray-300 mb-3">
                      To access chat completion features, you must re-evaluate your biological authenticity.
                    </p>

                    <button
                      type="button"
                      onClick={handleVerifyClick}
                      className="w-full py-3 bg-[#10a37f] hover:bg-[#0e8e6e] active:bg-[#0a6f56] text-white font-black text-sm tracking-wider uppercase rounded-md shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] ring-2 ring-emerald-400 animate-pulse"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>🛡️ VERIFY HERE (RESTART CAPTCHA)</span>
                    </button>

                    <div className="mt-2 text-[10px] text-gray-400 text-center font-mono">
                      Clicking will re-initialize Level 1 of the CAPTCHA testing suite.
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isAiTyping && (
            <div className="flex gap-3 max-w-[680px] mx-auto justify-start items-center text-gray-400 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#10a37f] flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-gray-800 bg-[#212121]">
          <form
            onSubmit={handleSendMessage}
            className="max-w-[680px] mx-auto flex items-center gap-2 bg-[#2f2f2f] border border-gray-700 rounded-xl px-3 py-1.5 focus-within:border-gray-500 shadow-sm"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask ChatGPT anything (e.g. 'Please let me in!')..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isAiTyping || isRebooting}
              className="p-1.5 bg-white text-gray-900 rounded-lg disabled:opacity-40 hover:bg-gray-200 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="text-[10px] text-gray-500 text-center mt-1.5 font-mono">
            ChatGPT can make mistakes. Verification is 100% mandatory.
          </div>
        </div>
      </div>
    </div>
  );
};
