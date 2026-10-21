import React, { useState } from 'react';
import { User, JobApplication, CourseEnrollment } from '../types';
import {
  LayoutDashboard,
  FileCheck,
  GraduationCap,
  User as UserIcon,
  Printer,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  Calendar,
  Building,
  CreditCard
} from 'lucide-react';

interface UserDashboardProps {
  currentUser: User;
  applications: JobApplication[];
  enrollments: CourseEnrollment[];
  onViewApplicationSlip: (app: JobApplication) => void;
  onViewStudentIdCard: (enrollment: CourseEnrollment) => void;
  onNewJobApply: () => void;
  onNewCourseEnroll: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  applications,
  enrollments,
  onViewApplicationSlip,
  onViewStudentIdCard,
  onNewJobApply,
  onNewCourseEnroll,
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'courses' | 'profile'>('applications');

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            আবেদন সম্পন্ন ও গৃহীত
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            যাচাইকরণ চলছে
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            বাতিল
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            পেন্ডিং (অপেক্ষমান)
          </span>
        );
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* User Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 border-2 border-white/40 overflow-hidden shrink-0 flex items-center justify-center">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{currentUser.name}</h2>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-blue-500/30 text-blue-300 border border-blue-400/30 uppercase">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                মোবাইল: {currentUser.phone} · ইমেইল: {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNewJobApply}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow flex items-center gap-1.5 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              নতুন চাকরির আবেদন
            </button>
            <button
              onClick={onNewCourseEnroll}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              কোর্সে ভর্তি
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            আমার চাকরির আবেদনসমূহ ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            আমার কম্পিউটার কোর্সসমূহ ({enrollments.length})
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            প্রোফাইল তথ্য
          </button>
        </div>

        {/* Tab 1: Job Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-800">এখনো কোনো চাকরির আবেদন করা হয়নি</h4>
                <p className="text-xs text-slate-500 mt-1">
                  আমাদের চলমান সার্কুলার থেকে যেকোনো সরকারি বা বেসরকারি পদে আবেদন করুন।
                </p>
                <button
                  onClick={onNewJobApply}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white"
                >
                  সার্কুলার দেখুন ও আবেদন করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {app.applicationId}
                        </span>
                        {getStatusBadge(app.status)}
                        <span className="text-xs text-slate-400">
                          আবেদনের তারিখ: {app.appliedDate}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-base text-slate-900">
                          {app.jobTitle}
                        </h4>
                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.organization}</span>
                        </p>
                      </div>

                      <div className="text-xs text-slate-600 flex flex-wrap gap-4">
                        <span>প্রার্থীর নাম: <strong className="text-slate-800">{app.applicantName}</strong></span>
                        <span>রোল নং: <strong className="text-slate-800 font-mono">{app.rollNumber || 'PENDING'}</strong></span>
                        <span>পরিশোধিত ফি: <strong className="text-emerald-700">৳{app.totalAmount}</strong></span>
                      </div>

                      {app.remarks && (
                        <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                          📝 নোট: {app.remarks}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => onViewApplicationSlip(app)}
                        className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-sm whitespace-nowrap"
                      >
                        <Printer className="w-4 h-4" />
                        <span>আবেদন কপি / PDF ডাউনলোড</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            {enrollments.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-800">কোনো কোর্সে ভর্তি নেই</h4>
                <p className="text-xs text-slate-500 mt-1">
                  আমাদের আধুনিক কম্পিউটার ট্রেনিং ল্যাবে ভর্তি হয়ে সরকারি মানের সার্টিফিকেট অর্জন করুন।
                </p>
                <button
                  onClick={onNewCourseEnroll}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white"
                >
                  কম্পিউটার কোর্স দেখুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrollments.map((enr) => (
                  <div
                    key={enr.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          আইডি: {enr.studentIdCardNumber}
                        </span>
                        <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          {enr.status === 'Ongoing' ? 'চলমান ব্যাচ' : 'ভর্তি সম্পন্ন'}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-slate-900 leading-snug">
                        {enr.courseTitle}
                      </h4>

                      <div className="text-xs text-slate-600 space-y-1">
                        <div>সময়সূচী: <strong className="text-slate-800">{enr.batchSchedule}</strong></div>
                        <div>ভর্তির তারিখ: <strong className="text-slate-800">{enr.enrolledDate}</strong></div>
                        <div>পরিশোধিত ফি: <strong className="text-blue-700">৳{enr.amountPaid}</strong> (মোট ৳{enr.totalFee})</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <button
                        onClick={() => onViewStudentIdCard(enr)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                        <span>ডিজিটাল স্টুডেন্ট আইডি কার্ড দেখুন ও প্রিন্ট করুন</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile Info */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 max-w-2xl">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              ব্যবহারকারী তথ্য ও বিবরণ
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">পূর্ণ নাম:</span>
                <span className="font-semibold text-slate-900 text-sm">{currentUser.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">বাংলায় নাম:</span>
                <span className="font-medium text-slate-800">{currentUser.nameBn || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">মোবাইল নম্বর:</span>
                <span className="font-mono font-medium text-slate-900">{currentUser.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">ইমেইল:</span>
                <span className="font-medium text-slate-900">{currentUser.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">নিজ জেলা:</span>
                <span className="font-medium text-slate-900">{currentUser.district || 'ঢাকা'}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">অ্যাকাউন্টের ধরন:</span>
                <span className="font-semibold text-blue-600 uppercase">{currentUser.role}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
