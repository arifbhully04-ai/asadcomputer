import React from 'react';
import { User } from '../types';
import {
  Laptop,
  User as UserIcon,
  LogIn,
  LogOut,
  Shield,
  LayoutDashboard,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Download
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  onOpenAuth: (defaultTab?: 'login' | 'register') => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  currentPage,
  onNavigate,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', labelBn: 'হোম পেজ' },
    { id: 'jobs', labelBn: 'চাকরির সার্কুলার' },
    { id: 'courses', labelBn: 'কম্পিউটার কোর্স' },
    { id: 'services', labelBn: 'অনলাইন সার্ভিস' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      
      {/* Top micro bar with contact info */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800/80 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-400" />
              বটতলা, ভূল্লী বাজার-৫১০০, ভূল্লী, ঠাকুরগাঁও
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-amber-400" />
              bhulli.postoffice@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3" />
              ০১৭৭৩-৭৩৩৬৫৪ / ০১৮৬৪-৩৯৯৮৭১
            </span>
            <a
              href="/asad-computer-project.zip"
              download="asad-computer-project.zip"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/40 text-[11px] font-bold font-sans transition-all shadow-sm"
              title="সম্পূর্ণ প্রজেক্টের সোর্স কোড জিপ (ZIP) ফাইল ডাউনলোড করুন"
            >
              <Download className="w-3 h-3" />
              <span>কোড ডাউনলোড (ZIP)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Big Prominent Brand Wordmark */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 cursor-pointer shrink-0 select-none py-1"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md font-bold shrink-0 border border-blue-400/30">
            <Laptop className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              আসাদ কম্পিউটার
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs sm:text-sm font-bold text-amber-400 tracking-wide">
                ভূল্লী ডিজিটাল পোস্ট অফিস
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                ঠাকুরগাঁও
              </span>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all font-semibold ${
                currentPage === link.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.labelBn}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action / User Controls */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
                    currentPage === 'admin'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30'
                  }`}
                  title="এডমিন কন্ট্রোল প্যানেল"
                >
                  <Shield className="w-3.5 h-3.5" />
                  এডমিন প্যানেল
                </button>
              )}

              <button
                onClick={() => handleNavClick('dashboard')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm whitespace-nowrap ${
                  currentPage === 'dashboard'
                    ? 'bg-blue-500 text-white ring-2 ring-blue-400'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                আমার ড্যাশবোর্ড
              </button>

              <button
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                title="লগআউট"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white transition-colors flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                লগইন
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-md whitespace-nowrap"
              >
                রেজিস্ট্রেশন
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden gap-2">
          {currentUser && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="p-2 text-blue-400 hover:text-white"
              title="Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-5 space-y-3">
          <div className="p-2 rounded-lg bg-slate-950 text-[11px] text-slate-300 space-y-1">
            <div className="font-semibold text-amber-400">বটতলা, ভূল্লী বাজার-৫১০০, ঠাকুরগাঁও</div>
            <div className="text-emerald-400">ফোন: ০১৭১৩-৭৩৩৬৫৪ / ০১৮৬৪-৩৯৯৮৭১</div>
          </div>

          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === link.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.labelBn}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <div className="flex items-center justify-between text-xs text-slate-400 px-3">
                  <span>সাইন ইন: {currentUser.name}</span>
                  <span className="capitalize text-blue-400 font-semibold">{currentUser.role}</span>
                </div>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  >
                    <Shield className="w-4 h-4" />
                    এডমিন কন্ট্রোল সেন্টার
                  </button>
                )}
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  আমার ইউজার ড্যাশবোর্ড
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg text-slate-400 hover:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  লগআউট করুন
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-2 text-xs font-medium text-center rounded-lg border border-slate-700 text-slate-200"
                >
                  লগইন
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="py-2 text-xs font-semibold text-center rounded-lg bg-blue-600 text-white"
                >
                  রেজিস্ট্রেশন
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800">
              <a
                href="/asad-computer-project.zip"
                download="asad-computer-project.zip"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>প্রজেক্টের সম্পূর্ণ কোড ডাউনলোড (ZIP)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
