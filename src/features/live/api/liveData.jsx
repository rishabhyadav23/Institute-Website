export const LIVE_TABS = [
  { id: 'live', label: 'Live Now' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'recorded', label: 'Past Classes' }
];

export const LIVE_CLASSES = [
  {
    id: 101,
    title: "JEE Physics - Electrostatics Masterclass",
    tutor: "Mr. Rajesh Sharma",
    subject: "JEE Physics",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    status: "live",
    viewers: 320,
    time: "Started 15 mins ago",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: 102,
    title: "NEET Chemistry - Organic Reactions & Mechanisms",
    tutor: "Dr. Neha Gupta",
    subject: "NEET Chemistry",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    status: "live",
    viewers: 280,
    time: "Started 5 mins ago",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: 103,
    title: "NDA Maths - Trigonometry One Shot",
    tutor: "Mr. Vikram Singh",
    subject: "NDA Mathematics",
    thumbnail: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80",
    status: "upcoming",
    viewers: 0,
    time: "Today, 6:00 PM",
    videoUrl: ""
  },
  {
    id: 104,
    title: "NEET Biology - Genetics & Evolution Marathon",
    tutor: "Dr. Priya Verma",
    subject: "NEET Biology",
    thumbnail: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80",
    status: "ended",
    viewers: 450,
    time: "Streamed 2 days ago",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  }
];

export const MOCK_CHAT = [
  { id: 1, user: "Rahul", message: "Sir, what is useEffect?", time: "10:02" },
  { id: 2, user: "Sneha", message: "Voice is clear now 👍", time: "10:03" },
  { id: 3, user: "Admin", message: "Download notes from the resources tab.", time: "10:04", isAdmin: true },
];