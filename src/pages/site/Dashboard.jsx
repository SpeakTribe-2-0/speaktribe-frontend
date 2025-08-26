import SideBar from '../../components/SideBar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('Yoruba');
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();

  // Available languages
  const languages = ['Igbo', 'Yoruba', 'Hausa'];

  // Sections to display
  const sections = ['Alphabet', 'Words', 'Sentences'];

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Load progress when language changes
  useEffect(() => {
    const key = `quizProgress_${selectedLanguage}`;
    const storedProgress = localStorage.getItem(key);

    if (storedProgress) {
      try {
        const parsedProgress = JSON.parse(storedProgress);
        setProgress(parsedProgress);
      } catch (error) {
        setProgress(null);
      }
    } else {
      setProgress(null);
    }
  }, [selectedLanguage]);

  // Handle card click
  const handleCardClick = section => {
    const routeMap = {
      Alphabet: `/${selectedLanguage.toLowerCase()}-alphabet`,
      Words: `/${selectedLanguage.toLowerCase()}-words`,
      Sentences: `/${selectedLanguage.toLowerCase()}-sentences`,
    };

    const route = routeMap[section];
    if (route) {
      navigate(route);
    }
  };

  // Calculate overall progress percentage
  const calculateOverallProgress = () => {
    if (!progress) return 0;
    return progress.progressPct || 0;
  };

  // Determine if a section is unlocked based on 33.33% progress rule
  const isSectionUnlocked = section => {
    const sectionIndex = sections.indexOf(section);
    const overallProgress = calculateOverallProgress();

    // Each section requires 33.33% progress from previous sections
    const requiredProgress = sectionIndex * 33.33;
    return overallProgress >= requiredProgress;
  };

  // Get section progress percentage (all sections use the same overall progress)
  const getSectionProgress = section => {
    return calculateOverallProgress();
  };

  // Check if section is completed
  const isSectionCompleted = section => {
    const progressPercentage = calculateOverallProgress();
    return progressPercentage === 100;
  };

  return (
    <div className='flex'>
      <SideBar />

      <div className='p-6 w-full'>
        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-2xl font-bold mb-6'>
          Welcome back, {user?.displayName || 'Learner'}!
        </motion.h1>

        {/* Language Selector - Modern Styling */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mb-8'>
          <h2 className='text-lg font-semibold mb-3'>Select Language:</h2>
          <div className='flex flex-wrap gap-3'>
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  selectedLanguage === lang
                    ? 'bg-[#009688] text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}>
                {lang}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-white shadow rounded-lg p-6 mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Your Progress</h2>
          <p className='mb-2'>
            <strong>Current Language:</strong> {selectedLanguage}
          </p>
          <div className='w-full bg-gray-200 rounded-full h-4 mb-3'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calculateOverallProgress()}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className='bg-[#009688] h-4 rounded-full'></motion.div>
          </div>
          <p className='text-lg font-medium'>{calculateOverallProgress()}% Completed</p>
        </motion.div>

        {/* Learning Sections */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {sections.map((section, index) => {
            const progressPercentage = getSectionProgress(section);
            const unlocked = isSectionUnlocked(section);
            const completed = isSectionCompleted(section);

            return (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={unlocked ? { y: -5 } : {}}
                whileTap={unlocked ? { scale: 0.98 } : {}}
                onClick={() => unlocked && handleCardClick(section)}
                className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                  unlocked
                    ? 'bg-white hover:shadow-xl border border-gray-200'
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}>
                <h3 className='font-bold text-xl mb-3'>{section}</h3>

                <div className='w-full bg-gray-200 rounded-full h-2 mb-3'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-2 rounded-full ${
                      completed ? 'bg-green-500' : 'bg-[#009688]'
                    }`}></motion.div>
                </div>

                <p className='mb-2'>{progressPercentage}% Completed</p>

                {completed && <p className='text-green-600 font-medium'>✓ Completed</p>}

                {!unlocked && (
                  <p className='text-sm text-gray-500 mt-2'>
                    Complete {Math.max(0, index * 33.33 - calculateOverallProgress()).toFixed(1)}%
                    more to unlock
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
