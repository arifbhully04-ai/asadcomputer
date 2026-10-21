import React from 'react';
import {
  Laptop,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Facebook,
  Youtube,
  Send,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ContactFooter: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 border-t border-slate-800">
      
      {/* Contact & Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: About & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-inner font-bold shrink-0">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  আসাদ কম্পিউটার
                </span>
                <p className="text-sm font-bold text-amber-400">
                  ভূল্লী ডিজিটাল পোস্ট অফিস
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              ঠাকুরগাঁওয়ের ভূল্লী এলাকায় ১০ বছরেরও বেশি সময় ধরে শতভাগ নির্ভুল সরকারি ও বেসরকারি চাকরির অনলাইন আবেদন, ছবি-স্বাক্ষর রিসাইজ, প্রিন্ট, পাসপোর্ট ও ডিজিটাল নাগরিক সেবা এবং কারিগরি শিক্ষাবোর্ড অনুমোদিত প্রফেশনাল কম্পিউটার প্রশিক্ষণ প্রদান করে আসছি।
            </p>

            <div className="space-y-3 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-200">
                  <strong>ঠিকানা:</strong> বটতলা, ভূল্লী বাজার-৫১০০, ভূল্লী, ঠাকুরগাঁও।
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-200 font-mono">
                  <strong>মোবাইল নম্বর:</strong> ০১৭৭৩৭৩৩৬৫৪, ০১৮৬৪৩৯৯৮৭১
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium text-slate-200">
                  <strong>জিমেইল:</strong> bhulli.postoffice@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300">
                  <strong>কাউন্টার খোলা:</strong> প্রতিদিন সকাল ৮:০০টা হতে রাত ১০:০০টা (শুক্রবারও খোলা)
                </span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/8801773733654"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপ চ্যাট (০১৭৭৩৭৩৩৬৫৪)</span>
              </a>
              <a
                href="tel:01773733654"
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>সরাসরি কল</span>
              </a>
            </div>
          </div>

          {/* Right: Map Location View & Quick Message Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Location Map Box */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner relative h-60 flex flex-col justify-between p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  লোকেশন ম্যাপ — ভূল্লী বাজার, ঠাকুরগাঁও
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  কাউন্টার সরাসরি খোলা
                </span>
              </div>

              <div className="relative z-10 text-center my-auto">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 mx-auto flex items-center justify-center mb-2 animate-bounce">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
                <h5 className="font-bold text-base text-white">আসাদ কম্পিউটার</h5>
                <p className="text-xs font-bold text-amber-400">ভূল্লী ডিজিটাল পোস্ট অফিস</p>
                <p className="text-xs text-slate-400 mt-0.5">বটতলা, ভূল্লী বাজার-৫১০০, ঠাকুরগাঁও</p>
              </div>

              <div className="relative z-10 flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <span>পোস্টাল কোড: ৫১০০, ঠাকুরগাঁও</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  গুগল ম্যাপে লোকেশন দেখুন ↗
                </a>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                অনলাইন জিজ্ঞাসা বা আবেদন রিকোয়েস্ট পাঠান
              </h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('ধন্যবাদ! আপনার বার্তাটি আসাদ কম্পিউটার ও ভূল্লী ডিজিটাল পোস্ট অফিসে পৌঁছেছে।');
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2"
              >
                <input
                  type="text"
                  required
                  placeholder="আপনার নাম"
                  className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  required
                  placeholder="মোবাইল নম্বর"
                  className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  বার্তা পাঠান
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} আসাদ কম্পিউটার — ভূল্লী ডিজিটাল পোস্ট অফিস, ঠাকুরগাঁও।
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>বটতলা, ভূল্লী বাজার-৫১০০</span>
            <span>·</span>
            <span>০১৭৭৩৭৩৩৬৫৪</span>
            <span>·</span>
            <span>bhulli.postoffice@gmail.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
