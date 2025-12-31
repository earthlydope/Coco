import React, { useState } from 'react';
import { IconChat } from './ui/Icons';

export const AICoach: React.FC = () => {
  const [selectedObjection, setSelectedObjection] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const scripts: Record<string, string> = {
    price: "I understand budget is a priority. Many patients find that when we break it down to the monthly investment of $200, it becomes much more manageable—less than a daily coffee. Plus, locking in this rate today avoids future fee increases.",
    spouse: "That makes perfect sense; it's a big decision. I can print out a specific 'Partner Summary' for you that highlights the clinical necessity and the financial options we discussed. Would 5 PM be a good time for a quick 3-way call to answer their questions?",
    timing: "Life is definitely busy. However, clinical evidence suggests that waiting often complicates the treatment, potentially increasing the duration later. If we scan today, we can at least lock in your treatment plan validity for 30 days.",
    competitor: "I appreciate you doing your research. Dr. Ramzi specializes in complex aligner cases that others might treat with braces. Our fee is all-inclusive—retainers and refinements included—which often come as hidden costs elsewhere."
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-brand-600 text-white p-4 rounded-full shadow-lg hover:bg-brand-700 transition-all z-50 flex items-center gap-2"
      >
        <IconChat className="w-6 h-6" />
        <span className="font-medium">AI Coach</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 flex flex-col max-h-[600px] overflow-hidden">
      {/* Header */}
      <div className="bg-brand-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="font-semibold">Coco Assistant</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-brand-100 hover:text-white">✕</button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-y-auto bg-slate-50">
        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-2">I'm listening. What objection is the patient raising?</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(scripts).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedObjection(key)}
                className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                  selectedObjection === key 
                    ? 'bg-brand-50 border-brand-200 text-brand-700 font-medium' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {selectedObjection && (
          <div className="animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
              <p className="text-xs font-bold text-brand-600 mb-1 uppercase tracking-wide">Suggested Response</p>
              <p className="text-sm text-slate-800 leading-relaxed">
                "{scripts[selectedObjection]}"
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              💡 Customize this to your natural voice.
            </p>
          </div>
        )}
      </div>

      {/* Input area mockup */}
      <div className="p-3 border-t border-slate-100 bg-white">
        <input 
          type="text" 
          placeholder="Type specific objection..." 
          className="w-full text-sm border-slate-200 rounded-lg focus:ring-brand-500 focus:border-brand-500"
        />
      </div>
    </div>
  );
};