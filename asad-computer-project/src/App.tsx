import React, { useState, useEffect } from 'react';
import {
  User,
  JobCircular,
  JobApplication,
  Course,
  CourseEnrollment,
  Notice
} from './types';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { NoticeTicker } from './components/NoticeTicker';
import { ContactFooter } from './components/ContactFooter';

// Pages
import { HomePage } from './pages/HomePage';
import { JobCircularsPage } from './pages/JobCircularsPage';
import { CoursesPage } from './pages/CoursesPage';
import { ServicesPage } from './pages/ServicesPage';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';

// Modals
import { JobApplicationModal } from './components/JobApplicationModal';
import { PrintableApplicationModal } from './components/PrintableApplicationModal';
import { CourseEnrollModal } from './components/CourseEnrollModal';
import { StudentIdCardModal } from './components/StudentIdCardModal';
import { CircularDetailModal } from './components/CircularDetailModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  // Database & State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [circulars, setCirculars] = useState<JobCircular[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  // Navigation & Multi-Page Routing
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Modals State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'register'>('login');

  const [selectedCircularForApply, setSelectedCircularForApply] = useState<JobCircular | null>(null);
  const [selectedCircularForDetail, setSelectedCircularForDetail] = useState<JobCircular | null>(null);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);

  const [printableApplication, setPrintableApplication] = useState<JobApplication | null>(null);
  const [printableEnrollment, setPrintableEnrollment] = useState<CourseEnrollment | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Initial Load & Refresh
  const reloadData = () => {
    StorageService.init();
    setCurrentUser(StorageService.getCurrentUser());
    setCirculars(StorageService.getCirculars());
    setCourses(StorageService.getCourses());
    setApplications(StorageService.getApplications());
    setEnrollments(StorageService.getEnrollments());
    setNotices(StorageService.getNotices());
  };

  useEffect(() => {
    reloadData();
  }, []);

  // Filtered applications and enrollments for current logged in user
  const userApplications = currentUser
    ? applications.filter((app) => app.userId === currentUser.id)
    : [];

  const userEnrollments = currentUser
    ? enrollments.filter((enr) => enr.userId === currentUser.id)
    : [];

  // Handlers
  const handleOpenAuth = (tab: 'login' | 'register' = 'login') => {
    setAuthDefaultTab(tab);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    reloadData();
    showToast(`স্বাগতম, ${user.name}! আপনি সফলভাবে লগইন করেছেন।`);
    if (user.role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    StorageService.logout();
    setCurrentUser(null);
    setCurrentPage('home');
    reloadData();
    showToast('আপনি সফলভাবে লগআউট করেছেন।');
  };

  // Job Application Handlers
  const handleStartJobApply = (circular: JobCircular) => {
    setSelectedCircularForApply(circular);
  };

  const handleJobApplySuccess = (newApp: JobApplication) => {
    setSelectedCircularForApply(null);
    reloadData();
    showToast('আপনার চাকরির আবেদন সফলভাবে গৃহীত হয়েছে!');
    // Automatically open the printable official applicant copy
    setPrintableApplication(newApp);
  };

  // Course Enrollment Handlers
  const handleStartEnrollCourse = (course: Course) => {
    setSelectedCourseForEnroll(course);
  };

  const handleEnrollSuccess = (newEnrollment: CourseEnrollment) => {
    setSelectedCourseForEnroll(null);
    reloadData();
    showToast('কোর্সে ভর্তি সফল হয়েছে! আপনার ডিজিটাল আইডি কার্ড তৈরি হয়েছে।');
    // Open Student ID Card modal
    setPrintableEnrollment(newEnrollment);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-2xl border border-slate-700 flex items-center gap-2 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar with Distinct Page Routing */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Live Notice Ticker */}
      <NoticeTicker notices={notices} />

      {/* --- MULTI-PAGE VIEW ROUTER --- */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            circulars={circulars}
            courses={courses}
            onNavigate={handleNavigate}
            onApplyJob={handleStartJobApply}
            onViewJobPdf={(circ) => setSelectedCircularForDetail(circ)}
            onEnrollCourse={handleStartEnrollCourse}
          />
        )}

        {currentPage === 'jobs' && (
          <JobCircularsPage
            circulars={circulars}
            onApplyJob={handleStartJobApply}
            onViewPdf={(circ) => setSelectedCircularForDetail(circ)}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'courses' && (
          <CoursesPage
            courses={courses}
            onEnrollCourse={handleStartEnrollCourse}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'dashboard' && (
          currentUser ? (
            <UserDashboard
              currentUser={currentUser}
              applications={userApplications}
              enrollments={userEnrollments}
              onViewApplicationSlip={(app) => setPrintableApplication(app)}
              onViewStudentIdCard={(enr) => setPrintableEnrollment(enr)}
              onNewJobApply={() => handleNavigate('jobs')}
              onNewCourseEnroll={() => handleNavigate('courses')}
            />
          ) : (
            <div className="py-20 text-center max-w-lg mx-auto px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center font-bold">
                🔒
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                স্টুডেন্ট ও ইউজার পোর্টাল অ্যাক্সেস
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                আপনার চাকরির আবেদনসমূহ ট্র্যাকিং, আবেদন স্লিপ ডাউনলোড এবং কোর্স আইডি কার্ড দেখতে অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow"
                >
                  লগইন করুন
                </button>
                <button
                  onClick={() => handleOpenAuth('register')}
                  className="px-5 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs"
                >
                  নতুন অ্যাকাউন্ট খুলুন
                </button>
              </div>
            </div>
          )
        )}

        {currentPage === 'admin' && (
          currentUser?.role === 'admin' ? (
            <AdminPanel
              currentUser={currentUser}
              applications={applications}
              enrollments={enrollments}
              circulars={circulars}
              courses={courses}
              onClose={() => handleNavigate('home')}
              onRefreshData={reloadData}
              onViewApplicationSlip={(app) => setPrintableApplication(app)}
              onViewStudentIdCard={(enr) => setPrintableEnrollment(enr)}
            />
          ) : (
            <div className="py-20 text-center max-w-lg mx-auto px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center font-bold">
                🛡️
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                এডমিন প্যানেলে প্রবেশের অনুমতি প্রয়োজন
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                এডমিন কন্ট্রোল সেন্টার শুধুমাত্র অনুমোদিত কর্মকর্তাদের জন্য সংরক্ষিত। আপনি নিচের ডেমো এডমিন বাটনে ক্লিক করে সাথে সাথে টেস্ট করতে পারেন।
              </p>
              <button
                onClick={() => handleOpenAuth('login')}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow"
              >
                এডমিন লগইন উইন্ডো খুলুন
              </button>
            </div>
          )
        )}
      </main>

      {/* Universal Contact Footer */}
      <ContactFooter />

      {/* --- UNIVERSAL MODALS --- */}

      {/* 1. Job Application Wizard Modal */}
      {selectedCircularForApply && (
        <JobApplicationModal
          circular={selectedCircularForApply}
          currentUser={currentUser}
          isOpen={true}
          onClose={() => setSelectedCircularForApply(null)}
          onSuccess={handleJobApplySuccess}
          onOpenAuth={() => handleOpenAuth('login')}
        />
      )}

      {/* 2. Official Printable Job Application Slip (PDF / Print View) */}
      <PrintableApplicationModal
        application={printableApplication}
        isOpen={Boolean(printableApplication)}
        onClose={() => setPrintableApplication(null)}
      />

      {/* 3. Course Enrollment Modal */}
      {selectedCourseForEnroll && (
        <CourseEnrollModal
          course={selectedCourseForEnroll}
          currentUser={currentUser}
          isOpen={true}
          onClose={() => setSelectedCourseForEnroll(null)}
          onSuccess={handleEnrollSuccess}
        />
      )}

      {/* 4. Digital Student ID Card Modal (Printable) */}
      <StudentIdCardModal
        enrollment={printableEnrollment}
        isOpen={Boolean(printableEnrollment)}
        onClose={() => setPrintableEnrollment(null)}
      />

      {/* 5. Circular Detail & PDF Notice Modal */}
      <CircularDetailModal
        circular={selectedCircularForDetail}
        isOpen={Boolean(selectedCircularForDetail)}
        onClose={() => setSelectedCircularForDetail(null)}
        onApply={(circ) => {
          setSelectedCircularForDetail(null);
          setSelectedCircularForApply(circ);
        }}
      />

      {/* 6. User Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        defaultTab={authDefaultTab}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
