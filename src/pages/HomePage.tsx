import React from 'react';
import { JobCircular, Course, ServiceItem } from '../types';
import { HeroSection } from '../components/HeroSection';
import { TeamSection } from '../components/TeamSection';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
  Building,
  Users
} from 'lucide-react';

interface HomePageProps {
  circulars: JobCircular[];
  courses: Course[];
  onNavigate: (page: string) => void;
  onApplyJob: (circular: JobCircular) => void;
  onViewJobPdf: (circular: JobCircular) => void;
  onEnrollCourse: (course: Course) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  circulars,
  courses,
  onNavigate,
  onApplyJob,
  onViewJobPdf,
  onEnrollCourse,
}) => {
  const featuredJobs = circulars.slice(0, 3);
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* 1. Hero Overview */}
      <HeroSection
        onApplyClick={() => onNavigate('jobs')}
        onExploreCourses={() => onNavigate('courses')}
      />

      {/* 2. Featured Job Circulars Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              চলমান নিয়োগ বিজ্ঞপ্তি
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              সাম্প্রতিক সরকারি ও ব্যাংক চাকরির সার্কুলার
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              জরুরি ডেডলাইনের চাকরির আবেদনগুলো আমাদের কাউন্টারে এসে অথবা অনলাইনে সাবমিট করুন।
            </p>
          </div>

          <button
            onClick={() => onNavigate('jobs')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm shrink-0"
          >
            <span>সকল সার্কুলার দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {job.category === 'Govt' ? 'সরকারি' : job.category === 'Bank' ? 'ব্যাংক' : 'বেসরকারি'}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    শেষ: {job.deadline}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                  {job.titleBn}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{job.organizationBn}</span>
                </p>

                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex justify-between">
                  <span>পদসংখ্যা: <strong>{job.vacancies} টি</strong></span>
                  <span>মোট ফি: <strong className="text-blue-600">৳{job.govFee + job.serviceCharge}</strong></span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onViewJobPdf(job)}
                  className="flex-1 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg text-center"
                >
                  বিবরণ
                </button>
                <button
                  onClick={() => onApplyJob(job)}
                  className="flex-1 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg text-center shadow-sm"
                >
                  আবেদন করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Computer Courses Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              কম্পিউটার একাডেমি
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              জনপ্রিয় কম্পিউটার প্রশিক্ষণ কোর্সসমূহ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              কারিগরি শিক্ষাবোর্ড অনুমোদিত প্রফেশনাল সিলেবাসে বাস্তবমুখী কম্পিউটার শিক্ষা।
            </p>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm shrink-0"
          >
            <span>সকল কোর্স ও সিলেবাস দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {course.duration}
                  </span>
                  <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded">
                    আসন বাকি: {course.seatsLeft} টি
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {course.titleBn}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-lg font-bold text-slate-900 tabular-nums">
                      ৳{course.fee.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 line-through ml-2 tabular-nums">
                      ৳{course.originalFee.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">{course.totalClasses} টি প্র্যাকটিক্যাল ক্লাস</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => onEnrollCourse(course)}
                  className="w-full py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg text-center shadow-sm"
                >
                  ভর্তি ফর্ম পূরণ করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE 3 WORKING TEAM MEMBERS OF THE INSTITUTION */}
      <TeamSection />

      {/* 5. Quick Citizen & Shop Services Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold">
              ফটোকপি, পাসপোর্ট ও অনলাইন ডকুমেন্ট সেবা প্রয়োজন?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              জাতীয় পরিচয়পত্র (NID) সংশোধন, ই-পাসপোর্ট ফরম পূরণ, বিআরটিএ ড্রাইভিং লাইসেন্স এবং দ্রুত টাইপিং ও প্রিন্টিং সেবা পেতে আমাদের অনলাইন সার্ভিস পেজ দেখুন।
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all shadow shrink-0 whitespace-nowrap"
          >
            অনলাইন সার্ভিসসমূহ দেখুন ↗
          </button>
        </div>
      </section>
    </div>
  );
};
