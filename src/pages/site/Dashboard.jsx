import SideBar from '../../components/SideBar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useProgress from '../../hooks/useProgress';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('Yoruba');
  const navigate = useNavigate();
  const { languageProgress, overallProgress, loadAllProgress } = useProgress(selectedLanguage);

  // Available languages
  const languages = [ 'Yoruba','Igbo', 'Hausa'];

  // Sections to display
  const sections = ['Alphabet', 'Words', 'Sentences'];

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Load progress when language changes or a global progress update event is dispatched
  useEffect(() => {
    loadAllProgress();

    const handleProgressUpdate = () => {
      loadAllProgress();
    };

    window.addEventListener('progressUpdate', handleProgressUpdate);

    return () => {
      window.removeEventListener('progressUpdate', handleProgressUpdate);
    };
  }, [selectedLanguage, loadAllProgress]);

  // Handle card click
  const handleCardClick = section => {
    const routeMap = {
      Alphabet: `/${selectedLanguage.toLowerCase()}-alphabet`,
      Words: `/${selectedLanguage.toLowerCase()}-word`,
      Sentences: `/${selectedLanguage.toLowerCase()}-sentence`,
    };

    const route = routeMap[section];
    if (route) {
      navigate(route);
    }
  };

  // Determine if a section is unlocked based on previous section completion
  const isSectionUnlocked = section => {
    const sectionIndex = sections.indexOf(section);
    if (sectionIndex === 0) return true; // Alphabet is always unlocked

    const previousSection = sections[sectionIndex - 1];
    return languageProgress[previousSection]?.progressPct === 100;
  };

  // Get section progress percentage
  const getSectionProgress = section => {
    return languageProgress[section]?.progressPct || 0;
  };

  // Check if section is completed
  const isSectionCompleted = section => {
    return languageProgress[section]?.progressPct === 100;
  };

  return (
    <div className='flex pt-24'>
      <SideBar />

      <div className='p-6 w-full width'>
        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-2xl font-bold mb-6'>
          Welcome back, {user?.displayName || 'Learner'}! 😉
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
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className='bg-[#009688] h-4 rounded-full'></motion.div>
          </div>
          <p className='text-lg font-medium'>{overallProgress}% Completed</p>
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

                {completed && <p className='text-[#009688] font-medium'>✓ Completed</p>}

                {!unlocked && index > 0 && (
                  <p className='text-sm text-gray-500 mt-2'>
                    Complete {sections[index - 1]} to unlock
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
