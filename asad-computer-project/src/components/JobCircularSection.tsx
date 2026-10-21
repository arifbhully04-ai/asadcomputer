import React, { useState, useMemo } from 'react';
import { JobCircular, JobCategory } from '../types';
import {
  Briefcase,
  Calendar,
  Building,
  GraduationCap,
  Users,
  Search,
  FileText,
  Clock,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface JobCircularSectionProps {
  circulars: JobCircular[];
  onApplyJob: (circular: JobCircular) => void;
  onViewPdf: (circular: JobCircular) => void;
}

export const JobCircularSection: React.FC<JobCircularSectionProps> = ({
  circulars,
  onApplyJob,
  onViewPdf,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'All', labelBn: 'সকল চাকরি' },
    { id: 'Govt', labelBn: 'সরকারি চাকরি' },
    { id: 'Bank', labelBn: 'ব্যাংক ও আর্থিক' },
    { id: 'Defense', labelBn: 'ডিফেন্স ও বাহিনী' },
    { id: 'Private', labelBn: 'বেসরকারি প্রতিষ্ঠান' },
  ];

  const filteredCirculars = useMemo(() => {
    return circulars.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.titleBn.toLowerCase().includes(query) ||
        item.organization.toLowerCase().includes(query) ||
        item.organizationBn.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [circulars, selectedCategory, searchQuery]);

  // Days left calculation
  const getDaysLeft = (deadlineStr: string) => {
    const today = new Date();
    const deadline = new Date(deadlineStr);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <section id="jobs" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            চলমান নিয়োগ বিজ্ঞপ্তি ও সরাসরি আবেদন
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            সরকারি ও বেসরকারি চাকরির সার্কুলার
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            সকল সাম্প্রতিক চাকরির বিজ্ঞপ্তি দেখুন এবং ঘরে বসেই অথবা আমাদের সেন্টারের মাধ্যমে নির্ভুলভাবে অনলাইনে আবেদন সম্পন্ন করুন।
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.labelBn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="চাকরি বা প্রতিষ্ঠান খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Circular Cards Grid */}
        {filteredCirculars.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">কোনো বিজ্ঞপ্তি পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mt-1">অন্য কোনো ক্যাটাগরি অথবা সার্চ কি-ওয়ার্ড পরিবর্তন করে দেখুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCirculars.map((job) => {
              const daysLeft = getDaysLeft(job.deadline);
              const isUrgent = daysLeft > 0 && daysLeft <= 5;
              const isExpired = daysLeft < 0;

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5 space-y-3.5">
                    {/* Header: Category & Deadline Badge */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                        {job.category === 'Govt'
                          ? 'সরকারি'
                          : job.category === 'Bank'
                          ? 'ব্যাংক'
                          : job.category === 'Defense'
                          ? 'ডিফেন্স'
                          : 'বেসরকারি'}
                      </span>

                      {isExpired ? (
                        <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-[11px] font-medium">
                          আবেদনের মেয়াদ শেষ
                        </span>
                      ) : (
                        <span
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                            isUrgent
                              ? 'bg-amber-100 text-amber-900 font-semibold'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          {daysLeft === 0 ? 'আজই শেষ দিন!' : `${daysLeft} দিন বাকি`}
                        </span>
                      )}
                    </div>

                    {/* Job Title & Org */}
                    <div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {job.titleBn}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{job.organizationBn}</span>
                      </p>
                    </div>

                    {/* Meta Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                      <div>
                        <span className="text-[11px] text-slate-500 block">মোট পদসংখ্যা</span>
                        <span className="font-semibold text-slate-800 tabular-nums">
                          {job.vacancies} টি
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block">শেষ তারিখ</span>
                        <span className="font-semibold text-slate-800 tabular-nums">
                          {job.deadline}
                        </span>
                      </div>
                    </div>

                    {/* Educational Requirement summary */}
                    <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      <span className="font-medium text-slate-700">যোগ্যতা: </span>
                      {job.educationReq}
                    </div>

                    {/* Fee Summary */}
                    <div className="text-xs text-slate-500 pt-1 flex items-center justify-between border-t border-slate-100">
                      <span>সরকারি ফি: <strong className="text-slate-800">৳{job.govFee}</strong></span>
                      <span>সার্ভিস ফি: <strong className="text-blue-600">৳{job.serviceCharge}</strong></span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onViewPdf(job)}
                      className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      সার্কুলার বিবরণ
                    </button>

                    <button
                      onClick={() => onApplyJob(job)}
                      disabled={isExpired}
                      className={`flex-1 py-2 px-3 text-xs font-semibold text-white rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                        isExpired
                          ? 'bg-slate-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-500 shadow-sm active:scale-[0.98]'
                      }`}
                    >
                      <span>আবেদন রিকোয়েস্ট</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
