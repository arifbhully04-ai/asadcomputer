import React from 'react';
import { OnlineServicesSection } from '../components/OnlineServicesSection';
import { FileText, ArrowLeft, ShieldCheck, Printer, CheckCircle2, MessageSquare } from 'lucide-react';

interface ServicesPageProps {
  onNavigateHome: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigateHome }) => {
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
              কম্পিউটার শপ ও নাগরিক ডিজিটাল সেবাসমূহ
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              ই-পাসপোর্ট ফরম, জাতীয় পরিচয়পত্র (NID) সংশোধন, ড্রাইভিং লাইসেন্স আবেদন, লেজার ও কালার ফটোকপি, হাই-রেজোলিউশন স্ক্যান ও চুক্তিপত্র কম্পোজ সেবা।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/8801773733654?text=Hello%20Asad%20Computer,%20I%20need%20assistance%20with%20online%20services."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে অর্ডার দিন</span>
            </a>
          </div>
        </div>

      </div>

      {/* Embedded Full Online Services List */}
      <OnlineServicesSection
        onServiceSelect={(title) => {
          window.open(
            `https://wa.me/8801712345678?text=Hello%20Digital%20Computer%20Center,%20I%20need%20assistance%20with%20${encodeURIComponent(title)}`,
            '_blank'
          );
        }}
      />
    </div>
  );
};
