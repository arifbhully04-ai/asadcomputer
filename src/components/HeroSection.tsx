import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  PhoneCall,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Laptop
} from 'lucide-react';

interface HeroSectionProps {
  onApplyClick: () => void;
  onExploreCourses: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onApplyClick,
  onExploreCourses,
}) => {
  // Animated Carousel for Computer Training & Service Photos
  const trainingSlides = [
    {
      id: 1,
      image: '/src/assets/images/training_practice_lab_1792524086214.jpg',
      title: 'হাতে-কলমে কম্পিউটার টাইপিং ও গ্রাফিক্স ডিজাইন প্র্যাকটিক্যাল ক্লাস',
      subtitle: 'আসাদ কম্পিউটার ল্যাব — প্রতিটি শিক্ষার্থীর জন্য আলাদা কম্পিউটার সুবিধা',
      tag: 'লাইভ প্র্যাকটিক্যাল ক্লাস',
    },
    {
      id: 2,
      image: '/src/assets/images/computer_training_lab_1792522036599.jpg',
      title: 'কারিগরি শিক্ষাবোর্ড অনুমোদিত কম্পিউটার অফিস অ্যাপ্লিকেশন ট্রেনিং',
      subtitle: 'এমএস ওয়ার্ড, এক্সেল, পাওয়ারপয়েন্ট ও বাংলা-ইংরেজি টাইপিং স্পিড টেস্ট',
      tag: 'আধুনিক ল্যাবরেটরি',
    },
    {
      id: 3,
      image: '/src/assets/images/job_service_counter_1792522036400.jpg',
      title: 'ভূল্লী ডিজিটাল পোস্ট অফিস ও চাকরির অনলাইন আবেদন সেবা কাউন্টার',
      subtitle: 'সরকারি, ব্যাংক ও প্রাইভেট চাকরির নির্ভুল আবেদন, ফি পেমেন্ট ও এডমিট কপি',
      tag: 'অনলাইন নাগরিক সেবা',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto sliding effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trainingSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [trainingSlides.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-8 pb-16 lg:pt-12 lg:pb-20">
      {/* Background glow */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.2),transparent_50%)] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Top Prominent Institution Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের ডিজিটাল সেবা ও আইটি প্রশিক্ষণ কেন্দ্র
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-300 font-medium bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>বটতলা, ভূল্লী বাজার-৫১০০, ভূল্লী, ঠাকুরগাঁও</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Big Brand Title, Headline, and CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Super Prominent Large Brand Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/60 to-indigo-950/80 border border-blue-500/30 backdrop-blur-sm space-y-1">
              <div className="text-xs uppercase tracking-wider font-extrabold text-blue-300 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-blue-400" />
                <span>স্বাগতম আমাদের সেন্টারে</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                আসাদ কম্পিউটার
              </h2>
              <div className="text-lg sm:text-xl font-bold text-amber-400">
                ভূল্লী ডিজিটাল পোস্ট অফিস
              </div>
            </div>

            {/* Target Headline specified by user */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                চাকরির নির্ভুল আবেদন ও <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
                  আধুনিক কম্পিউটার প্রশিক্ষণ
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                সরকারি, ব্যাংক ও প্রাইভেট চাকরির শতভাগ নির্ভুল অনলাইন আবেদন, ফি প্রদান ও তাৎক্ষণিক প্রিন্ট। সাথে রয়েছে কারিগরি শিক্ষাবোর্ড অনুমোদিত সার্টিফিকেটসহ প্রফেশনাল কম্পিউটার প্রশিক্ষণ।
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onApplyClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap active:scale-[0.98]"
              >
                <FileCheck className="w-4 h-4" />
                অনলাইন চাকরির আবেদন করুন
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCourses}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all whitespace-nowrap"
              >
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                কম্পিউটার কোর্স দেখুন
              </button>
            </div>

            {/* Quick Contact hotline */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
                <PhoneCall className="w-4 h-4" />
                <span>০১৭৭৩-৭৩৩৬৫৪</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
                <PhoneCall className="w-4 h-4" />
                <span>০১৮৬৪-৩৯৯৮৭১</span>
              </div>
            </div>
          </div>

          {/* Right Column: AUTOMATED COMPUTER TRAINING PHOTOS CAROUSEL (যাওয়া-আসা করবে) */}
          <div className="lg:col-span-6 space-y-3">
            
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                কম্পিউটার ল্যাব ও ক্লাসরুমের বাস্তব দৃশ্য
              </span>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                অটো স্লাইডার
              </span>
            </div>

            {/* Slider Frame */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-2xl h-80 sm:h-96 group">
              {trainingSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent space-y-1.5">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider">
                      {slide.tag}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              ))}

              {/* Slider Navigation Arrows */}
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev - 1 + trainingSlides.length) % trainingSlides.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 border border-white/20"
                title="পূর্ববর্তী ছবি"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % trainingSlides.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 border border-white/20"
                title="পরবর্তী ছবি"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Slider Dots */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-950/70 px-2 py-1 rounded-full border border-white/10">
                {trainingSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentSlide ? 'w-6 bg-blue-500' : 'w-2 bg-slate-500 hover:bg-slate-300'
                    }`}
                    title={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Preview Strip */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {trainingSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative rounded-lg overflow-hidden h-14 border transition-all text-left ${
                    idx === currentSlide
                      ? 'border-blue-500 ring-2 ring-blue-500/40 opacity-100'
                      : 'border-slate-700 opacity-60 hover:opacity-90'
                  }`}
                >
                  <img
                    src={s.image}
                    alt={s.tag}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                  <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-slate-900/80 px-1 py-0.2 rounded truncate max-w-[90%]">
                    {s.tag}
                  </span>
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Metrics Bar */}
        <div className="pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
              ১৫,০০০+
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              সফল চাকরির আবেদন সম্পন্ন
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
              ২,৫০০+
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              প্রশিক্ষিত ও স্বাবলম্বী শিক্ষার্থী
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
              ৯৯.৪%
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              আবেদন নির্ভুলতার নিশ্চয়তা
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">
              ভূল্লী, ঠাকুরগাঁও
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              বটতলা বাজার বিশ্বস্ত সেবা
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
