import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onApplyClick?: () => void;
  onExploreCourses?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onApplyClick,
  onExploreCourses,
}) => {
  // Slides configuration matching the institution services and lab
  const slides = [
    {
      id: 1,
      image: '/src/assets/images/job_service_counter_1792522036400.jpg',
      tag: 'অনলাইন নাগরিক সেবা',
      title: 'ভূল্লী ডিজিটাল পোস্ট অফিস ও চাকরির অনলাইন আবেদন সেবা কাউন্টার',
      subtitle: 'সরকারি, ব্যাংক ও প্রাইভেট চাকরির নির্ভুল আবেদন, ফি পেমেন্ট ও এডমিট কপি',
    },
    {
      id: 2,
      image: '/src/assets/images/training_practice_lab_1792524086214.jpg',
      tag: 'লাইভ প্র্যাকটিক্যাল ক্লাস',
      title: 'হাতে-কলমে কম্পিউটার টাইপিং ও গ্রাফিক্স ডিজাইন প্র্যাকটিক্যাল ক্লাস',
      subtitle: 'আসাদ কম্পিউটার ল্যাব — প্রতিটি শিক্ষার্থীর জন্য আলাদা কম্পিউটার সুবিধা',
    },
    {
      id: 3,
      image: '/src/assets/images/computer_training_lab_1792522036599.jpg',
      tag: 'আধুনিক ল্যাবরেটরি',
      title: 'কারিগরি শিক্ষাবোর্ড অনুমোদিত কম্পিউটার অফিস অ্যাপ্লিকেশন ট্রেনিং',
      subtitle: 'এমএস ওয়ার্ড, এক্সেল, পাওয়ারপয়েন্ট ও বাংলা-ইংরেজি টাইপিং স্পিড টেস্ট',
    },
  ];

  // Default to slide index 0 (which is online citizen & job counter as in user screenshot)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full bg-[#030712] text-white py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Cinema Slider Frame */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/90 bg-slate-900 shadow-2xl h-[340px] sm:h-[440px] lg:h-[500px] select-none group">
          {slides.map((slide, index) => (
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

              {/* Multi-stop dark scrim for 100% legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent space-y-2">
                <span className="inline-block text-xs sm:text-sm font-bold text-sky-400 tracking-wide">
                  {slide.tag}
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug tracking-tight max-w-4xl">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Left Arrow Button */}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
            }
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 hover:border-white/30 backdrop-blur-sm cursor-pointer"
            title="পূর্ববর্তী ছবি"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10 hover:border-white/30 backdrop-blur-sm cursor-pointer"
            title="পরবর্তী ছবি"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* 3 Thumbnail Preview Cards Row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`relative rounded-xl overflow-hidden h-16 sm:h-20 lg:h-24 border transition-all text-left cursor-pointer group ${
                idx === currentSlide
                  ? 'border-blue-500 ring-2 ring-blue-500/50 opacity-100 shadow-md shadow-blue-500/20'
                  : 'border-slate-800 opacity-60 hover:opacity-90 hover:border-slate-700'
              }`}
            >
              <img
                src={s.image}
                alt={s.tag}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/40" />
              <span className="absolute bottom-1.5 left-2 sm:bottom-2 sm:left-2.5 text-[10px] sm:text-xs font-semibold text-white bg-slate-950/80 px-2 py-0.5 rounded truncate max-w-[90%]">
                {s.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Statistics & Trust Proof Strip */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center text-center">
          
          {/* Stat 1 */}
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tabular-nums tracking-tight">
              ১৫,০০০+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              সফল চাকরির আবেদন সম্পন্ন
            </div>
          </div>

          {/* Stat 2 */}
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-400 tabular-nums tracking-tight">
              ২,৫০০+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              প্রশিক্ষিত ও স্বাবলম্বী শিক্ষার্থী
            </div>
          </div>

          {/* Stat 3 */}
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tabular-nums tracking-tight">
              ৯৯.৪%
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              আবেদন নির্ভুলতার নিশ্চয়তা
            </div>
          </div>

          {/* Stat 4 - Stylized Brand Tag */}
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-400 leading-tight">
              ভূল্লী, <br className="hidden sm:inline" /> ঠাকুরগাঁও
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              বটতলা বাজার বিশ্বস্ত সেবা
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
