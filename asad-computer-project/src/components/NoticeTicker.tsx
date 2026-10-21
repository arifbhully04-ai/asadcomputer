import React, { useState, useEffect } from 'react';
import { Notice } from '../types';
import { Bell, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

interface NoticeTickerProps {
  notices: Notice[];
  onSelectNotice?: (notice: Notice) => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({ notices, onSelectNotice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (notices.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [notices.length]);

  if (!notices.length) return null;
  const current = notices[currentIndex];

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-slate-800 text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Ticker Lead */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded font-semibold bg-amber-500 text-slate-950 text-[11px] uppercase tracking-wider">
            <Bell className="w-3 h-3" />
            জরুরি বিজ্ঞপ্তি
          </span>
        </div>

        {/* Dynamic Notice Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-slate-900 truncate">
              {current.titleBn}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-500 shrink-0">
              <Calendar className="w-3 h-3" />
              {current.date}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + notices.length) % notices.length)}
            className="p-1 rounded hover:bg-amber-500/20 text-slate-700 transition-colors"
            title="Previous notice"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] tabular-nums text-slate-500 px-1">
            {currentIndex + 1}/{notices.length}
          </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % notices.length)}
            className="p-1 rounded hover:bg-amber-500/20 text-slate-700 transition-colors"
            title="Next notice"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
