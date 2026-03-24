export const TEST_TABS = [
  { id: 'all', label: 'All Tests' },
  { id: 'live', label: 'Live Exams' },
  { id: 'mock', label: 'Full Mocks' },
  { id: 'pyq', label: 'Previous Years' }
];

export const TESTS_DATA = [
  {
    id: 1,
    title: "JEE Mains 2027 - Full Mock Test 1",
    subject: "Physics, Chemistry, Maths",
    totalQuestions: 90,
    duration: "180 Mins",
    totalMarks: 300,
    studentsAttempted: "2.5k",
    type: "live",
    status: "Live Now",
    tags: ["Institute Rank"],
    date: "Today, 10:00 AM",
    syllabus: "Full Syllabus Class 11 & 12",
    isPremium: false
  },
  {
    id: 2,
    title: "NEET 2027 - Biology Full Length Test",
    subject: "Biology",
    totalQuestions: 90,
    duration: "180 Mins",
    totalMarks: 360,
    studentsAttempted: "3k",
    type: "mock",
    status: "Available",
    tags: ["High Yield"],
    date: null,
    syllabus: "Full NCERT Biology Class 11 & 12",
    isPremium: true
  },
  {
    id: 3,
    title: "NDA Maths - Chapterwise (Calculus)",
    subject: "Mathematics",
    totalQuestions: 50,
    duration: "60 Mins",
    totalMarks: 150,
    studentsAttempted: "1.5k",
    type: "mock",
    status: "Available",
    tags: ["Chapterwise"],
    date: null,
    syllabus: "Differential & Integral Calculus",
    isPremium: false
  },
  {
    id: 4,
    title: "JEE Advanced 2025 - Previous Year Paper",
    subject: "PCM",
    totalQuestions: 54,
    duration: "180 Mins",
    totalMarks: 180,
    studentsAttempted: "4k",
    type: "pyq",
    status: "Available",
    tags: ["Official"],
    date: "2025 Paper",
    syllabus: "Full JEE Advanced Syllabus",
    isPremium: false
  },
  {
    id: 5,
    title: "SSC JE - Engineering Fundamentals Speed Test",
    subject: "Technical + GK",
    totalQuestions: 25,
    duration: "15 Mins",
    totalMarks: 50,
    studentsAttempted: "800",
    type: "mock",
    status: "Available",
    tags: ["Speed Drill"],
    date: null,
    syllabus: "Basic Engineering, Reasoning, GK",
    isPremium: true
  }
];

// ... User Stats export remains same ...
export const USER_STATS = {
  testsTaken: 12,
  avgScore: "78%",
  accuracy: "82%",
  rank: 1402
};