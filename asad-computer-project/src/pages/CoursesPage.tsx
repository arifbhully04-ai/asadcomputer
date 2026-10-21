import React from 'react';
import { Course } from '../types';
import { CoursesSection } from '../components/CoursesSection';
import { GraduationCap, ArrowLeft, Award, CheckCircle, BookOpen } from 'lucide-react';

interface CoursesPageProps {
  courses: Course[];
  onEnrollCourse: (course: Course) => void;
  onNavigateHome: () => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  onEnrollCourse,
  onNavigateHome,
}) => {
  return (
    <div className="py-8 bg-slate-50 min-h-[80vh] space-y-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>হোম পেজে ফিরে যান</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              কম্পিউটার প্রশিক্ষণ কোর্স ও একাডেমি
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              কারিগরি শিক্ষাবোর্ড অনুমোদিত প্রফেশনাল কম্পিউটার প্রশিক্ষণ। প্রতিটি ছাত্র-ছাত্রীর জন্য আলাদা কম্পিউটার ল্যাব, প্রজেক্টর ক্লাস এবং কোর্স শেষে সরকারি মানের সার্টিফিকেট সুবিধা।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 block">কোর্স সম্পন্নকারী</span>
              <span className="text-xl font-bold text-emerald-400 tabular-nums">২,৫০০+ জন</span>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded Full Courses Catalog & Syllabus */}
      <CoursesSection
        courses={courses}
        onEnroll={onEnrollCourse}
      />
    </div>
  );
};
