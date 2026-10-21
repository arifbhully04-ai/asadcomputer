import React, { useState } from 'react';
import { Course } from '../types';
import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

interface CoursesSectionProps {
  courses: Course[];
  onEnroll: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ courses, onEnroll }) => {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(courses[0]?.id || null);

  const toggleSyllabus = (id: string) => {
    setExpandedCourseId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="courses" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            কারিগরি শিক্ষাবোর্ড অনুমোদিত প্রফেশনাল ট্রেনিং
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            কম্পিউটার প্রশিক্ষণ কোর্সসমূহ
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            চাকরি ও ফ্রিল্যান্সিং উপযোগী বাস্তবমুখী প্রশিক্ষণ। প্রতিটি ছাত্র-ছাত্রীর জন্য আলাদা কম্পিউটার এবং প্রজেক্টর ক্লাসরুম সুবিধা।
          </p>
        </div>

        {/* Feature Lab Banner Strip */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                আধুনিক কম্পিউটার ল্যাব ও ফ্যাকাল্টি
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                হাতে-কলমে প্র্যাকটিক্যাল ক্লাস ও সরকারি সার্টিফিকেশন
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                আমাদের প্রতিটি কোর্সে রয়েছে লাইভ প্রজেক্ট, উইকলি টেস্ট এবং কোর্স শেষে সনদপত্র প্রদানের ব্যবস্থা। দুর্বল শিক্ষার্থীদের জন্য রয়েছে ফ্রি ব্যাকআপ ক্লাস।
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ব্যক্তিগত পিসি ও হাইস্পিড নেট</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>লাইফটাইম স্টুডেন্ট সাপোর্ট</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ফ্রিল্যান্সিং গাইডলাইন</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-56 lg:h-auto min-h-[220px]">
            <img
              src="/src/assets/images/computer_training_lab_1792522036599.jpg"
              alt="Computer Training Laboratory"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent lg:hidden" />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const isExpanded = expandedCourseId === course.id;

            return (
              <div
                key={course.id}
                className={`bg-white rounded-xl border transition-all flex flex-col justify-between ${
                  course.isPopular
                    ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-md'
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="p-5 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {course.duration}
                    </span>
                    {course.isPopular && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        সেরা জনপ্রিয়
                      </span>
                    )}
                  </div>

                  {/* Course Title & Overview */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {course.titleBn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-[11px] text-slate-500 block">ক্লাস সংখ্যা</span>
                      <span className="font-semibold text-slate-800">{course.totalClasses} টি প্র্যাকটিক্যাল</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">লেভেল</span>
                      <span className="font-semibold text-slate-800">{course.level}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-200/60">
                      <span className="text-[11px] text-slate-500 block">ক্লাসের সময়সূচী</span>
                      <span className="font-medium text-slate-700 text-[11px]">{course.batchSchedule}</span>
                    </div>
                  </div>

                  {/* Seats Status */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      আসন বাকি: <strong className="text-emerald-700 font-bold">{course.seatsLeft} টি</strong>
                    </span>
                    <span className="text-[11px] text-slate-400">সর্বমোট ২৫ আসন</span>
                  </div>

                  {/* Syllabus Toggle */}
                  <div className="border-t border-slate-100 pt-2">
                    <button
                      onClick={() => toggleSyllabus(course.id)}
                      className="w-full flex items-center justify-between py-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {isExpanded ? 'সিলেবাস আড়াল করুন' : 'বিস্তারিত সিলেবাস দেখুন'}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        {course.syllabus.map((topic, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-blue-500 font-bold shrink-0">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Fee Section */}
                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-xl font-bold text-slate-900 tabular-nums">
                        ৳{course.fee.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 line-through ml-2 tabular-nums">
                        ৳{course.originalFee.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      বিশেষ ছাড়
                    </span>
                  </div>
                </div>

                {/* Bottom Enroll CTA */}
                <div className="p-3 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={() => onEnroll(course)}
                    className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>ভর্তি ফর্ম পূরণ করুন</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
