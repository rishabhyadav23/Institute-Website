import React from 'react';
import { 
  Code, Briefcase, Building2, Atom, Stethoscope, Scale 
} from 'lucide-react';

export const FILTERS = [
  { id: 'all', label: 'All Fields' },
  { id: 'govt', label: 'Government' },
  { id: 'entrance', label: 'Entrance Exams' },
  { id: 'skills', label: 'Tech & Skills' },
];

export const CATEGORIES = [
  {
    id: 'upsc',
    group: 'govt',
    title: 'UPSC CSE',
    desc: 'India\'s toughest exam made easy.',
    image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80',
    icon: <Building2 />,
    courses: 12,
    tag: 'Trending',
    filterKey: 'UPSC'
  },
  {
    id: 'jee',
    group: 'entrance',
    title: 'IIT JEE',
    desc: 'Crack Mains & Advanced.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    icon: <Atom />,
    courses: 8,
    tag: 'Engineering',
    filterKey: 'JEE'
  },
  {
    id: 'coding',
    group: 'skills',
    title: 'Coding & Dev',
    desc: 'Full Stack, AI & Data Science.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    icon: <Code />,
    courses: 24,
    tag: 'High Salary',
    filterKey: 'Coding'
  },
  {
    id: 'neet',
    group: 'entrance',
    title: 'NEET Medical',
    desc: 'Your journey to becoming a Doctor.',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80',
    icon: <Stethoscope />,
    courses: 6,
    tag: 'Medical',
    filterKey: 'NEET'
  },
  {
    id: 'law',
    group: 'entrance',
    title: 'CLAT & Law',
    desc: 'National Law Universities.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    icon: <Scale />,
    courses: 5,
    tag: 'Legal',
    filterKey: 'Govt Exams'
  },
  {
    id: 'ssc',
    group: 'govt',
    title: 'SSC & Banking',
    desc: 'Secure a Govt Job.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    icon: <Briefcase />,
    courses: 15,
    tag: 'Govt Job',
    filterKey: 'Govt Exams'
  },
];