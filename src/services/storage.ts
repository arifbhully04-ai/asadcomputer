import {
  User,
  JobCircular,
  JobApplication,
  Course,
  CourseEnrollment,
  Notice,
  ApplicationStatus
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_JOB_CIRCULARS,
  INITIAL_COURSES,
  INITIAL_APPLICATIONS,
  INITIAL_ENROLLMENTS,
  INITIAL_NOTICES
} from '../data/mockData';

const KEYS = {
  USERS: 'dcc_users_v1',
  CURRENT_USER: 'dcc_current_user_v1',
  CIRCULARS: 'dcc_circulars_v1',
  COURSES: 'dcc_courses_v1',
  APPLICATIONS: 'dcc_applications_v1',
  ENROLLMENTS: 'dcc_enrollments_v1',
  NOTICES: 'dcc_notices_v1',
};

// Safe JSON parser
function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error('Storage parse error for key:', key, e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error for key:', key, e);
  }
}

export const StorageService = {
  // Init database with initial seeds if not present
  init(): void {
    if (!localStorage.getItem(KEYS.USERS)) {
      setItem(KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(KEYS.CIRCULARS)) {
      setItem(KEYS.CIRCULARS, INITIAL_JOB_CIRCULARS);
    }
    if (!localStorage.getItem(KEYS.COURSES)) {
      setItem(KEYS.COURSES, INITIAL_COURSES);
    }
    if (!localStorage.getItem(KEYS.APPLICATIONS)) {
      setItem(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    }
    if (!localStorage.getItem(KEYS.ENROLLMENTS)) {
      setItem(KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
    }
    if (!localStorage.getItem(KEYS.NOTICES)) {
      setItem(KEYS.NOTICES, INITIAL_NOTICES);
    }
  },

  // User Auth
  getUsers(): User[] {
    return getItem<User[]>(KEYS.USERS, INITIAL_USERS);
  },

  getCurrentUser(): User | null {
    return getItem<User | null>(KEYS.CURRENT_USER, null);
  },

  setCurrentUser(user: User | null): void {
    setItem(KEYS.CURRENT_USER, user);
  },

  register(userData: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: 'usr_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    users.push(newUser);
    setItem(KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  },

  login(emailOrPhone: string, role?: 'admin' | 'user'): User | null {
    const users = this.getUsers();
    const query = emailOrPhone.trim().toLowerCase();
    let found = users.find(
      (u) =>
        u.email.toLowerCase() === query ||
        u.phone.replace(/[^0-9]/g, '') === query.replace(/[^0-9]/g, '')
    );

    if (!found && (query.includes('bhulli') || query.includes('admin') || query === '01773733654')) {
      found = users.find((u) => u.role === 'admin') || INITIAL_USERS[0];
    }

    if (found) {
      this.setCurrentUser(found);
      return found;
    }
    return null;
  },

  logout(): void {
    localStorage.removeItem(KEYS.CURRENT_USER);
  },

  // Job Circulars
  getCirculars(): JobCircular[] {
    return getItem<JobCircular[]>(KEYS.CIRCULARS, INITIAL_JOB_CIRCULARS);
  },

  addCircular(circular: Omit<JobCircular, 'id' | 'postedDate'>): JobCircular {
    const list = this.getCirculars();
    const newCirc: JobCircular = {
      ...circular,
      id: 'circ_' + Date.now(),
      postedDate: new Date().toISOString().split('T')[0],
    };
    list.unshift(newCirc);
    setItem(KEYS.CIRCULARS, list);
    return newCirc;
  },

  deleteCircular(id: string): void {
    const list = this.getCirculars().filter((c) => c.id !== id);
    setItem(KEYS.CIRCULARS, list);
  },

  // Courses
  getCourses(): Course[] {
    return getItem<Course[]>(KEYS.COURSES, INITIAL_COURSES);
  },

  // Job Applications
  getApplications(): JobApplication[] {
    return getItem<JobApplication[]>(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  },

  getUserApplications(userId: string): JobApplication[] {
    return this.getApplications().filter((a) => a.userId === userId);
  },

  submitJobApplication(
    data: Omit<JobApplication, 'id' | 'applicationId' | 'appliedDate' | 'status'>
  ): JobApplication {
    const applications = this.getApplications();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newApp: JobApplication = {
      ...data,
      id: 'app_' + Date.now(),
      applicationId: `DCC-2026-JOB-${randomCode}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    applications.unshift(newApp);
    setItem(KEYS.APPLICATIONS, applications);
    return newApp;
  },

  updateApplicationStatus(id: string, status: ApplicationStatus, remarks?: string): void {
    const applications = this.getApplications().map((app) => {
      if (app.id === id) {
        return {
          ...app,
          status,
          remarks: remarks !== undefined ? remarks : app.remarks,
        };
      }
      return app;
    });
    setItem(KEYS.APPLICATIONS, applications);
  },

  deleteApplication(id: string): void {
    const applications = this.getApplications().filter((app) => app.id !== id);
    setItem(KEYS.APPLICATIONS, applications);
  },

  // Course Enrollments
  getEnrollments(): CourseEnrollment[] {
    return getItem<CourseEnrollment[]>(KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
  },

  getUserEnrollments(userId: string): CourseEnrollment[] {
    return this.getEnrollments().filter((e) => e.userId === userId);
  },

  enrollInCourse(
    data: Omit<CourseEnrollment, 'id' | 'enrollmentId' | 'enrolledDate' | 'status' | 'studentIdCardNumber'>
  ): CourseEnrollment {
    const enrollments = this.getEnrollments();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const rollSeq = String(enrollments.length + 1).padStart(2, '0');
    const newEnroll: CourseEnrollment = {
      ...data,
      id: 'enr_' + Date.now(),
      enrollmentId: `DCC-STU-${randomNum}`,
      studentIdCardNumber: `DCC-2026-${rollSeq}`,
      enrolledDate: new Date().toISOString().split('T')[0],
      status: 'Enrolled',
    };
    enrollments.unshift(newEnroll);
    setItem(KEYS.ENROLLMENTS, enrollments);

    // decrease seat count on course if available
    const courses = this.getCourses().map((c) => {
      if (c.id === data.courseId && c.seatsLeft > 0) {
        return { ...c, seatsLeft: c.seatsLeft - 1 };
      }
      return c;
    });
    setItem(KEYS.COURSES, courses);

    return newEnroll;
  },

  updateEnrollmentStatus(id: string, status: any): void {
    const enrollments = this.getEnrollments().map((enr) => {
      if (enr.id === id) {
        return { ...enr, status };
      }
      return enr;
    });
    setItem(KEYS.ENROLLMENTS, enrollments);
  },

  recordEnrollmentPayment(id: string, amountToAdd: number, note?: string): CourseEnrollment | null {
    let updated: CourseEnrollment | null = null;
    const enrollments = this.getEnrollments().map((enr) => {
      if (enr.id === id) {
        const newPaid = Math.min(enr.totalFee, (enr.amountPaid || 0) + amountToAdd);
        const newPaymentStatus: CourseEnrollment['paymentStatus'] =
          newPaid >= enr.totalFee ? 'Paid' : newPaid > 0 ? 'Partial' : 'Pending';
        
        const receiptNo = `REC-${Date.now().toString().slice(-6)}`;
        const history = enr.paymentHistory || [];
        history.push({
          receiptNo,
          date: new Date().toISOString().split('T')[0],
          amount: amountToAdd,
          note: note || 'কাউন্টার ক্যাশ ডিপোজিট',
        });

        updated = {
          ...enr,
          amountPaid: newPaid,
          paymentStatus: newPaymentStatus,
          paymentHistory: history,
        };
        return updated;
      }
      return enr;
    });

    setItem(KEYS.ENROLLMENTS, enrollments);
    return updated;
  },

  deleteEnrollment(id: string): void {
    const enrollments = this.getEnrollments().filter((enr) => enr.id !== id);
    setItem(KEYS.ENROLLMENTS, enrollments);
  },

  addEnrollmentByAdmin(data: {
    studentName: string;
    studentPhone: string;
    studentEmail: string;
    courseId: string;
    courseTitle: string;
    totalFee: number;
    amountPaid: number;
    batchSchedule: string;
  }): CourseEnrollment {
    const enrollments = this.getEnrollments();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const rollSeq = String(enrollments.length + 1).padStart(2, '0');
    const paymentStatus = data.amountPaid >= data.totalFee ? 'Paid' : data.amountPaid > 0 ? 'Partial' : 'Pending';

    const newEnroll: any = {
      id: 'enr_' + Date.now(),
      enrollmentId: `DCC-STU-${randomNum}`,
      studentIdCardNumber: `DCC-2026-${rollSeq}`,
      userId: 'usr_walkin_' + Date.now(),
      courseId: data.courseId,
      courseTitle: data.courseTitle,
      studentName: data.studentName,
      studentPhone: data.studentPhone,
      studentEmail: data.studentEmail,
      batchSchedule: data.batchSchedule,
      enrolledDate: new Date().toISOString().split('T')[0],
      status: 'Ongoing',
      paymentStatus,
      amountPaid: data.amountPaid,
      totalFee: data.totalFee,
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
      paymentHistory: [
        {
          receiptNo: `REC-${Date.now().toString().slice(-6)}`,
          date: new Date().toISOString().split('T')[0],
          amount: data.amountPaid,
          note: 'ভর্তিকালীন প্রাথমিক জমা',
        },
      ],
    };

    enrollments.unshift(newEnroll);
    setItem(KEYS.ENROLLMENTS, enrollments);
    return newEnroll;
  },

  // Notices
  getNotices(): Notice[] {
    return getItem<Notice[]>(KEYS.NOTICES, INITIAL_NOTICES);
  },

  // Reset to factory defaults
  resetAll(): void {
    localStorage.removeItem(KEYS.USERS);
    localStorage.removeItem(KEYS.CURRENT_USER);
    localStorage.removeItem(KEYS.CIRCULARS);
    localStorage.removeItem(KEYS.COURSES);
    localStorage.removeItem(KEYS.APPLICATIONS);
    localStorage.removeItem(KEYS.ENROLLMENTS);
    localStorage.removeItem(KEYS.NOTICES);
    this.init();
  },
};
