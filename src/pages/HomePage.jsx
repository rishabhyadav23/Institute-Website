import React from 'react';
import { CourseCard } from '../features/courses/components/CourseCard';
import { 
  Atom, Scale, Code, Stethoscope, Building2, 
  Play, BookOpen, Trophy, ArrowRight 
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// --- MOCK DATA FOR VARIETY ---
// (Temporary data to show variety on screen immediately)
const DEMO_COURSES = [
  {
    id: 1,
    title: "UPSC CSE 2026 - Foundation Batch (Prelims + Mains)",
    category: "UPSC & Govt",
    rating: 4.9,
    price: 14999,
    originalPrice: 25000,
    image: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80",
    tag: "Live Batch",
    duration: "12 Months"
  },
  {
    id: 2,
    title: "IIT JEE Mains & Advanced - Physics Mastery by NV Sir",
    category: "IIT JEE",
    rating: 4.8,
    price: 4999,
    originalPrice: 8999,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    tag: "Bestseller",
    duration: "8 Months"
  },
  {
    id: 3,
    title: "Full Stack Web Development with React & Node.js",
    category: "Coding",
    rating: 4.7,
    price: 2999,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    tag: "Job Ready",
    duration: "6 Months"
  }
];

export const HomePage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      
      {/* 1. HERO SECTION (General Education) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            India ka Apna <br/>
            <span className="text-brand-600">Learning Platform</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Chahe <span className="font-bold text-gray-900 dark:text-white">UPSC</span> ho ya <span className="font-bold text-gray-900 dark:text-white">IIT-JEE</span>, 
            <span className="font-bold text-gray-900 dark:text-white"> NEET</span> ho ya <span className="font-bold text-gray-900 dark:text-white">Coding</span>.
            <br/> Masterbaazi par har sapna hoga poora.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full h-14 px-8 text-lg">
              Start Learning Now
            </Button>
            <Button variant="secondary" size="lg" className="rounded-full h-14 px-8 text-lg">
              Explore Exams
            </Button>
          </div>
        </div>
      </section>

      {/* 2. EXAM CATEGORIES (Icons Grid) */}
      <section className="-mt-16 relative z-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           <CategoryCard icon={<Building2 />} title="UPSC/IAS" />
           <CategoryCard icon={<Atom />} title="IIT JEE" />
           <CategoryCard icon={<Stethoscope />} title="NEET (Med)" />
           <CategoryCard icon={<Code />} title="Coding" />
           <CategoryCard icon={<Scale />} title="GATE / ESE" />
           <CategoryCard icon={<BookOpen />} title="Govt Exams" />
        </div>
      </section>

      {/* 3. POPULAR COURSES */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
           <div>
             <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Trending Batches</h2>
             <p className="text-gray-500 mt-2">Sabse zyada pasand kiye jane wale courses</p>
           </div>
           <Button variant="ghost" className="hidden md:flex">View All <ArrowRight className="ml-2 w-4 h-4"/></Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEMO_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 4. WHY MASTERBAAZI? */}
      <section className="bg-brand-900 text-white py-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
               <h2 className="text-4xl font-heading font-bold mb-6">Masterbaazi hi kyun?</h2>
               <div className="space-y-6">
                 <FeatureRow title="Best Faculties" desc="Teachers jinhone khud exams crack kiye hain." />
                 <FeatureRow title="Affordable Pricing" desc="Education sabke liye, bina kisi hidden cost ke." />
                 <FeatureRow title="Mentorship" desc="Padhai ke saath proper guidance aur strategy." />
               </div>
            </div>
            <div className="md:w-1/2">
               <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-2xl rotate-3 border-4 border-white/20" alt="Students"/>
            </div>
         </div>
      </section>

    </div>
  );
};

// Helper Components
const CategoryCard = ({ icon, title }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer group">
    <div className="text-gray-400 group-hover:text-brand-600 transition-colors mb-3">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <span className="font-bold text-gray-700 dark:text-gray-200">{title}</span>
  </div>
);

const FeatureRow = ({ title, desc }) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
      <Trophy className="w-6 h-6 text-yellow-400" />
    </div>
    <div>
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-brand-100">{desc}</p>
    </div>
  </div>
);