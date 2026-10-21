import React, { useState } from 'react';
import { JobCircular, JobApplication, User } from '../types';
import { StorageService } from '../services/storage';
import {
  X,
  FileCheck,
  Building,
  Upload,
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

interface JobApplicationModalProps {
  circular: JobCircular;
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (app: JobApplication) => void;
  onOpenAuth: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  circular,
  currentUser,
  isOpen,
  onClose,
  onSuccess,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  // Form fields
  const [applicantName, setApplicantName] = useState(currentUser?.name || '');
  const [applicantNameBn, setApplicantNameBn] = useState(currentUser?.nameBn || '');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2000-01-01');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [nidNumber, setNidNumber] = useState('');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [district, setDistrict] = useState(currentUser?.district || 'ঢাকা');
  const [upazila, setUpazila] = useState('');
  const [educationLevel, setEducationLevel] = useState('Graduation / Degree');
  const [cgpaOrDivision, setCgpaOrDivision] = useState('CGPA 3.20');
  const [passingYear, setPassingYear] = useState('2023');
  const [photoPreview, setPhotoPreview] = useState<string>(
    currentUser?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const totalAmount = circular.govFee + circular.serviceCharge;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!applicantName.trim()) {
      setErrorMsg('আবেদনকারীর পূর্ণ নাম লিখুন');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('মোবাইল নম্বর লিখুন');
      return;
    }
    if (!nidNumber.trim()) {
      setErrorMsg('জাতীয় পরিচয়পত্র (NID) নম্বর দিন');
      return;
    }
    if (!fatherName.trim()) {
      setErrorMsg('পিতার নাম লিখুন');
      return;
    }

    setIsSubmitting(true);

    try {
      const userId = currentUser ? currentUser.id : 'guest_' + Date.now();

      const newApp = StorageService.submitJobApplication({
        userId,
        circularId: circular.id,
        jobTitle: circular.titleBn,
        organization: circular.organizationBn,
        applicantName,
        applicantNameBn: applicantNameBn || applicantName,
        fatherName,
        motherName: motherName || 'Mrs. Mother',
        dateOfBirth,
        gender,
        nidNumber,
        phone,
        email: email || 'applicant@digitalcenter.com',
        district,
        upazila: upazila || 'সদর',
        educationLevel,
        cgpaOrDivision,
        passingYear,
        paymentStatus: 'Paid',
        totalAmount,
        photoUrl: photoPreview,
        remarks: 'আবেদন ডিজিটাল কাউন্টার সিস্টেমে সফলভাবে গৃহীত হয়েছে।',
      });

      setIsSubmitting(false);
      onSuccess(newApp);
    } catch (err) {
      console.error(err);
      setErrorMsg('আবেদন সংরক্ষণে ত্রুটি হয়েছে। পুনরায় চেষ্টা করুন।');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                অনলাইন চাকরির আবেদন ফর্ম
              </h3>
              <p className="text-[11px] text-blue-300">
                {circular.organizationBn} — {circular.titleBn}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Circular Summary Box */}
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">নির্বাচিত পদ:</span>
              <span className="font-bold text-slate-800">{circular.titleBn}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">আবেদনের শেষ সময়:</span>
              <span className="font-bold text-slate-800">{circular.deadline}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">মোট খরচ (ফি+সার্ভিস):</span>
              <span className="font-bold text-blue-700">৳{totalAmount}</span>
            </div>
          </div>

          {/* Photo & Signature Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                পাসপোর্ট সাইজ ছবি (৩০০x৩০০ px)
              </label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-slate-200 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Applicant Photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>ছবি আপলোড</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-slate-500 mt-1">সর্বোচ্চ ১০০ KB (সাদা ব্যাকগ্রাউন্ড)</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                ডিজিটাল স্বাক্ষর (৩০০x৮০ px)
              </label>
              <div className="h-16 rounded-lg bg-white border border-dashed border-slate-300 flex items-center justify-center p-2 text-center">
                <span className="text-xs font-serif italic text-slate-700 font-semibold">
                  {applicantName || 'Applicant Signature'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">কম্পিউটার অটো-সিগনেচার প্রিভিউ</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">
              ১. প্রার্থীর ব্যক্তিগত তথ্য
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  প্রার্থীর নাম (ইংরেজিতে ক্যাপিটাল) *
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value.toUpperCase())}
                  placeholder="MD. TANVIR AHMED"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  প্রার্থীর নাম (বাংলায়)
                </label>
                <input
                  type="text"
                  value={applicantNameBn}
                  onChange={(e) => setApplicantNameBn(e.target.value)}
                  placeholder="মোঃ তানভীর আহমেদ"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  পিতার নাম *
                </label>
                <input
                  type="text"
                  required
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="মোঃ রফিকুল ইসলাম"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  মাতার নাম *
                </label>
                <input
                  type="text"
                  required
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder="নাসরিন আক্তার"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  জন্ম তারিখ *
                </label>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  লিঙ্গ (Gender) *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">পুরুষ (Male)</option>
                  <option value="Female">মহিলা (Female)</option>
                  <option value="Other">অন্যান্য (Other)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  জাতীয় পরিচয়পত্র (NID) নম্বর *
                </label>
                <input
                  type="text"
                  required
                  value={nidNumber}
                  onChange={(e) => setNidNumber(e.target.value)}
                  placeholder="19992612345678901"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  মোবাইল নম্বর (SMS পাঠানোর জন্য) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  নিজ জেলা *
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="যেমন: কুমিল্লা / ঢাকা"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  উপজেলা / থানা *
                </label>
                <input
                  type="text"
                  required
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  placeholder="যেমন: চান্দিনা / মিরপুর"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Educational Qualification */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">
              ২. শিক্ষাগত যোগ্যতা
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  সর্বোচ্চ ডিগ্রি
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SSC / Dakhil">এসএসসি / দাখিল</option>
                  <option value="HSC / Alim">এইচএসসি / আলিম</option>
                  <option value="Diploma in Engg">ডিপ্লোমা ইন ইঞ্জিনিয়ারিং</option>
                  <option value="Graduation / Degree">স্নাতক (পাস) / ডিগ্রি</option>
                  <option value="Honours (4 Years)">স্নাতক (সম্মান)</option>
                  <option value="Masters Degree">স্নাতকোত্তর (মাস্টার্স)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  সিজিপিএ / বিভাগ
                </label>
                <input
                  type="text"
                  value={cgpaOrDivision}
                  onChange={(e) => setCgpaOrDivision(e.target.value)}
                  placeholder="যেমন: CGPA 3.45"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  পাসের সন
                </label>
                <input
                  type="text"
                  value={passingYear}
                  onChange={(e) => setPassingYear(e.target.value)}
                  placeholder="2023"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Payment & Voucher Breakdown */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>সরকারি পরীক্ষার ফি (টেলিটক চালান):</span>
              <span className="font-semibold text-slate-800">৳{circular.govFee}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>ডিজিটাল সেন্টার সার্ভিস চার্জ (ছবি-স্বাক্ষর রিসাইজ ও প্রিন্ট কপি):</span>
              <span className="font-semibold text-slate-800">৳{circular.serviceCharge}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-300">
              <span>সর্বমোট পরিশোধযোগ্য:</span>
              <span className="text-blue-700">৳{totalAmount}</span>
            </div>
            <p className="text-[11px] text-slate-500 italic pt-1">
              * আবেদন সাবমিট করার সাথে সাথেই একটি অফিসিয়াল ডিজিটাল আবেদন কপি (Admit Slip) তৈরি হবে যা আপনি প্রিন্ট বা PDF ডাউনলোড করতে পারবেন।
            </p>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              বাতিল
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'আবেদন নিশ্চিত করুন ও স্লিপ তৈরি করুন'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
