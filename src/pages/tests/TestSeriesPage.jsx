import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported

// Logic
import { useTests } from '../../features/tests/hooks/useTests';

// Components
import { TestsHeader } from '../../features/tests/components/TestsHeader';
import { TestStats } from '../../features/tests/components/TestStats';
import { TestCard } from '../../features/tests/components/TestCard';
import { TestPurchaseModal } from '../../features/tests/components/TestPurchaseModal';

export const TestSeriesPage = () => {
  const navigate = useNavigate(); // Hook for navigation
  
  const { 
    activeTab, setActiveTab, 
    searchQuery, setSearchQuery, 
    filteredTests, userStats 
  } = useTests();

  // Modal State
  const [selectedTest, setSelectedTest] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // --- THE MAIN HANDLER ---
  const handleTestAction = (test, actionType) => {
    console.log("Action Clicked:", actionType, test.title); // Debugging Log

    if (actionType === 'unlock') {
      // 1. Agar Unlock hai -> Modal kholo
      setSelectedTest(test);
      setIsPurchaseModalOpen(true);
    } else if (actionType === 'start') {
      // 2. Agar Start hai -> Page Navigate karo
      navigate(`/tests/${test.id}/take`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <TestsHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Stats */}
        <TestStats stats={userStats} />

        {/* Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {filteredTests.map((test) => (
              <TestCard 
                key={test.id} 
                test={test} 
                onAction={handleTestAction} // <--- PASSING THE HANDLER
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <p className="text-gray-500">No tests found matching your criteria.</p>
          </div>
        )}

        {/* Modal */}
        <TestPurchaseModal 
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          test={selectedTest}
        />

      </div>
    </div>
  );
};