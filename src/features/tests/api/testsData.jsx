export const TEST_TABS = [
  { id: 'all', label: 'All Tests' },
  { id: 'live', label: 'Live Exams' },
  { id: 'mock', label: 'Full Mocks' },
  { id: 'pyq', label: 'Previous Years' }
];

export const TESTS_DATA = [
  {
    id: 1,
    title: "All India UPSC Prelims Mock 1",
    subject: "General Studies",
    totalQuestions: 100,
    duration: "120 Mins",
    totalMarks: 200,
    studentsAttempted: "12.5k",
    type: "live", 
    status: "Live Now",
    tags: ["National Rank"],
    date: "Today, 10:00 AM",
    syllabus: "History, Polity, Current Affairs (Jan-Mar)",
    isPremium: false // <--- FREE LIVE TEST
  },
  {
    id: 2,
    title: "JEE Mains 2025 - Full Length Test 4",
    subject: "PCM",
    totalQuestions: 90,
    duration: "180 Mins",
    totalMarks: 300,
    studentsAttempted: "8k",
    type: "mock",
    status: "Available",
    tags: ["High Yield"],
    date: null,
    syllabus: "Full Syllabus Class 11 & 12",
    isPremium: true // <--- PREMIUM MOCK
  },
  {
    id: 3,
    title: "NEET Biology - Chapterwise (Genetics)",
    subject: "Biology",
    totalQuestions: 50,
    duration: "45 Mins",
    totalMarks: 200,
    studentsAttempted: "25k",
    type: "mock",
    status: "Available",
    tags: ["Chapterwise"],
    date: null,
    syllabus: "Genetics and Evolution",
    isPremium: false // <--- FREE MOCK
  },
  {
    id: 4,
    title: "UPSC CSE 2023 - Actual Paper 1",
    subject: "General Studies",
    totalQuestions: 100,
    duration: "120 Mins",
    totalMarks: 200,
    studentsAttempted: "50k+",
    type: "pyq",
    status: "Available",
    tags: ["Official"],
    date: "2023 Paper",
    syllabus: "Full UPSC Syllabus",
    isPremium: false // <--- FREE PYQ
  },
  {
    id: 5,
    title: "SSC CGL Tier 1 - Speed Test",
    subject: "Quant & Reasoning",
    totalQuestions: 25,
    duration: "15 Mins",
    totalMarks: 50,
    studentsAttempted: "5k",
    type: "mock",
    status: "Available",
    tags: ["Speed Drill"],
    date: null,
    syllabus: "Quant, Reasoning",
    isPremium: true // <--- PREMIUM MOCK
  }
];

// ... User Stats export remains same ...
export const USER_STATS = {
  testsTaken: 12,
  avgScore: "78%",
  accuracy: "82%",
  rank: 1402
};