import React, { useState } from 'react';
import { User } from '../types';
import { StorageService } from '../services/storage';
import {
  X,
  LogIn,
  UserPlus,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  AlertCircle,
  Phone,
  Mail,
  Lock,
  User as UserIcon
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  defaultTab?: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  defaultTab = 'login',
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);

  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('ঢাকা');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailOrPhone.trim()) {
      setErrorMsg('মোবাইল নম্বর বা ইমেইল লিখুন');
      return;
    }

    const user = StorageService.login(emailOrPhone);
    if (user) {
      onLoginSuccess(user);
      onClose();
    } else {
      setErrorMsg('সঠিক তথ্য পাওয়া যায়নি। ডেমো একাউন্ট ব্যবহার করতে পারেন।');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('সকল প্রয়োজনীয় ঘর পূরণ করুন');
      return;
    }

    try {
      const newUser = StorageService.register({
        name,
        nameBn,
        email,
        phone,
        role: 'user',
        district,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      });

      onLoginSuccess(newUser);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg('রেজিস্ট্রেশনে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।');
    }
  };

  // Demo one-click handlers
  const handleQuickDemo = (role: 'admin' | 'student') => {
    if (role === 'admin') {
      const user = StorageService.login('bhulli.postoffice@gmail.com') || StorageService.login('01773733654');
      if (user) {
        onLoginSuccess(user);
        onClose();
      }
    } else {
      const user = StorageService.login('student@example.com');
      if (user) {
        onLoginSuccess(user);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base">ডিজিটাল সার্ভিস ও স্টুডেন্ট পোর্টাল</h3>
            <p className="text-[11px] text-blue-300">লগইন অথবা নতুন ফ্রি অ্যাকাউন্ট তৈরি করুন</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => {
              setTab('login');
              setErrorMsg('');
            }}
            className={`py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              tab === 'login'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/30'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            লগইন (Sign In)
          </button>

          <button
            onClick={() => {
              setTab('register');
              setErrorMsg('');
            }}
            className={`py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              tab === 'register'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/30'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            রেজিস্ট্রেশন (Sign Up)
          </button>
        </div>

        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Demo Access Bar */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
              দ্রুত টেস্ট করতে ১-ক্লিকে ডেমো লগইন করুন:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-1.5 px-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>ডেমো এডমিন</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="py-1.5 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>ডেমো স্টুডেন্ট</span>
              </button>
            </div>
          </div>

          {/* Form */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  মোবাইল নম্বর অথবা ইমেইল *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="01712345678 বা student@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow transition-all active:scale-[0.98]"
              >
                লগইন করুন
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  আপনার পূর্ণ নাম (English) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Md. Tanvir Ahmed"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    ইমেইল *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="myname@mail.com"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  নিজ জেলা
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="ঢাকা / কুমিল্লা / চট্টগ্রাম"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow transition-all active:scale-[0.98]"
              >
                রেজিস্ট্রেশন সম্পন্ন করুন
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
