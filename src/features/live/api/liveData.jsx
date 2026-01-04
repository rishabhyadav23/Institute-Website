export const LIVE_TABS = [
  { id: 'live', label: 'Live Now' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'recorded', label: 'Past Classes' }
];

export const LIVE_CLASSES = [
  {
    id: 101,
    title: "Mastering React Hooks & Performance",
    tutor: "Hitesh Choudhary",
    subject: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    status: "live", // live, upcoming, ended
    viewers: 1240,
    time: "Started 15 mins ago",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Sample Video
  },
  {
    id: 102,
    title: "Strategy for UPSC Prelims 2025",
    tutor: "Dr. Vikas Divyakirti",
    subject: "UPSC Guidance",
    thumbnail: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80",
    status: "live",
    viewers: 8500,
    time: "Started 5 mins ago",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: 103,
    title: "Rotational Motion - Physics One Shot",
    tutor: "NV Sir",
    subject: "JEE Physics",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    status: "upcoming",
    viewers: 0,
    time: "Today, 6:00 PM",
    videoUrl: ""
  },
  {
    id: 104,
    title: "Complete Modern History Marathon",
    tutor: "Avadh Ojha Sir",
    subject: "History",
    thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
    status: "ended",
    viewers: 45000,
    time: "Streamed 2 days ago",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  }
];

export const MOCK_CHAT = [
  { id: 1, user: "Rahul", message: "Sir, what is useEffect?", time: "10:02" },
  { id: 2, user: "Sneha", message: "Voice is clear now 👍", time: "10:03" },
  { id: 3, user: "Admin", message: "Download notes from the resources tab.", time: "10:04", isAdmin: true },
];