import React from 'react';
import { INITIAL_SERVICES } from '../data/mockData';
import {
  Briefcase,
  FileText,
  ShieldCheck,
  Printer,
  FileSpreadsheet,
  Award,
  Clock,
  Coins,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface OnlineServicesSectionProps {
  onServiceSelect: (serviceTitle: string) => void;
}

export const OnlineServicesSection: React.FC<OnlineServicesSectionProps> = ({ onServiceSelect }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'Printer':
        return <Printer className="w-5 h-5 text-amber-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-purple-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-teal-600" />;
      default:
        return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            ওয়ান-স্টপ ডিজিটাল সার্ভিস কাউন্টার
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            কম্পিউটার শপ ও নাগরিক অনলাইন সেবাসমূহ
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            সরকারি-বেসরকারি যে কোনো ফরম পূরণ, প্রিন্ট, স্ক্যান ও ডিজিটাল সার্ভিস পেতে আমাদের কাউন্টারে আসুন অথবা অনলাইনে অর্ডার দিন।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(srv.iconName)}
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {srv.titleBn}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{srv.title}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-slate-400" />
                    চার্জ: <strong className="text-slate-800">{srv.charge}</strong>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {srv.estimatedTime}
                  </span>
                </div>

                <button
                  onClick={() => onServiceSelect(srv.titleBn)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>এই সেবার জন্য যোগাযোগ করুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Counter Assistance Box */}
        <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold">
              জরুরি কোনো ফরম পূরণ বা ডকুমেন্টের পরামর্শ প্রয়োজন?
            </h4>
            <p className="text-xs text-blue-200">
              আমাদের সরাসরি কল করুন অথবা হোয়াটসঅ্যাপে আপনার ডকুমেন্টের ছবি পাঠিয়ে কাজ শুরু করতে পারেন।
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/8801773733654?text=Hello%20Asad%20Computer,%20I%20need%20assistance%20with%20online%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              হোয়াটসঅ্যাপ চ্যাট
            </a>
            <a
              href="tel:01773733654"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              হটলাইন: ০১৭৭৩-৭৩৩৬৫৪
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
