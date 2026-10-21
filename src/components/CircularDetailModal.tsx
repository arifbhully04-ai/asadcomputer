import React, { useEffect } from 'react';
import { JobCircular } from '../types';
import {
  X,
  Building,
  Calendar,
  Users,
  GraduationCap,
  Clock,
  FileText,
  Download,
  ArrowRight,
  ShieldCheck,
  Coins,
  ArrowLeft
} from 'lucide-react';

interface CircularDetailModalProps {
  circular: JobCircular | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (circular: JobCircular) => void;
}

export const CircularDetailModal: React.FC<CircularDetailModalProps> = ({
  circular,
  isOpen,
  onClose,
  onApply,
}) => {
  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !circular) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 cursor-default flex flex-col max-h-[90vh]"
      >
        
        {/* Sticky Top Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm sm:text-base">
              অফিশিয়াল নিয়োগ বিজ্ঞপ্তি বিবরণ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/30 text-xs font-semibold transition-all"
            title="বন্ধ করুন (Esc)"
          >
            <X className="w-4 h-4" />
            <span>বন্ধ করুন</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm">
          <div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
              {circular.category} সার্কুলার
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2 leading-snug">
              {circular.titleBn}
            </h2>
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-1.5 mt-1">
              <Building className="w-4 h-4 text-slate-400" />
              <span>{circular.organizationBn}</span>
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">মোট পদসংখ্যা</span>
              <strong className="text-slate-900 text-sm">{circular.vacancies} টি</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">আবেদনের শেষ তারিখ</span>
              <strong className="text-slate-900 text-sm">{circular.deadline}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">সরকারি চালান ফি</span>
              <strong className="text-slate-900 text-sm">৳{circular.govFee}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">বয়সসীমা</span>
              <strong className="text-slate-900 text-xs">{circular.ageLimit}</strong>
            </div>
          </div>

          {/* Requirements & Description */}
          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                শিক্ষাগত যোগ্যতা ও অভিজ্ঞতা:
              </h4>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {circular.educationReq}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                বিজ্ঞপ্তির বিস্তারিত বিবরণ:
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {circular.details}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-blue-900 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>ডিজিটাল কম্পিউটার সেন্টার সহায়তা গ্যারান্টি:</span>
              </div>
              <p className="text-slate-600">
                আবেদনের সময় কোনো ভুল হলে সরকারি বিধি মোতাবেক সংশোধন সহায়তা এবং লিখিত পরীক্ষার অ্যাডমিট কার্ড প্রকাশের সাথে সাথেই এসএমএস ও হোয়াটসঅ্যাপ নোটিফিকেশন প্রদান করা হবে।
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('অফিশিয়াল সার্কুলার পিডিএফ ফাইল ডাউনলোড শুরু হচ্ছে...');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>মূল সার্কুলার PDF ডাউনলোড</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                বন্ধ করে ফিরে যান
              </button>
              <button
                onClick={() => {
                  onClose();
                  onApply(circular);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow"
              >
                <span>আবেদন করতে এগিয়ে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
