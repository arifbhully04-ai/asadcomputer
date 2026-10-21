import React from 'react';
import { User } from '../types';
import {
  Laptop,
  LogIn,
  LogOut,
  Shield,
  LayoutDashboard,
  Bell,
  Briefcase,
  GraduationCap,
  Sparkles,
  Home,
  UserPlus
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  onOpenAuth: (defaultTab?: 'login' | 'register') => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onOpenNotices: () => void;
  noticesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  currentPage,
  onNavigate,
  onLogout,
  onOpenNotices,
  noticesCount = 4,
}) => {
  const navLinks = [
    { id: 'home', labelBn: 'হোম পেজ', icon: Home },
    { id: 'jobs', labelBn: 'চাকরির সার্কুলার', icon: Briefcase },
    { id: 'courses', labelBn: 'কম্পিউটার কোর্স', icon: GraduationCap },
    { id: 'services', labelBn: 'অনলাইন সার্ভিস', icon: Sparkles },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070d1e] border-b border-slate-800/90 text-white shadow-lg">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Mark matching Capture10 */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer select-none py-1 group"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md font-bold shrink-0 border border-blue-400/30 group-hover:bg-blue-500 transition-colors">
            <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight font-sans">
              আসাদ কম্পিউটার
            </span>
            <div className="flex items-center gap-1.5 text-xs text-blue-300 font-medium">
              <span>ডিজিটাল সেবা ও আইটি একাডেমি</span>
              <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-slate-400 hidden sm:inline">ভূল্লী, ঠাকুরগাঁও</span>
            </div>
          </div>
        </div>

        {/* User Account Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                    currentPage === 'admin'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20'
                  }`}
                  title="এডমিন কন্ট্রোল প্যানেল"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">এডমিন প্যানেল</span>
                </button>
              )}

              <button
                onClick={() => handleNavClick('dashboard')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm whitespace-nowrap cursor-pointer ${
                  currentPage === 'dashboard'
                    ? 'bg-blue-500 text-white ring-2 ring-blue-400'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>ড্যাশবোর্ড</span>
              </button>

              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="লগআউট"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-400" />
                <span>লগইন</span>
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md hover:shadow-blue-600/30 whitespace-nowrap active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 hidden sm:inline" />
                <span>ভর্তি / নিবন্ধন</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Neatly Lined-Up Navigation Buttons Row ("বাটন গুলো উপরে লাইন সারিবদ্ধ করে রাখো") */}
      <div className="bg-[#050b1a] border-t border-slate-800/80 px-4 py-2 sm:py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          
          {/* Main Action Links */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  <span>{link.labelBn}</span>
                </button>
              );
            })}
          </div>

          {/* Dedicated Notice Button ("নোটিশ এর জন্য নোটিশ বাটন থাকবে যেখানে ক্লিক দিলে সব নোটিশ আসবে") */}
          <div className="shrink-0 pl-2">
            <button
              onClick={onOpenNotices}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95 group"
              title="সকল অফিসিয়াল নোটিশ দেখুন"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400 group-hover:animate-bounce" />
              <span>নোটিশ বোর্ড</span>
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-mono text-[11px] font-extrabold flex items-center justify-center">
                {noticesCount}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
