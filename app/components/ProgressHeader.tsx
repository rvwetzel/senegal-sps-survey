'use client';

interface ProgressHeaderProps {
  currentQuestion: number;
  totalEstimate: string;
  time: string;
  questionsAnswered: number;
}

export default function ProgressHeader({
  currentQuestion,
  totalEstimate,
  time,
  questionsAnswered,
}: ProgressHeaderProps) {
  const progress = Math.min((questionsAnswered / 10) * 100, 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-[#78909C]">
          Estimated: <strong>{totalEstimate}</strong> &middot; ~<strong>{time}</strong>
        </p>
        <p className="text-sm font-medium text-[#1E88E5]">
          Question {currentQuestion}
        </p>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1E88E5] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
