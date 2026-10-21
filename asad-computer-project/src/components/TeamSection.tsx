import React from 'react';
import { Award, BookOpen, Headset, Phone, Mail, CheckCircle2 } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      id: 'director',
      name: 'মোঃ আরিফুর রহমান (আসাদ)',
      nameEn: 'Md. Arifur Rahman (Asad)',
      designation: 'উদ্যোক্তা ও ব্যবস্থাপনা পরিচালক',
      designationEn: 'Founder & Managing Director',
      photo: '/src/assets/images/team_founder_director_1792523394526.jpg',
      experience: '১০+ বছরের অভিজ্ঞতা',
      bio: 'আসাদ কম্পিউটার ও ভূল্লী ডিজিটাল পোস্ট অফিসের প্রতিষ্ঠাতা। তার সুযোগ্য নেতৃত্বে প্রতিষ্ঠানটি ঠাকুরগাঁওয়ের ভূল্লী এলাকায় হাজারো তরুণ-তরুণীকে কম্পিউটার দক্ষতায় স্বাবলম্বী করেছে এবং বিশ্বস্ত নাগরিক সেবা প্রদান করে আসছে।',
      specialty: 'আইটি স্ট্র্যাটেজি, প্রতিষ্ঠান পরিচালনা ও ক্যারিয়ার কাউন্সিলিং',
      phone: '০১৭৭৩-৭৩৩৬৫৪',
      email: 'bhulli.postoffice@gmail.com',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      id: 'trainer',
      name: 'ইঞ্জিঃ তানভীর হাসান',
      nameEn: 'Engr. Tanvir Hasan',
      designation: 'সিনিয়র ট্রেইনার ও সহকারী পরিচালক',
      designationEn: 'Senior IT Trainer & Asst. Director',
      photo: '/src/assets/images/team_senior_trainer_1792523394846.jpg',
      experience: '৮+ বছরের অভিজ্ঞতা',
      bio: 'বি.এসসি ইন সিএসই (CSE)। কম্পিউটার অফিস অ্যাপ্লিকেশন, গ্রাফিক্স ডিজাইন ও ওয়েব ফ্রন্টএন্ডের প্রধান প্রশিক্ষক। হাতে-কলমে প্র্যাকটিক্যাল ল্যাব ও ফ্রিল্যান্সিংয়ে শিক্ষার্থীদের দক্ষ করে তোলাই তার মূল লক্ষ্য।',
      specialty: 'MS Office Specialist, Graphic Design & Freelancing',
      phone: '০১৮৬৪-৩৯৯৮৭১',
      email: 'bhulli.postoffice@gmail.com',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'assistant',
      name: 'মোঃ শাকিল হোসেন',
      nameEn: 'Md. Shakil Hossain',
      designation: 'কম্পিউটার অপারেটর ও অফিস সহকারী',
      designationEn: 'Computer Operator & Office Assistant',
      photo: '/src/assets/images/team_office_assistant_1792523395680.jpg',
      experience: '৫+ বছরের অভিজ্ঞতা',
      bio: 'অনলাইন চাকরির নির্ভুল আবেদন, টেলিটক ফি প্রদান, অ্যাডমিট কার্ড ডাউনলোড, জাতীয় পরিচয়পত্র (NID) সংশোধন ও পাসপোর্ট সেবা প্রদানে কাউন্টারে সেবা প্রার্থীদের সরাসরি সহযোগিতা করে থাকেন।',
      specialty: 'অনলাইন ফর্ম প্রসেসিং, ফটো-সিগনেচার রিসাইজ ও কাস্টমার কেয়ার',
      phone: '০১৭৭৩-৭৩৩৬৫৪',
      email: 'bhulli.postoffice@gmail.com',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
  ];

  return (
    <section className="py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            আমাদের সুযোগ্য পরিচালনা ও প্রশিক্ষণ প্যানেল
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            প্রতিষ্ঠানে কর্মরত দক্ষ টিম
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            আপনাদের বিশ্বস্ত সেবা ও মানসম্মত কম্পিউটার প্রশিক্ষণ নিশ্চিত করতে সার্বক্ষণিক কাজ করে যাচ্ছেন আমাদের দক্ষ কর্মকর্তাবৃন্দ।
          </p>
        </div>

        {/* 3 Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Photo & Role Header */}
              <div>
                <div className="relative h-64 bg-slate-200 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Experience Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/20">
                      {member.experience}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${member.badgeColor}`}>
                      {member.id === 'director' ? 'পরিচালক' : member.id === 'trainer' ? 'প্রধান ট্রেইনার' : 'সার্ভিস স্পেশালিস্ট'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 mt-0.5">
                      {member.designation}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {member.designationEn}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-xs">
                    <span className="text-[11px] text-slate-400 block mb-0.5">দক্ষতা ও দায়িত্ব:</span>
                    <span className="font-medium text-slate-700">{member.specialty}</span>
                  </div>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <a
                  href={`tel:${member.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{member.phone}</span>
                </a>
                <span className="text-[11px] text-slate-400">যোগাযোগের সময়: সকাল ৯টা-রাত ৯টা</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
