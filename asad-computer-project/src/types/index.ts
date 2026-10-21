export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  nameBn?: string;
  email: string;
  phone: string;
  role: UserRole;
  district?: string;
  avatar?: string;
  education?: string;
  createdAt: string;
}

export type JobCategory = 'Govt' | 'Bank' | 'Private' | 'Defense';

export interface JobCircular {
  id: string;
  title: string;
  titleBn: string;
  organization: string;
  organizationBn: string;
  category: JobCategory;
  vacancies: number;
  deadline: string; // YYYY-MM-DD
  govFee: number;
  serviceCharge: number;
  educationReq: string;
  ageLimit: string;
  circularPdfUrl?: string;
  details: string;
  postedDate: string;
  isHot?: boolean;
}

export type ApplicationStatus = 'Pending' | 'Processing' | 'Completed' | 'Rejected';

export interface JobApplication {
  id: string;
  applicationId: string; // e.g. DCC-2026-JOB-8491
  userId: string;
  circularId: string;
  jobTitle: string;
  organization: string;
  applicantName: string;
  applicantNameBn: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  nidNumber: string;
  phone: string;
  email: string;
  district: string;
  upazila: string;
  educationLevel: string;
  cgpaOrDivision: string;
  passingYear: string;
  appliedDate: string;
  status: ApplicationStatus;
  paymentStatus: 'Paid' | 'Unpaid';
  totalAmount: number;
  photoUrl?: string;
  signatureUrl?: string;
  rollNumber?: string;
  remarks?: string;
}

export interface Course {
  id: string;
  title: string;
  titleBn: string;
  duration: string;
  durationMonths: number;
  fee: number;
  originalFee: number;
  batchSchedule: string;
  totalClasses: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  syllabus: string[];
  isPopular?: boolean;
  seatsTotal: number;
  seatsLeft: number;
  description: string;
}

export type EnrollmentStatus = 'Pending' | 'Enrolled' | 'Ongoing' | 'Completed' | 'Cancelled';

export interface PaymentReceipt {
  receiptNo: string;
  date: string;
  amount: number;
  note?: string;
}

export interface CourseEnrollment {
  id: string;
  enrollmentId: string; // e.g. DCC-STU-1042
  userId: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  batchSchedule: string;
  enrolledDate: string;
  status: EnrollmentStatus;
  paymentStatus: 'Paid' | 'Partial' | 'Pending';
  amountPaid: number;
  totalFee: number;
  studentIdCardNumber: string;
  photoUrl?: string;
  paymentHistory?: PaymentReceipt[];
}

export interface ServiceItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  iconName: string;
  charge: string;
  estimatedTime: string;
  category: string;
}

export interface Notice {
  id: string;
  title: string;
  titleBn: string;
  date: string;
  category: 'Job' | 'Course' | 'General';
  isImportant?: boolean;
}
