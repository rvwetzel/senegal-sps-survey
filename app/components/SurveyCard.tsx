'use client';

import { useState } from 'react';

interface SurveyCardProps {
  question: string;
  options: string[];
  onAnswer: (value: string, notes?: string) => void;
  helperText?: string;
  domain: string;
  domainColor: string;
  isLastQuestion: boolean;
}

export default function SurveyCard({
  question,
  options,
  onAnswer,
  helperText,
  domain,
  domainColor,
  isLastQuestion,
}: SurveyCardProps) {
  const [freeText, setFreeText] = useState('');
  const [notes, setNotes] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(opt: string) {
    if (isLastQuestion) return;
    setSelected(opt);
  }

  function handleContinue() {
    if (!selected) return;
    onAnswer(selected, notes.trim() || undefined);
    setSelected(null);
    setNotes('');
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Domain badge */}
      <div className="px-6 pt-5 pb-0">
        <span
          className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: domainColor }}
        >
          {domain}
        </span>
      </div>

      <div className="p-6 pt-4">
        <h2 className="text-lg font-semibold text-[#0D1B2A] mb-2 leading-relaxed">
          {question}
        </h2>

        {helperText && (
          <p className="text-sm text-[#78909C] mb-5 leading-relaxed border-l-2 border-gray-200 pl-3">
            {helperText}
          </p>
        )}

        {isLastQuestion ? (
          <div className="space-y-3">
            <textarea
              className="w-full border border-gray-200 rounded-lg p-4 text-sm text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent resize-none"
              rows={4}
              placeholder="Please share your perspective..."
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
            />
            <button
              onClick={() => onAnswer(freeText || 'No response provided')}
              className="bg-[#2E7D32] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1B5E20] transition-colors shadow-sm"
            >
              Submit Survey
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {options.map((opt) => (
              <button
                key={opt}
                className={`w-full text-left border rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  selected === opt
                    ? 'border-[#1E88E5] bg-[#E3F2FD] text-[#1E88E5]'
                    : 'border-gray-200 text-[#374F5F] hover:border-[#1E88E5] hover:bg-[#F5F7FA]'
                }`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </button>
            ))}

            {/* Optional notes text box - appears after selecting an option */}
            {selected && (
              <div className="mt-4 space-y-3">
                <textarea
                  className="w-full border border-gray-200 rounded-lg p-4 text-sm text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Additional comments (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <button
                  onClick={handleContinue}
                  className="bg-[#1E88E5] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1565C0] transition-colors shadow-sm"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
