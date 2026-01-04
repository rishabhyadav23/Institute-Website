import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const FALLBACK_NOTE = {
  id: 1,
  title: "Sample Note Title",
  subject: "General",
  author: "Admin",
  pages: 10,
  size: "2 MB",
  rating: 4.5,
  isPremium: false,
  price: 0,
  description: "This is a sample description because no note data was passed.",
  topics: ["Topic 1", "Topic 2", "Topic 3"]
};

export const useNotePreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // State
  const [activeTab, setActiveTab] = useState('overview');
  const [isExpanded, setIsExpanded] = useState(false);

  // Data Normalization
  const rawNote = location.state?.note || FALLBACK_NOTE;
  
  const note = {
    ...FALLBACK_NOTE,
    ...rawNote,
    description: rawNote.description || "Complete detailed summary with mind maps for quick revision.",
    topics: rawNote.topics || ["Introduction", "Core Concepts", "Summary", "PYQs"]
  };

  return {
    note,
    activeTab,
    setActiveTab,
    isExpanded,
    setIsExpanded,
    navigate, // Expose navigate for the back button
    id // Expose ID if needed for API fetching later
  };
};