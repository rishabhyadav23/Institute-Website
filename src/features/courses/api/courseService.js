// Mock Data (Jab tak backend nahi aata)
const MOCK_COURSES = [
  {
    id: 1,
    title: "Full Stack Web Development Masterclass",
    instructor: "Rishabh Singh",
    rating: 4.8,
    students: 12500,
    price: 4999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80",
    tag: "Bestseller",
    level: "Beginner to Pro",
    duration: "45h 20m"
  },
  // ... more courses
];

// Service Object (Abstraction)
export const courseService = {
  getAllCourses: async () => {
    // Backend aane par yahan: return axios.get('/api/courses');
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_COURSES), 800); // Simulate network delay
    });
  },

  getCourseById: async (id) => {
    return new Promise((resolve) => {
      const course = MOCK_COURSES.find(c => c.id === parseInt(id));
      setTimeout(() => resolve(course), 500);
    });
  }
};