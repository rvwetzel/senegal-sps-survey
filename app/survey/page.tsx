'use client';

import { useState } from 'react';
import Link from 'next/link';
import SurveyCard from '../components/SurveyCard';
import ProgressHeader from '../components/ProgressHeader';
import { senegalDecisionTree, domainColors } from '../data/senegalDecisionTree';

export default function SurveyPage() {
  const [nodeId, setNodeId] = useState('Q1');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const node = senegalDecisionTree[nodeId];

  function handleAnswer(value: string) {
    const next = node.next(value, answers);
    const newAnswers = { ...answers, [nodeId]: value };
    setAnswers(newAnswers);
    setHistory([...history, nodeId]);

    if (next && senegalDecisionTree[next]) {
      setNodeId(next);
    } else {
      setCompleted(true);
    }
  }

  function handleBack() {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(history.slice(0, -1));
      const newAnswers = { ...answers };
      delete newAnswers[nodeId];
      setAnswers(newAnswers);
      setNodeId(prev);
      setCompleted(false);
    }
  }

  if (completed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-[#0D1B2A] mb-3">
            Thank You for Your Responses
          </h2>
          <p className="text-[#546E7A] mb-6 max-w-md mx-auto">
            Your input will help identify practical opportunities for SPS
            cooperation between Senegal and the United States. NASDA will
            follow up with a summary of findings.
          </p>

          {/* Response summary */}
          <div className="bg-[#F5F7FA] rounded-lg p-6 text-left mb-6">
            <h3 className="text-sm font-semibold text-[#78909C] uppercase tracking-wide mb-3">
              Your Responses
            </h3>
            <div className="space-y-3">
              {Object.entries(answers).map(([qId, answer]) => {
                const q = senegalDecisionTree[qId];
                return (
                  <div key={qId} className="border-b border-gray-200 pb-2 last:border-0">
                    <p className="text-xs text-[#78909C] font-medium">{qId} &middot; {q.domain}</p>
                    <p className="text-sm text-[#0D1B2A] font-medium">{q.question.substring(0, 80)}...</p>
                    <p className="text-sm text-[#1E88E5]">{answer}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1E88E5] font-medium hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const isLastQuestion = node.next('', answers) === null && nodeId === 'Q10';
  const questionNumber = history.length + 1;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back navigation */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="text-sm text-[#78909C] hover:text-[#0D1B2A] transition-colors"
        >
          ← Back to Home
        </Link>
        {history.length > 0 && (
          <button
            onClick={handleBack}
            className="text-sm text-[#1E88E5] hover:underline"
          >
            ← Previous Question
          </button>
        )}
      </div>

      <ProgressHeader
        currentQuestion={questionNumber}
        totalEstimate="6-10 questions"
        time="4 minutes"
        questionsAnswered={Object.keys(answers).length}
      />

      <SurveyCard
        question={node.question}
        options={node.options}
        onAnswer={handleAnswer}
        helperText={node.helperText}
        domain={node.domain}
        domainColor={domainColors[node.domain] || '#78909C'}
        isLastQuestion={isLastQuestion}
      />

      {/* NASDA footer */}
      <p className="text-center text-xs text-[#B0BEC5] mt-8">
        This survey is a cooperative, non-enforcement effort conducted by NASDA.
        <br />
        Your responses are confidential and will be used solely for SPS cooperation purposes.
      </p>
    </div>
  );
}
