import React, { useState } from 'react';
import { Notice } from '../types';
import { Bell, X, Calendar, Search, ExternalLink, AlertCircle, Briefcase, GraduationCap, Info } from 'lucide-react';

interface AllNoticesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notices: Notice[];
  onNavigatePage: (page: string) => void;
}

export const AllNoticesModal: React.FC<AllNoticesModalProps> = ({
  isOpen,
  onClose,
  notices,
  onNavigatePage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Job' | 'Course' | 'General'>('All');

  if (!isOpen) return null;

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.date.includes(searchQuery);

    const matchesCategory =
      selectedCategory === 'All' || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleActionClick = (notice: Notice) => {
    onClose();
    if (notice.category === 'Job') {
      onNavigatePage('jobs');
    } else if (notice.category === 'Course') {
      onNavigatePage('courses');
    } else {
      onNavigatePage('services');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>অফিসিয়াল নোটিশ বোর্ড</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono font-medium">
                  {notices.length} টি
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                আসাদ কম্পিউটার ও ডিজিটাল পোস্ট অফিসের সকল লাইভ আপডেট
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/60 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বিজ্ঞপ্তি বা তারিখ দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              সকল নোটিশ ({notices.length})
            </button>
            <button
              onClick={() => setSelectedCategory('Job')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedCategory === 'Job'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span>চাকরির বিজ্ঞপ্তি</span>
            </button>
            <button
              onClick={() => setSelectedCategory('Course')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedCategory === 'Course'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>কম্পিউটার কোর্স</span>
            </button>
            <button
              onClick={() => setSelectedCategory('General')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedCategory === 'General'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Info className="w-3 h-3" />
              <span>সাধারণ নোটিশ</span>
            </button>
          </div>
        </div>

        {/* Notices List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredNotices.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-medium">কোনো নোটিশ পাওয়া যায়নি।</p>
              <p className="text-xs text-slate-500">অন্য শব্দ দিয়ে অনুসন্ধান করে দেখুন।</p>
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all space-y-2.5 group"
              >
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                        notice.category === 'Job'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : notice.category === 'Course'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {notice.category === 'Job'
                        ? 'চাকরির নিয়োগ'
                        : notice.category === 'Course'
                        ? 'কোর্স আপডেট'
                        : 'সাধারণ নোটিশ'}
                    </span>
                    {notice.isImportant && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                        জরুরি ডেডলাইন
                      </span>
                    )}
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{notice.date}</span>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {notice.titleBn}
                </h3>

                {notice.title && (
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {notice.title}
                  </p>
                )}

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    আসাদ কম্পিউটার অফিসিয়াল নোটিশ বোর্ড
                  </span>

                  <button
                    onClick={() => handleActionClick(notice)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>
                      {notice.category === 'Job'
                        ? 'আবেদন সার্কুলার দেখুন'
                        : notice.category === 'Course'
                        ? 'কোর্স সিলেবাস দেখুন'
                        : 'বিস্তারিত সেবা'}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>সরাসরি হেল্পলাইন: ০১৭৭৩-৭৩৩৬৫৪ / ০১৮৬৪-৩৯৯৮৭১</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
