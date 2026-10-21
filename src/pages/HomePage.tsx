import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { JobCircular, Course } from '../types';

interface HomePageProps {
  circulars?: JobCircular[];
  courses?: Course[];
  onNavigate: (page: string) => void;
  onApplyJob?: (circular: JobCircular) => void;
  onViewJobPdf?: (circular: JobCircular) => void;
  onEnrollCourse?: (course: Course) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
}) => {
  return (
    <div className="bg-[#030712] min-h-[calc(100vh-140px)]">
      {/* 
        Home page strictly contains the full-width picture carousel with captions, 
        the 3 picture previews, and the 4 trust metrics, matching Capture10 
      */}
      <HeroSection
        onApplyClick={() => onNavigate('jobs')}
        onExploreCourses={() => onNavigate('courses')}
      />
    </div>
  );
};
