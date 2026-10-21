import React from 'react';
import { JobCircular } from '../types';
import { JobCircularSection } from '../components/JobCircularSection';
import { Briefcase, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface JobCircularsPageProps {
  circulars: JobCircular[];
  onApplyJob: (circular: JobCircular) => void;
  onViewPdf: (circular: JobCircular) => void;
  onNavigateHome: () => void;
}

export const JobCircularsPage: React.FC<JobCircularsPageProps> = ({
  circulars,
  onApplyJob,
  onViewPdf,
  onNavigateHome,
}) => {
  return (
    <div className="py-8 bg-slate-50 min-h-[80vh] space-y-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-white transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>হোম পেজে ফিরে যান</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              চাকরির সার্কুলার ও অনলাইন আবেদন পোর্টাল
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              দেশব্যাপী চলমান সকল সরকারি, ব্যাংক ও বেসরকারি প্রতিষ্ঠানের নিয়োগ বিজ্ঞপ্তি। আসাদ কম্পিউটার ও ভূল্লী ডিজিটাল পোস্ট অফিসের অভিজ্ঞ অপারেটরের মাধ্যমে ছবি ও স্বাক্ষর নির্ভুল রিসাইজ করে আবেদন নিশ্চিত করুন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 block">চলমান মোট পদসংখ্যা</span>
              <span className="text-xl font-bold text-emerald-400 tabular-nums">
                {circulars.reduce((sum, c) => sum + c.vacancies, 0).toLocaleString()} টি+
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded Job Circular Section with full category filters and search */}
      <JobCircularSection
        circulars={circulars}
        onApplyJob={onApplyJob}
        onViewPdf={onViewPdf}
      />
    </div>
  );
};
