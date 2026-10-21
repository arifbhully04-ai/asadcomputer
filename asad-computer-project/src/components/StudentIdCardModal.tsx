import React, { useEffect } from 'react';
import { CourseEnrollment } from '../types';
import { X, Printer, Laptop, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';

interface StudentIdCardModalProps {
  enrollment: CourseEnrollment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentIdCardModal: React.FC<StudentIdCardModalProps> = ({
  enrollment,
  isOpen,
  onClose,
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

  if (!isOpen || !enrollment) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto cursor-pointer"
    >
      {/* Universal Floating Exit Button */}
      <button
        onClick={onClose}
        className="no-print fixed top-3 right-3 sm:top-5 sm:right-5 z-[999] px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-2xl flex items-center gap-2 border-2 border-white/60 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        title="বের হয়ে ফিরে যান (Esc)"
      >
        <X className="w-5 h-5 stroke-[2.5]" />
        <span>বের হয়ে যান (Exit / Close)</span>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-8 cursor-default flex flex-col"
      >
        
        {/* Sticky Controls Header */}
        <div className="no-print sticky top-0 z-20 px-5 py-3 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <span className="text-xs font-semibold">ডিজিটাল স্টুডেন্ট আইডি কার্ড</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              প্রিন্ট
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/30 text-xs font-semibold transition-all"
              title="বন্ধ করুন (Esc)"
            >
              <X className="w-4 h-4" />
              <span>বন্ধ করুন</span>
            </button>
          </div>
        </div>

        {/* Printable ID Card Body */}
        <div id="printable-document" className="p-6 bg-slate-50 flex justify-center">
          <div className="w-80 rounded-2xl bg-white border-2 border-slate-900 shadow-xl overflow-hidden text-center relative flex flex-col justify-between">
            
            {/* Top Card Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  <Laptop className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-xs uppercase tracking-wide">
                  আসাদ কম্পিউটার
                </h4>
              </div>
              <p className="text-[10px] text-amber-300 font-semibold">
                ভূল্লী ডিজিটাল পোস্ট অফিস, ঠাকুরগাঁও
              </p>
              <div className="mt-1 inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded-full font-semibold">
                STUDENT IDENTIFICATION CARD
              </div>
            </div>

            {/* Photo & Student Info */}
            <div className="p-4 space-y-3">
              <div className="w-24 h-24 mx-auto rounded-full border-4 border-blue-600 overflow-hidden shadow-inner bg-slate-200">
                {enrollment.photoUrl ? (
                  <img
                    src={enrollment.photoUrl}
                    alt={enrollment.studentName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    PHOTO
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-tight">
                  {enrollment.studentName}
                </h3>
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">
                  ID: {enrollment.studentIdCardNumber}
                </span>
              </div>

              {/* Course & Schedule */}
              <div className="text-left bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
                <div>
                  <span className="text-[10px] text-slate-500 block">কোর্স:</span>
                  <span className="font-semibold text-slate-800 text-[11px] line-clamp-1">
                    {enrollment.courseTitle}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">সময়সূচী:</span>
                  <span className="font-medium text-slate-700 text-[11px]">
                    {enrollment.batchSchedule}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-[10px]">
                  <span className="text-slate-500">ভর্তি তারিখ: {enrollment.enrolledDate}</span>
                  <span className="text-emerald-700 font-bold">ফি পরিশোধিত</span>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer with Barcode */}
            <div className="bg-slate-100 p-3 border-t border-slate-200 flex flex-col items-center">
              <div className="h-6 w-36 flex items-center justify-between px-1 bg-white border border-slate-300 mb-1">
                <div className="w-1 h-5 bg-slate-900" />
                <div className="w-2 h-5 bg-slate-900" />
                <div className="w-0.5 h-5 bg-slate-900" />
                <div className="w-1.5 h-5 bg-slate-900" />
                <div className="w-2 h-5 bg-slate-900" />
                <div className="w-1 h-5 bg-slate-900" />
                <div className="w-1.5 h-5 bg-slate-900" />
              </div>
              <span className="text-[9px] text-slate-500 font-mono">
                {enrollment.enrollmentId}
              </span>
            </div>

          </div>
        </div>

        {/* Footer Exit Button */}
        <div className="no-print p-3 bg-slate-100 border-t border-slate-200 flex justify-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>বন্ধ করে ফিরে যান (Close)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
