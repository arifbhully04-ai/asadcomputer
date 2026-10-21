import React, { useEffect } from 'react';
import { JobApplication } from '../types';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  Building,
  ShieldCheck,
  QrCode,
  FileText,
  ArrowLeft
} from 'lucide-react';

interface PrintableApplicationModalProps {
  application: JobApplication | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableApplicationModal: React.FC<PrintableApplicationModalProps> = ({
  application,
  isOpen,
  onClose,
}) => {
  // Listen for Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
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

  if (!isOpen || !application) return null;

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto cursor-pointer"
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
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-4 sm:my-8 text-slate-900 cursor-default flex flex-col max-h-[92vh]"
      >
        
        {/* Sticky Top Control Bar (Never scrolls out of view!) */}
        <div className="no-print sticky top-0 z-30 px-4 sm:px-6 py-3 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shadow-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold truncate">
              আবেদন কপি ও অ্যাডমিট স্লিপ প্রিভিউ
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow active:scale-95 whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/40 text-xs font-semibold transition-all whitespace-nowrap"
              title="বন্ধ করুন (Esc)"
            >
              <X className="w-4 h-4" />
              <span>বন্ধ করুন</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Area */}
        <div className="overflow-y-auto flex-1">
          <div id="printable-document" className="p-6 sm:p-10 bg-white space-y-6 text-slate-900 text-xs sm:text-sm">
            
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1 relative">
              <div className="inline-block px-3 py-0.5 rounded bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Applicant's Official Copy (আবেদনকারী কপি)
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-950 uppercase">
                {application.organization}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-blue-900">
                Post: {application.jobTitle}
              </p>
              <p className="text-[11px] text-slate-600">
                Online Application & Verification Form — Assisted by আসাদ কম্পিউটার (ভূল্লী ডিজিটাল পোস্ট অফিস, ঠাকুরগাঁও)
              </p>

              {/* Application ID Tag */}
              <div className="mt-2 inline-flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-1 rounded">
                <span className="text-[11px] text-slate-500">Application ID:</span>
                <span className="font-mono font-bold text-slate-900 text-sm tracking-widest">
                  {application.applicationId}
                </span>
              </div>
            </div>

            {/* Top Info Banner & Barcode */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs text-slate-600">
                  আবেদনের তারিখ: <strong className="text-slate-900">{application.appliedDate}</strong>
                </div>
                <div className="text-xs text-slate-600">
                  রোল / ট্র্যাকিং নম্বর: <strong className="text-slate-900 font-mono">{application.rollNumber || 'PENDING ASSIGN'}</strong>
                </div>
                <div className="text-xs text-emerald-700 font-semibold flex items-center justify-center sm:justify-start gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ফি ও সার্ভিস চার্জ পরিশোধিত (৳{application.totalAmount})</span>
                </div>
              </div>

              {/* Barcode & Seal Mockup */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-center font-mono">
                  {/* SVG Barcode simulation */}
                  <div className="h-8 w-32 flex items-center justify-between px-1 bg-white border border-slate-300">
                    <div className="w-1 h-6 bg-slate-900" />
                    <div className="w-2 h-6 bg-slate-900" />
                    <div className="w-0.5 h-6 bg-slate-900" />
                    <div className="w-1.5 h-6 bg-slate-900" />
                    <div className="w-0.5 h-6 bg-slate-900" />
                    <div className="w-2 h-6 bg-slate-900" />
                    <div className="w-1 h-6 bg-slate-900" />
                    <div className="w-0.5 h-6 bg-slate-900" />
                    <div className="w-1.5 h-6 bg-slate-900" />
                  </div>
                  <span className="text-[10px] text-slate-500 tracking-wider">
                    {application.applicationId}
                  </span>
                </div>

                {/* Official Seal Mockup */}
                <div className="w-16 h-16 rounded-full border-2 border-emerald-600 text-emerald-700 flex flex-col items-center justify-center text-[8px] font-bold uppercase rotate-[-6deg] select-none shrink-0">
                  <span>DCC VERIFIED</span>
                  <span className="text-[7px]">OFFICIAL</span>
                  <span>PAID</span>
                </div>
              </div>
            </div>

            {/* Main Applicant Details Table with Photo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              
              {/* 3 Columns Data Table */}
              <div className="md:col-span-3 border border-slate-300 rounded overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="w-1/3 p-2.5 font-semibold bg-slate-50 text-slate-700">Applicant Name (English)</td>
                      <td className="p-2.5 font-bold text-slate-900 uppercase">{application.applicantName}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">প্রার্থীর নাম (বাংলায়)</td>
                      <td className="p-2.5 font-medium text-slate-900">{application.applicantNameBn}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">Father's Name (পিতা)</td>
                      <td className="p-2.5 text-slate-900">{application.fatherName}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">Mother's Name (মাতা)</td>
                      <td className="p-2.5 text-slate-900">{application.motherName}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">Date of Birth (জন্ম তারিখ)</td>
                      <td className="p-2.5 text-slate-900">{application.dateOfBirth}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">Gender (লিঙ্গ)</td>
                      <td className="p-2.5 text-slate-900">{application.gender}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">National ID (NID)</td>
                      <td className="p-2.5 font-mono text-slate-900 font-semibold">{application.nidNumber}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">Mobile Phone</td>
                      <td className="p-2.5 font-mono text-slate-900">{application.phone}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">Home District & Upazila</td>
                      <td className="p-2.5 text-slate-900">{application.upazila}, {application.district}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">Highest Education</td>
                      <td className="p-2.5 text-slate-900 font-medium">{application.educationLevel} ({application.cgpaOrDivision}, Passing: {application.passingYear})</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold bg-slate-50 text-slate-700">Application Status</td>
                      <td className="p-2.5">
                        <span className="inline-block px-2 py-0.5 rounded font-semibold text-[11px] bg-emerald-100 text-emerald-800">
                          {application.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 1 Column Photo & Signature Box */}
              <div className="md:col-span-1 space-y-4 text-center">
                {/* Photo Box */}
                <div className="border border-slate-300 rounded p-1.5 bg-slate-50 inline-block shadow-sm">
                  <div className="w-28 h-32 bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center">
                    {application.photoUrl ? (
                      <img
                        src={application.photoUrl}
                        alt="Applicant Photo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[11px] text-slate-400">PHOTO</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Applicant Photo</span>
                </div>

                {/* Signature Box */}
                <div className="border border-slate-300 rounded p-2 bg-slate-50 inline-block w-32 shadow-sm">
                  <div className="h-10 border-b border-slate-400 flex items-center justify-center">
                    <span className="font-serif italic font-bold text-xs text-slate-800">
                      {application.applicantName.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 block">Applicant Signature</span>
                </div>
              </div>

            </div>

            {/* Remarks & Instructions */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600 space-y-1 leading-relaxed">
              <h5 className="font-bold text-slate-900 uppercase">জরুরি নির্দেশনাবলী (Important Instructions):</h5>
              <ol className="list-decimal pl-4 space-y-0.5">
                <li>এই আবেদন কপিটি প্রিন্ট করে লিখিত ও মৌখিক পরীক্ষার জন্য সতর্কতার সাথে সংরক্ষণ করুন।</li>
                <li>টেলিটক এসএমএস এর মাধ্যমে এডমিট কার্ড ডাউনলোড লিংক প্রদান করা হলে উক্ত আইডি ব্যবহার করে প্রবেশপত্র তোলা যাবে।</li>
                <li>আবেদনে কোনো ভুল তথ্য প্রমাণিত হলে কর্তৃপক্ষ আবেদন বাতিল করার অধিকার সংরক্ষণ করে।</li>
              </ol>
            </div>

            {/* Authorized Counter Footer */}
            <div className="pt-8 border-t border-slate-300 flex items-end justify-between text-xs text-slate-600">
              <div>
                <p className="font-bold text-slate-900 text-sm">আসাদ কম্পিউটার — ভূল্লী ডিজিটাল পোস্ট অফিস</p>
                <p className="text-[11px] text-slate-600">বটতলা, ভূল্লী বাজার-৫১০০, ভূল্লী, ঠাকুরগাঁও | মোবাইল: ০১৭৭৩৭৩৩৬৫৪, ০১৮৬৪৩৯৯৮৭১</p>
                <p className="text-[10px] text-slate-400">Computer Generated Document. Verified by Bhulli Digital Post Office Counter.</p>
              </div>

              <div className="text-center">
                <div className="w-40 border-b border-slate-900 mb-1" />
                <span className="text-[11px] font-semibold text-slate-800">কাউন্টার কর্মকর্তা স্বাক্ষর ও সিল</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Static Footer Bar (Always accessible even if scrolled) */}
        <div className="no-print p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>বন্ধ করে ফিরে যান (Close & Return)</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট কপি / PDF ডাউনলোড</span>
          </button>
        </div>

      </div>
    </div>
  );
};
