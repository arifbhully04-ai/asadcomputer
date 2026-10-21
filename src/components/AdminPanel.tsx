import React, { useState, useEffect } from 'react';
import {
  User,
  JobApplication,
  CourseEnrollment,
  JobCircular,
  ApplicationStatus,
  EnrollmentStatus,
  Course
} from '../types';
import { StorageService } from '../services/storage';
import {
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Users,
  Coins,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Eye,
  X,
  FileText,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Printer,
  ArrowLeft,
  User as UserIcon,
  MessageSquare,
  CreditCard,
  Check,
  Receipt,
  UserPlus,
  Download
} from 'lucide-react';

interface AdminPanelProps {
  currentUser: User;
  applications: JobApplication[];
  enrollments: CourseEnrollment[];
  circulars: JobCircular[];
  courses?: Course[];
  onClose: () => void;
  onRefreshData: () => void;
  onViewApplicationSlip: (app: JobApplication) => void;
  onViewStudentIdCard?: (enrollment: CourseEnrollment) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  applications,
  enrollments,
  circulars,
  courses = [],
  onClose,
  onRefreshData,
  onViewApplicationSlip,
  onViewStudentIdCard,
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'circulars' | 'students'>('applications');
  
  // Applications tab states
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [inspectingApp, setInspectingApp] = useState<JobApplication | null>(null);
  const [customRemarks, setCustomRemarks] = useState<string>('');

  // Students tab states
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [studentStatusFilter, setStudentStatusFilter] = useState<string>('All');
  const [inspectingStudent, setInspectingStudent] = useState<CourseEnrollment | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [depositNote, setDepositNote] = useState<string>('২য় কিস্তির টাকা জমা');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  // New Student Walk-in Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentCourseId, setNewStudentCourseId] = useState(courses[0]?.id || 'course_basic_office');
  const [newStudentBatch, setNewStudentBatch] = useState('শনি, সোম, বুধ (বিকাল ৪টা - ৫:৩০টা)');
  const [newStudentPaid, setNewStudentPaid] = useState<number>(1000);

  // Add Circular Form State
  const [showAddCircularModal, setShowAddCircularModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleBn, setNewTitleBn] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newOrgBn, setNewOrgBn] = useState('');
  const [newCategory, setNewCategory] = useState<'Govt' | 'Bank' | 'Private' | 'Defense'>('Govt');
  const [newVacancies, setNewVacancies] = useState<number>(50);
  const [newDeadline, setNewDeadline] = useState('2026-12-15');
  const [newGovFee, setNewGovFee] = useState<number>(200);
  const [newServiceCharge, setNewServiceCharge] = useState<number>(100);
  const [newEduReq, setNewEduReq] = useState('স্নাতক অথবা সমমানের ডিগ্রি।');

  // Stats
  const totalRevenue =
    applications.reduce((sum, a) => sum + (a.paymentStatus === 'Paid' ? a.totalAmount : 0), 0) +
    enrollments.reduce((sum, e) => sum + (e.amountPaid || 0), 0);

  const pendingApplications = applications.filter((a) => a.status === 'Pending').length;

  // Handlers for Applications
  const handleStatusChange = (appId: string, newStatus: ApplicationStatus, remarks?: string) => {
    StorageService.updateApplicationStatus(
      appId,
      newStatus,
      remarks || `আপডেট করেছেন এডমিন (${currentUser.name})`
    );
    onRefreshData();

    if (inspectingApp && inspectingApp.id === appId) {
      setInspectingApp({
        ...inspectingApp,
        status: newStatus,
        remarks: remarks || inspectingApp.remarks,
      });
    }
  };

  // Handlers for Students / Enrollments
  const handleStudentStatusChange = (enrollmentId: string, newStatus: EnrollmentStatus) => {
    StorageService.updateEnrollmentStatus(enrollmentId, newStatus);
    onRefreshData();

    if (inspectingStudent && inspectingStudent.id === enrollmentId) {
      setInspectingStudent({
        ...inspectingStudent,
        status: newStatus,
      });
    }
  };

  const handleDepositPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectingStudent) return;
    const amount = Number(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('সঠিক টাকার অংক লিখুন');
      return;
    }

    const updated = StorageService.recordEnrollmentPayment(
      inspectingStudent.id,
      amount,
      depositNote || 'কাউন্টার কিস্তি জমা'
    );

    if (updated) {
      setInspectingStudent(updated);
      setDepositAmount('');
      setDepositNote('পরবর্তী কিস্তির জমা');
      onRefreshData();
      alert(`৳${amount} টাকা সফলভাবে জমা হয়েছে! রসিদ হালনাগাদ করা হয়েছে।`);
    }
  };

  const handleDeleteStudent = (enrollmentId: string, studentName: string) => {
    if (window.confirm(`আপনি কি শিক্ষার্থী "${studentName}" এর ভর্তি রেকর্ড ও তথ্য সম্পূর্ণ মুছে ফেলতে চান?`)) {
      StorageService.deleteEnrollment(enrollmentId);
      if (inspectingStudent?.id === enrollmentId) {
        setInspectingStudent(null);
      }
      onRefreshData();
      alert('শিক্ষার্থীর তথ্য সফলভাবে মুছে ফেলা হয়েছে।');
    }
  };

  const handleDeleteApplication = (appId: string, applicantName: string) => {
    if (window.confirm(`আপনি কি আবেদনকারী "${applicantName}" এর চাকরির আবেদন সম্পূর্ণ মুছে ফেলতে চান?`)) {
      StorageService.deleteApplication(appId);
      if (inspectingApp?.id === appId) {
        setInspectingApp(null);
      }
      onRefreshData();
      alert('আবেদনটি সফলভাবে মুছে ফেলা হয়েছে।');
    }
  };

  const handleAddWalkinStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentPhone.trim()) {
      alert('শিক্ষার্থীর নাম ও ফোন নম্বর পূরণ করুন');
      return;
    }

    const selectedCourse = courses.find((c) => c.id === newStudentCourseId) || {
      id: 'course_custom',
      titleBn: 'কম্পিউটার অফিস অ্যাপ্লিকেশন',
      fee: 3500,
    };

    StorageService.addEnrollmentByAdmin({
      studentName: newStudentName,
      studentPhone: newStudentPhone,
      studentEmail: newStudentEmail || 'student@asadcomputer.com',
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.titleBn,
      totalFee: selectedCourse.fee,
      amountPaid: Number(newStudentPaid) || 1000,
      batchSchedule: newStudentBatch,
    });

    setShowAddStudentModal(false);
    setNewStudentName('');
    setNewStudentPhone('');
    setNewStudentEmail('');
    onRefreshData();
    alert('শিক্ষার্থী সফলভাবে ভর্তি করা হয়েছে ও রোল তৈরি হয়েছে!');
  };

  // Handlers for Circulars
  const handleAddCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleBn.trim() || !newOrgBn.trim()) return;

    StorageService.addCircular({
      title: newTitle || newTitleBn,
      titleBn: newTitleBn,
      organization: newOrg || newOrgBn,
      organizationBn: newOrgBn,
      category: newCategory,
      vacancies: Number(newVacancies),
      deadline: newDeadline,
      govFee: Number(newGovFee),
      serviceCharge: Number(newServiceCharge),
      educationReq: newEduReq,
      ageLimit: '১৮ হতে ৩০ বছর',
      details: 'অফিসিয়াল সার্কুলার অনুযায়ী আবেদন গ্রহণ করা হচ্ছে।',
      isHot: true,
    });

    setShowAddCircularModal(false);
    onRefreshData();
  };

  const handleDeleteCircular = (id: string) => {
    if (window.confirm('আপনি কি এই চাকরির বিজ্ঞপ্তিটি মুছে ফেলতে চান?')) {
      StorageService.deleteCircular(id);
      onRefreshData();
    }
  };

  // Filtered Applications
  const filteredApplications = applications.filter((app) => {
    const matchStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchSearch =
      !searchFilter ||
      app.applicantName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.phone.includes(searchFilter);
    return matchStatus && matchSearch;
  });

  // Filtered Students
  const filteredStudents = enrollments.filter((enr) => {
    const matchStatus = studentStatusFilter === 'All' || enr.status === studentStatusFilter;
    const query = studentSearch.toLowerCase().trim();
    const matchSearch =
      !query ||
      enr.studentName.toLowerCase().includes(query) ||
      enr.studentIdCardNumber.toLowerCase().includes(query) ||
      enr.studentPhone.includes(query) ||
      enr.courseTitle.toLowerCase().includes(query);
    return matchStatus && matchSearch;
  });

  // Escape key handler for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (inspectingApp) setInspectingApp(null);
        if (inspectingStudent) setInspectingStudent(null);
        if (showAddStudentModal) setShowAddStudentModal(false);
        if (showAddCircularModal) setShowAddCircularModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectingApp, inspectingStudent, showAddStudentModal, showAddCircularModal]);

  return (
    <div className="py-8 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  এডমিন কন্ট্রোল সেন্টার
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  ম্যানেজার ড্যাশবোর্ড
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                আসাদ কম্পিউটার — ভূল্লী ডিজিটাল পোস্ট অফিস, ঠাকুরগাঁও
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/asad-computer-project.zip"
              download="asad-computer-project.zip"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              title="সম্পূর্ণ প্রজেক্টের কোড জিপ (ZIP) আকারে ডাউনলোড করুন"
            >
              <Download className="w-4 h-4" />
              <span>গিটহাব কোড (ZIP) ডাউনলোড</span>
            </a>

            <button
              onClick={() => setShowAddStudentModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
            >
              <UserPlus className="w-4 h-4" />
              <span>নতুন শিক্ষার্থী ভর্তি</span>
            </button>

            <button
              onClick={() => setShowAddCircularModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন সার্কুলার</span>
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরুন</span>
            </button>
          </div>
        </div>

        {/* GitHub / Project Code Ready Alert Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                গিটহাবে আপলোড করার জন্য প্রজেক্টের সব ফাইল প্রস্তুত!
              </h4>
              <p className="text-xs text-slate-300">
                আপনি সরাসরি <strong className="text-indigo-400">"কোড ডাউনলোড (ZIP)"</strong> বাটনে ক্লিক করে জিপ ফাইলটি আপনার কম্পিউটারে সেভ করতে পারেন এবং গিটহাবে আপলোড করতে পারেন।
              </p>
            </div>
          </div>
          <a
            href="/asad-computer-project.zip"
            download="asad-computer-project.zip"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>সরাসরি জিপ (ZIP) ডাউনলোড করুন (7.6 MB)</span>
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-400" />
              মোট চাকরির আবেদন
            </span>
            <div className="text-2xl font-bold text-white tabular-nums">
              {applications.length} টি
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              ভর্তিকৃত শিক্ষার্থী
            </span>
            <div className="text-2xl font-bold text-emerald-400 tabular-nums">
              {enrollments.length} জন
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              পেন্ডিং প্রসেসিং আবেদন
            </span>
            <div className="text-2xl font-bold text-amber-400 tabular-nums">
              {pendingApplications} টি
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-teal-400" />
              সংগৃহীত ফি ও রেভিনিউ
            </span>
            <div className="text-2xl font-bold text-teal-400 tabular-nums">
              ৳{totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-1">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'students'
                ? 'bg-slate-800 text-emerald-400 border-t-2 border-emerald-500 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            শিক্ষার্থীদের তথ্য ও ফি ব্যবস্থাপনা ({enrollments.length})
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'bg-slate-800 text-blue-400 border-t-2 border-blue-500 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4 text-blue-400" />
            চাকরির আবেদনসমূহ ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab('circulars')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === 'circulars'
                ? 'bg-slate-800 text-blue-400 border-t-2 border-blue-500 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            সার্কুলার ম্যানেজমেন্ট ({circulars.length})
          </button>
        </div>

        {/* ================= TAB 1: STUDENTS MANAGEMENT ================= */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            
            {/* Filter and Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-300">স্ট্যাটাস:</span>
                <select
                  value={studentStatusFilter}
                  onChange={(e) => setStudentStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg text-xs px-2.5 py-1.5 text-slate-200 focus:outline-none"
                >
                  <option value="All">সকল শিক্ষার্থী</option>
                  <option value="Ongoing">চলমান (Ongoing)</option>
                  <option value="Enrolled">ভর্তিকৃত (Enrolled)</option>
                  <option value="Pending">অপেক্ষমান (Pending)</option>
                  <option value="Completed">কোর্স সম্পন্ন (Completed)</option>
                  <option value="Cancelled">বাতিল (Cancelled)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="নাম, রোল নং বা ফোন খুঁজুন..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>নতুন ভর্তি</span>
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-x-auto shadow-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-700">
                  <tr>
                    <th className="p-3">রোল আইডি</th>
                    <th className="p-3">শিক্ষার্থীর নাম</th>
                    <th className="p-3">কোর্স</th>
                    <th className="p-3">মোবাইল</th>
                    <th className="p-3">ফি ও বকেয়া (Due)</th>
                    <th className="p-3">স্ট্যাটাস</th>
                    <th className="p-3">এক্সেপ্ট / অনুমোদন</th>
                    <th className="p-3 text-right">ম্যানেজমেন্ট অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((enr) => {
                      const due = Math.max(0, enr.totalFee - enr.amountPaid);

                      return (
                        <tr key={enr.id} className="hover:bg-slate-700/40 transition-colors">
                          <td className="p-3 font-mono font-bold text-emerald-400">
                            {enr.studentIdCardNumber}
                          </td>
                          <td className="p-3 font-semibold text-white">
                            {enr.studentName}
                          </td>
                          <td className="p-3">
                            <div className="text-slate-200 font-medium">{enr.courseTitle}</div>
                            <div className="text-[10px] text-slate-400">{enr.batchSchedule}</div>
                          </td>
                          <td className="p-3 font-mono text-slate-300">
                            {enr.studentPhone}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 font-semibold text-emerald-400">
                              <span>জমা: ৳{enr.amountPaid}</span>
                            </div>
                            {due > 0 ? (
                              <div className="text-[11px] font-bold text-amber-400">
                                বকেয়া: ৳{due}
                              </div>
                            ) : (
                              <div className="text-[11px] font-bold text-teal-300">
                                সম্পূর্ণ পরিশোধিত
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                              enr.status === 'Ongoing'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : enr.status === 'Completed'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : enr.status === 'Cancelled'
                                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {enr.status === 'Ongoing'
                                ? 'চলমান ব্যাচ'
                                : enr.status === 'Completed'
                                ? 'সম্পন্ন'
                                : enr.status === 'Pending'
                                ? 'অপেক্ষমান'
                                : enr.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col gap-1.5">
                              {/* 1-Click Accept / Approve Button */}
                              {(enr.status === 'Pending' || enr.status === 'Enrolled') && (
                                <button
                                  onClick={() => {
                                    handleStudentStatusChange(enr.id, 'Ongoing');
                                    alert(`শিক্ষার্থী "${enr.studentName}"-এর ভর্তি সফলভাবে এক্সেপ্ট/অনুমোদন করা হয়েছে!`);
                                  }}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1 shadow-md transition-all active:scale-95"
                                  title="ভর্তি সাথে সাথে এক্সেপ্ট ও অনুমোদন করুন"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  <span>এক্সেপ্ট (অনুমোদন)</span>
                                </button>
                              )}

                              <select
                                value={enr.status}
                                onChange={(e) => {
                                  handleStudentStatusChange(enr.id, e.target.value as EnrollmentStatus);
                                  alert(`স্ট্যাটাস পরিবর্তন করে "${e.target.value}" করা হয়েছে।`);
                                }}
                                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none"
                              >
                                <option value="Pending">Pending (অপেক্ষমান)</option>
                                <option value="Ongoing">Ongoing (চলমান ব্যাচ)</option>
                                <option value="Completed">Completed (কোর্স সম্পন্ন)</option>
                                <option value="Cancelled">Cancelled (বাতিল)</option>
                              </select>
                            </div>
                          </td>
                          <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setInspectingStudent(enr);
                                setDepositAmount('');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all text-[11px] font-bold inline-flex items-center gap-1 shadow-sm"
                              title="টাকা জমার এন্ট্রি দিন"
                            >
                              <Coins className="w-3.5 h-3.5" />
                              <span>টাকা জমা</span>
                            </button>

                            <button
                              onClick={() => {
                                setInspectingStudent(enr);
                                setDepositAmount('');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 transition-all text-[11px] font-bold inline-flex items-center gap-1"
                              title="শিক্ষার্থীর বিস্তারিত তথ্য ভিউ করুন"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>তথ্য ভিউ</span>
                            </button>

                            {onViewStudentIdCard && (
                              <button
                                onClick={() => onViewStudentIdCard(enr)}
                                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white transition-colors"
                                title="ডিজিটাল স্টুডেন্ট আইডি কার্ড প্রিন্ট"
                              >
                                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteStudent(enr.id, enr.studentName)}
                              className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 transition-colors"
                              title="শিক্ষার্থীর ভর্তি ও তথ্য মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ================= TAB 2: APPLICATIONS MANAGEMENT ================= */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-300">স্ট্যাটাস:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg text-xs px-2.5 py-1.5 text-slate-200 focus:outline-none"
                >
                  <option value="All">সকল স্ট্যাটাস</option>
                  <option value="Pending">Pending (অপেক্ষমান)</option>
                  <option value="Processing">Processing (চলমান)</option>
                  <option value="Completed">Completed (সম্পন্ন)</option>
                  <option value="Rejected">Rejected (বাতিল)</option>
                </select>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="নাম বা আইডি খুঁজুন..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-x-auto shadow-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-700">
                  <tr>
                    <th className="p-3">Application ID</th>
                    <th className="p-3">প্রার্থীর নাম</th>
                    <th className="p-3">পদ ও প্রতিষ্ঠান</th>
                    <th className="p-3">মোবাইল</th>
                    <th className="p-3">তারিখ</th>
                    <th className="p-3">ফি</th>
                    <th className="p-3">স্ট্যাটাস পরিবর্তন</th>
                    <th className="p-3 text-right">বিস্তারিত ও অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-700/40 transition-colors"
                    >
                      <td className="p-3 font-mono font-bold text-blue-400">
                        {app.applicationId}
                      </td>
                      <td className="p-3 font-semibold text-white">
                        {app.applicantName}
                      </td>
                      <td className="p-3">
                        <div className="text-slate-200 font-medium">{app.jobTitle}</div>
                        <div className="text-[10px] text-slate-400">{app.organization}</div>
                      </td>
                      <td className="p-3 font-mono text-slate-300">
                        {app.phone}
                      </td>
                      <td className="p-3 text-slate-400 tabular-nums">
                        {app.appliedDate}
                      </td>
                      <td className="p-3 font-semibold text-emerald-400">
                        ৳{app.totalAmount}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1">
                          {app.status === 'Pending' && (
                            <button
                              onClick={() => {
                                handleStatusChange(app.id, 'Processing');
                                alert(`আবেদন #${app.applicationId} প্রসেসিং এ নেওয়া হয়েছে।`);
                              }}
                              className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shadow-sm"
                            >
                              ⚙️ প্রসেসিং শুরু
                            </button>
                          )}
                          {app.status === 'Processing' && (
                            <button
                              onClick={() => {
                                handleStatusChange(app.id, 'Completed');
                                alert(`আবেদন #${app.applicationId} সম্পন্ন (Completed) করা হয়েছে!`);
                              }}
                              className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold shadow-sm"
                            >
                              ✅ সম্পন্ন করুন
                            </button>
                          )}
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleStatusChange(app.id, e.target.value as ApplicationStatus)
                            }
                            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] font-semibold text-slate-200 focus:outline-none"
                          >
                            <option value="Pending">Pending (অপেক্ষমান)</option>
                            <option value="Processing">Processing (চলমান)</option>
                            <option value="Completed">Completed (সম্পন্ন)</option>
                            <option value="Rejected">Rejected (বাতিল)</option>
                          </select>
                        </div>
                      </td>
                      <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setInspectingApp(app);
                            setCustomRemarks(app.remarks || '');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors text-[11px] font-bold inline-flex items-center gap-1 border border-blue-500/30"
                          title="প্রার্থীর বিস্তারিত তথ্য ও প্রসেসিং"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>তথ্য দেখুন</span>
                        </button>

                        <button
                          onClick={() => onViewApplicationSlip(app)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white transition-colors text-[11px] font-semibold inline-flex items-center gap-1"
                          title="আবেদন কপি প্রিন্ট"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>স্লিপ</span>
                        </button>

                        <button
                          onClick={() => handleDeleteApplication(app.id, app.applicantName)}
                          className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 transition-colors"
                          title="আবেদন মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CIRCULARS MANAGEMENT ================= */}
        {activeTab === 'circulars' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-white">পোস্টকৃত সকল চাকরির সার্কুলার</h3>
              <button
                onClick={() => setShowAddCircularModal(true)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                নতুন সার্কুলার যোগ করুন
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {circulars.map((circ) => (
                <div
                  key={circ.id}
                  className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                        {circ.category}
                      </span>
                      <span className="text-xs text-slate-400">শেষ: {circ.deadline}</span>
                    </div>

                    <h4 className="font-bold text-sm text-white">{circ.titleBn}</h4>
                    <p className="text-xs text-slate-400">{circ.organizationBn}</p>
                    <p className="text-xs text-slate-300">পদসংখ্যা: {circ.vacancies} টি</p>
                  </div>

                  <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-xs">
                    <span className="text-emerald-400">মোট ফি: ৳{circ.govFee + circ.serviceCharge}</span>
                    <button
                      onClick={() => handleDeleteCircular(circ.id)}
                      className="p-1 text-slate-400 hover:text-red-400"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ================= MODAL: STUDENT DETAILS & PAYMENT ENTRY (টাকা জমা ও স্ট্যাটাস) ================= */}
      {inspectingStudent && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setInspectingStudent(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto cursor-pointer"
        >
          {/* Universal Floating Exit Button (Always accessible on screen!) */}
          <button
            onClick={() => setInspectingStudent(null)}
            className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[999] px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-2xl flex items-center gap-2 border-2 border-white/60 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            title="বের হয়ে ড্যাশবোর্ডে ফিরে যান (Esc)"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
            <span>বের হয়ে যান (Exit / Close)</span>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-6 cursor-default flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 px-4 sm:px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    শিক্ষার্থীর তথ্য, ভর্তি অনুমোদন ও টাকা জমার এন্ট্রি
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    রোল আইডি: {inspectingStudent.studentIdCardNumber}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setInspectingStudent(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white border border-red-400 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                title="বন্ধ করুন (Esc)"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>বন্ধ করুন (Close)</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              
              {/* Profile Card */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="w-20 h-20 rounded-full border-2 border-emerald-500 overflow-hidden bg-slate-700 shrink-0 flex items-center justify-center">
                  {inspectingStudent.photoUrl ? (
                    <img
                      src={inspectingStudent.photoUrl}
                      alt={inspectingStudent.studentName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <h4 className="text-lg font-bold text-white">
                    {inspectingStudent.studentName}
                  </h4>
                  <p className="text-emerald-400 font-semibold text-xs">
                    কোর্স: {inspectingStudent.courseTitle}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    ব্যাচ: {inspectingStudent.batchSchedule} · ভর্তি তারিখ: {inspectingStudent.enrolledDate}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 font-mono text-slate-300">
                    <a
                      href={`tel:${inspectingStudent.studentPhone}`}
                      className="flex items-center gap-1 text-emerald-400 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {inspectingStudent.studentPhone}
                    </a>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                      {inspectingStudent.studentEmail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Approval Section (এক্সেপ্ট/অনুমোদন) */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-0.5">ভর্তি ও ক্লাস স্ট্যাটাস:</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    inspectingStudent.status === 'Ongoing'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : inspectingStudent.status === 'Completed'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : inspectingStudent.status === 'Cancelled'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {inspectingStudent.status}
                  </span>
                </div>

                {/* 1-Click Status Controls */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => {
                      handleStudentStatusChange(inspectingStudent.id, 'Ongoing');
                      alert(`শিক্ষার্থী "${inspectingStudent.studentName}"-এর ভর্তি এক্সেপ্ট/অনুমোদন করা হয়েছে ও ব্যাচ চলমান হয়েছে!`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow ${
                      inspectingStudent.status === 'Ongoing'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-700/60 hover:bg-emerald-600 text-emerald-100'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>এক্সেপ্ট (অনুমোদন)</span>
                  </button>

                  <button
                    onClick={() => {
                      handleStudentStatusChange(inspectingStudent.id, 'Completed');
                      alert(`শিক্ষার্থী "${inspectingStudent.studentName}"-এর কোর্স সম্পন্ন (Completed) হিসেবে চিহ্নিত হয়েছে!`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      inspectingStudent.status === 'Completed'
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    }`}
                  >
                    🎓 কোর্স সম্পন্ন
                  </button>

                  <button
                    onClick={() => {
                      handleStudentStatusChange(inspectingStudent.id, 'Cancelled');
                      alert(`শিক্ষার্থীর ভর্তি বাতিল করা হয়েছে।`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      inspectingStudent.status === 'Cancelled'
                        ? 'bg-red-600 text-white shadow'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    }`}
                  >
                    বাতিল
                  </button>
                </div>
              </div>

              {/* Fee Breakdown Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">মোট কোর্স ফি</span>
                  <div className="text-xl font-bold text-white tabular-nums">
                    ৳{inspectingStudent.totalFee.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">মোট পরিশোধিত টাকা</span>
                  <div className="text-xl font-bold text-emerald-400 tabular-nums">
                    ৳{inspectingStudent.amountPaid.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">অবশিষ্ট বকেয়া (Due)</span>
                  <div className={`text-xl font-bold tabular-nums ${
                    inspectingStudent.totalFee - inspectingStudent.amountPaid > 0
                      ? 'text-amber-400'
                      : 'text-teal-400'
                  }`}>
                    ৳{Math.max(0, inspectingStudent.totalFee - inspectingStudent.amountPaid).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* NEW FEE DEPOSIT ENTRY FORM (টাকা জমার এন্ট্রি) */}
              <div className="p-4 rounded-xl bg-slate-800/90 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                      টাকা জমার নতুন এন্ট্রি (Enter Payment / Fee Deposit)
                    </h4>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    বকেয়া: ৳{Math.max(0, inspectingStudent.totalFee - inspectingStudent.amountPaid)}
                  </span>
                </div>

                {/* Quick Presets */}
                {Math.max(0, inspectingStudent.totalFee - inspectingStudent.amountPaid) > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                    <span className="text-[11px] text-slate-400">দ্রুত নির্বাচন:</span>
                    <button
                      type="button"
                      onClick={() => setDepositAmount(String(Math.max(0, inspectingStudent.totalFee - inspectingStudent.amountPaid)))}
                      className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-[11px] font-bold transition-colors"
                    >
                      বকেয়া সম্পূর্ণ পরিশোধ (৳{Math.max(0, inspectingStudent.totalFee - inspectingStudent.amountPaid)})
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepositAmount('1000')}
                      className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] font-mono font-bold"
                    >
                      +৳১,০০০
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepositAmount('500')}
                      className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] font-mono font-bold"
                    >
                      +৳৫০০
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepositAmount('2000')}
                      className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] font-mono font-bold"
                    >
                      +৳২,০০০
                    </button>
                  </div>
                )}

                <form onSubmit={handleDepositPayment} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">
                      জমার পরিমাণ (৳) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={Math.max(1, inspectingStudent.totalFee - inspectingStudent.amountPaid)}
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder={`বকেয়া: ৳${Math.max(0, inspectingStudent.totalFee - inspectingStudent.amountPaid)}`}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono font-bold text-xs focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">
                      মন্তব্য / রসিদ নোট
                    </label>
                    <input
                      type="text"
                      value={depositNote}
                      onChange={(e) => setDepositNote(e.target.value)}
                      placeholder="যেমন: ২য় কিস্তি জমা"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow flex items-center justify-center gap-1.5"
                    >
                      <Coins className="w-4 h-4" />
                      <span>টাকা জমা নিশ্চিত করুন</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Payment History / Receipts */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  জমা হওয়া কিস্তিসমূহ ও মানি রসিদ হিস্ট্রি:
                </span>
                
                <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/40 divide-y divide-slate-700/60">
                  {inspectingStudent.paymentHistory && inspectingStudent.paymentHistory.length > 0 ? (
                    inspectingStudent.paymentHistory.map((receipt, idx) => (
                      <div key={idx} className="p-3 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono font-bold text-blue-400">{receipt.receiptNo}</span>
                          <span className="text-slate-400 ml-2">({receipt.date})</span>
                          <p className="text-[11px] text-slate-300 mt-0.5">{receipt.note}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-emerald-400 font-mono text-sm">
                            +৳{receipt.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-slate-400 text-xs">
                      প্রাথমিক জমা: ৳{inspectingStudent.amountPaid} (ভর্তিকালীন রশিদ)
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="sticky bottom-0 z-20 px-4 sm:px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setInspectingStudent(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer shadow"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>তালিকায় ফিরে যান (Back to List)</span>
              </button>

              <div className="flex items-center gap-2">
                {onViewStudentIdCard && (
                  <button
                    onClick={() => {
                      const student = inspectingStudent;
                      setInspectingStudent(null);
                      onViewStudentIdCard(student);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-all cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>স্টুডেন্ট আইডি কার্ড প্রিন্ট</span>
                  </button>
                )}

                <button
                  onClick={() => handleDeleteStudent(inspectingStudent.id, inspectingStudent.studentName)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold transition-colors cursor-pointer"
                  title="শিক্ষার্থী তথ্য সম্পূর্ণ মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>ডিলিট (Delete)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL: ADD WALK-IN STUDENT (নতুন শিক্ষার্থী সরাসরি ভর্তি) ================= */}
      {showAddStudentModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddStudentModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 p-6 space-y-4 cursor-default"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">নতুন শিক্ষার্থী সরাসরি ভর্তি ফর্ম</h3>
              </div>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWalkinStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">শিক্ষার্থীর পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="যেমন: মোঃ শাকিল ইসলাম"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={newStudentPhone}
                    onChange={(e) => setNewStudentPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">কোর্স নির্বাচন *</label>
                <select
                  value={newStudentCourseId}
                  onChange={(e) => setNewStudentCourseId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-medium"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.titleBn} (ফি: ৳{c.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">ব্যাচ সময়সূচী</label>
                <input
                  type="text"
                  value={newStudentBatch}
                  onChange={(e) => setNewStudentBatch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">ভর্তিকালীন প্রাথমিক জমা (৳)</label>
                <input
                  type="number"
                  required
                  min={500}
                  value={newStudentPaid}
                  onChange={(e) => setNewStudentPaid(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono font-bold"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  ভর্তি সম্পন্ন করুন ও রোল তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: APPLICANT DETAILS INSPECTOR ================= */}
      {inspectingApp && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setInspectingApp(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto cursor-pointer"
        >
          {/* Universal Floating Exit Button (Always accessible in any viewport / iframe zoom!) */}
          <button
            onClick={() => setInspectingApp(null)}
            className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[999] px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-2xl flex items-center gap-2 border-2 border-white/60 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            title="বের হয়ে ড্যাশবোর্ডে ফিরে যান (Esc)"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
            <span>বের হয়ে যান (Exit / Close)</span>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-6 cursor-default flex flex-col max-h-[90vh]"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 px-4 sm:px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    প্রার্থীর আবেদন ও প্রসেসিং বিবরণ
                  </h3>
                  <span className="text-xs font-mono text-blue-400">
                    ID: {inspectingApp.applicationId}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setInspectingApp(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white border border-red-400 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                title="বন্ধ করুন (Esc)"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>বন্ধ করুন (Close)</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[11px]">বর্তমান স্ট্যাটাস:</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    inspectingApp.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : inspectingApp.status === 'Processing'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : inspectingApp.status === 'Rejected'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {inspectingApp.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => {
                      handleStatusChange(inspectingApp.id, 'Processing');
                      alert('আবেদনটি Processing স্ট্যাটাসে নেওয়া হয়েছে।');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                      inspectingApp.status === 'Processing'
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    }`}
                  >
                    ⚙️ Processing
                  </button>

                  <button
                    onClick={() => {
                      handleStatusChange(inspectingApp.id, 'Completed');
                      alert('আবেদনটি Completed (সম্পন্ন) করা হয়েছে!');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                      inspectingApp.status === 'Completed'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    }`}
                  >
                    ✅ Completed
                  </button>

                  <button
                    onClick={() => {
                      handleStatusChange(inspectingApp.id, 'Rejected');
                      alert('আবেদনটি Reject করা হয়েছে।');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                      inspectingApp.status === 'Rejected'
                        ? 'bg-red-600 text-white shadow'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    }`}
                  >
                    ❌ Reject
                  </button>

                  <button
                    onClick={() => {
                      handleStatusChange(inspectingApp.id, inspectingApp.status, customRemarks);
                      setInspectingApp(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow"
                    title="সেভ করে তালিকায় ফিরে যান"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>সেভ ও প্রস্থান</span>
                  </button>
                </div>
              </div>

              {/* Identity */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="w-24 h-28 rounded-lg bg-slate-700 border border-slate-600 overflow-hidden shrink-0 flex items-center justify-center">
                  {inspectingApp.photoUrl ? (
                    <img
                      src={inspectingApp.photoUrl}
                      alt={inspectingApp.applicantName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <h4 className="text-base font-bold text-white">
                    {inspectingApp.applicantName} ({inspectingApp.applicantNameBn})
                  </h4>
                  <p className="text-slate-300 font-semibold text-xs">
                    পদ: {inspectingApp.jobTitle}
                  </p>
                  <p className="text-slate-400 text-xs">
                    প্রতিষ্ঠান: {inspectingApp.organization}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-slate-300">
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      {inspectingApp.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {inspectingApp.upazila}, {inspectingApp.district}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/40">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-700/60">
                    <tr>
                      <td className="p-3 text-slate-400 font-medium w-1/3">পিতার নাম</td>
                      <td className="p-3 text-white font-semibold">{inspectingApp.fatherName}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">মাতার নাম</td>
                      <td className="p-3 text-white">{inspectingApp.motherName}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">জন্ম তারিখ ও লিঙ্গ</td>
                      <td className="p-3 text-white">{inspectingApp.dateOfBirth} ({inspectingApp.gender})</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">জাতীয় পরিচয়পত্র (NID)</td>
                      <td className="p-3 text-white font-mono font-semibold">{inspectingApp.nidNumber}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">শিক্ষাগত যোগ্যতা</td>
                      <td className="p-3 text-white">
                        {inspectingApp.educationLevel} ({inspectingApp.cgpaOrDivision}, Passing: {inspectingApp.passingYear})
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">আবেদনের তারিখ ও ফি</td>
                      <td className="p-3 text-white">
                        {inspectingApp.appliedDate} · <strong className="text-emerald-400">৳{inspectingApp.totalAmount} (পরিশোধিত)</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Remarks */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-semibold text-xs">
                  এডমিন নোট / ট্র্যাকিং মেসেজ (Remarks):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customRemarks}
                    onChange={(e) => setCustomRemarks(e.target.value)}
                    placeholder="যেমন: টেলিটক আবেদন কোড পাওয়া গেছে, এডমিট রেডি..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                  />
                  <button
                    onClick={() => {
                      handleStatusChange(inspectingApp.id, inspectingApp.status, customRemarks);
                      alert('নোট সফলভাবে সংরক্ষিত হয়েছে!');
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs whitespace-nowrap"
                  >
                    নোট সেভ করুন
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="sticky bottom-0 z-20 px-4 sm:px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setInspectingApp(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer shadow"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>তালিকায় ফিরে যান (Back to List)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteApplication(inspectingApp.id, inspectingApp.applicantName)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold transition-colors cursor-pointer"
                  title="আবেদন সম্পূর্ণ মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>আবেদন মুছুন</span>
                </button>

                <button
                  onClick={() => {
                    const app = inspectingApp;
                    setInspectingApp(null);
                    onViewApplicationSlip(app);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>আবেদন কপি প্রিন্ট</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD NEW JOB CIRCULAR ================= */}
      {showAddCircularModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddCircularModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 p-6 space-y-4 cursor-default"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">নতুন চাকরির নিয়োগ বিজ্ঞপ্তি পোস্ট</h3>
              <button
                onClick={() => setShowAddCircularModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCircular} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">পদের নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  value={newTitleBn}
                  onChange={(e) => setNewTitleBn(e.target.value)}
                  placeholder="যেমন: সহকারী পরিচালক (প্রশাসন)"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">প্রতিষ্ঠানের নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  value={newOrgBn}
                  onChange={(e) => setNewOrgBn(e.target.value)}
                  placeholder="যেমন: বাংলাদেশ পল্লী বিদ্যুতায়ন বোর্ড"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">ক্যাটাগরি</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="Govt">সরকারি</option>
                    <option value="Bank">ব্যাংক</option>
                    <option value="Defense">ডিফেন্স</option>
                    <option value="Private">বেসরকারি</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">পদসংখ্যা</label>
                  <input
                    type="number"
                    value={newVacancies}
                    onChange={(e) => setNewVacancies(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">শেষ তারিখ</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">সরকারি ফি (৳)</label>
                  <input
                    type="number"
                    value={newGovFee}
                    onChange={(e) => setNewGovFee(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">সার্ভিস ফি (৳)</label>
                  <input
                    type="number"
                    value={newServiceCharge}
                    onChange={(e) => setNewServiceCharge(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">শিক্ষাগত যোগ্যতা</label>
                <input
                  type="text"
                  value={newEduReq}
                  onChange={(e) => setNewEduReq(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCircularModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  সার্কুলার প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
