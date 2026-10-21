import React, { useState } from 'react';
import { Course, CourseEnrollment, User } from '../types';
import { StorageService } from '../services/storage';
import { X, GraduationCap, Calendar, Clock, AlertCircle } from 'lucide-react';

interface CourseEnrollModalProps {
  course: Course;
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (enrollment: CourseEnrollment) => void;
}

export const CourseEnrollModal: React.FC<CourseEnrollModalProps> = ({
  course,
  currentUser,
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [studentPhone, setStudentPhone] = useState(currentUser?.phone || '');
  const [studentEmail, setStudentEmail] = useState(currentUser?.email || '');
  const [batchSchedule, setBatchSchedule] = useState(course.batchSchedule);
  const [paymentOption, setPaymentOption] = useState<'full' | 'booking'>('full');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const amountToPay = paymentOption === 'full' ? course.fee : 1000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) {
      setErrorMsg('নাম ও মোবাইল নম্বর আবশ্যক');
      return;
    }

    setIsSubmitting(true);
    try {
      const userId = currentUser ? currentUser.id : 'usr_' + Date.now();

      const newEnrollment = StorageService.enrollInCourse({
        userId,
        courseId: course.id,
        courseTitle: course.titleBn,
        studentName,
        studentPhone,
        studentEmail: studentEmail || 'student@digitalcenter.com',
        batchSchedule,
        paymentStatus: paymentOption === 'full' ? 'Paid' : 'Partial',
        amountPaid: amountToPay,
        totalFee: course.fee,
        photoUrl: currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
      });

      setIsSubmitting(false);
      onSuccess(newEnrollment);
    } catch (err) {
      console.error(err);
      setErrorMsg('ভর্তির আবেদন প্রক্রিয়াকরণে ত্রুটি হয়েছে।');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base">
              অনলাইন কম্পিউটার কোর্স ভর্তি ফর্ম
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Selected Course Summary */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900 text-sm">{course.titleBn}</div>
            <div className="text-slate-600 flex justify-between">
              <span>মেয়াদ: {course.duration}</span>
              <span className="font-semibold text-blue-600">কোর্স ফি: ৳{course.fee}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              শিক্ষার্থীর পূর্ণ নাম *
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="যেমন: তানভীর আহমেদ"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                required
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                placeholder="018XXXXXXXX"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              পছন্দের ব্যাচ সময়সূচী
            </label>
            <input
              type="text"
              value={batchSchedule}
              onChange={(e) => setBatchSchedule(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Payment Option */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              পেমেন্ট নির্বাচন
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                onClick={() => setPaymentOption('full')}
                className={`p-3 rounded-lg border text-xs cursor-pointer flex flex-col justify-between ${
                  paymentOption === 'full'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>সম্পূর্ণ ফি পরিশোধ</span>
                <strong className="text-sm mt-1">৳{course.fee}</strong>
              </label>

              <label
                onClick={() => setPaymentOption('booking')}
                className={`p-3 rounded-lg border text-xs cursor-pointer flex flex-col justify-between ${
                  paymentOption === 'booking'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>আসন বুকিং ফি (বাকি পরে)</span>
                <strong className="text-sm mt-1">৳১,০০০</strong>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow"
            >
              {isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'ভর্তি সম্পন্ন করুন ও আইডি কার্ড নিন'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
