// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useProgress from '../../hooks/useProgress';
import { supabase } from '../../supabaseClient';
import SideBar from '../../components/SideBar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('Yoruba');
  const navigate = useNavigate();

  const { languageProgress, overallProgress, loadAllProgress, loading } = useProgress(selectedLanguage);

  const languages = ['Yoruba', 'Igbo', 'Hausa'];
  const sections = ['Alphabet', 'Words', 'Sentences'];

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) return setUser(null);

      const { data: profile } = await supabase
        .from('users')
        .select('display_name')
        .eq('id', currentUser.id)
        .single();

      setUser({
        displayName: profile?.display_name || currentUser.email.split('@')[0],
      });
    };

    fetchUserProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUserProfile();
      loadAllProgress();
    });

    return () => authListener?.subscription?.unsubscribe?.();
  }, [loadAllProgress]);

  // 🔁 Listen for progress updates only for current language
  useEffect(() => {
    const handler = (e) => {
      const updatedLanguage = e.detail?.language;
      if (updatedLanguage === selectedLanguage) {
        console.log(`[Dashboard] 🔄 Progress updated for ${selectedLanguage}, reloading...`);
        loadAllProgress();
      }
    };

    window.addEventListener('progressUpdate', handler);
    return () => window.removeEventListener('progressUpdate', handler);
  }, [selectedLanguage, loadAllProgress]);

  useEffect(() => {
    loadAllProgress();
  }, [selectedLanguage, loadAllProgress]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };

  const handleCardClick = (section) => {
    const routeMap = {
      Alphabet: `/${selectedLanguage.toLowerCase()}-alphabet`,
      Words: `/${selectedLanguage.toLowerCase()}-word`,
      Sentences: `/${selectedLanguage.toLowerCase()}-sentence`,
    };
    navigate(routeMap[section]);
  };

  const isSectionUnlocked = (section) => {
    const idx = sections.indexOf(section);
    return idx === 0 || languageProgress[sections[idx - 1]]?.progressPct === 100;
  };

  const getSectionProgress = (section) => languageProgress[section]?.progressPct || 0;
  const getSectionDays = (section) => ({
    completed: languageProgress[section]?.completedDays || 0,
    total: languageProgress[section]?.totalDays || 0,
  });
  const isSectionCompleted = (section) => getSectionProgress(section) === 100;

  return (
    <div className="flex pt-24">
      <SideBar />
      <div className="p-6 w-full max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6"
        >
          Welcome back, {user?.displayName || 'Learner'}! 😉
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Select Language:</h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-5 py-2 rounded-full transition-all ${
                  selectedLanguage === lang
                    ? 'bg-[#009688] text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009688]"></div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#00968721] shadow rounded-lg p-6 mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <p className="mb-2"><strong>Current Language:</strong> {selectedLanguage}</p>
              <div className="w-full bg-white rounded-full h-4 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.8 }}
                  className="bg-[#009688] h-4 rounded-full"
                />
              </div>
              <p className="text-lg font-medium">{overallProgress}% Completed</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {sections.map((section, index) => {
                const progress = getSectionProgress(section);
                const { completed, total } = getSectionDays(section);
                const unlocked = isSectionUnlocked(section);
                const isCompleted = isSectionCompleted(section);

                return (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={unlocked ? { y: -5 } : {}}
                    whileTap={unlocked ? { scale: 0.98 } : {}}
                    onClick={() => unlocked && handleCardClick(section)}
                    className={`p-6 rounded-xl shadow-lg cursor-pointer ${
                      unlocked
                        ? 'bg-white hover:shadow-xl border border-gray-200'
                        : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-xl">{section}</h3>
                      {isCompleted && <span className="text-green-500 text-2xl">✅</span>}
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                        className={`h-3 rounded-full ${isCompleted ? 'bg-[#009646]' : 'bg-[#009688]'}`}
                      />
                    </div>

                    <div className="space-y-1">
                      <p className="font-medium">{progress}% Completed</p>
                      {total > 0 && <p className="text-sm text-gray-600">Day {completed}/{total}</p>}
                      {isCompleted && <p className="text-[#009688] font-medium">✓ Section Completed!</p>}
                      {!unlocked && index > 0 && (
                        <p className="text-sm text-gray-500 mt-2">🔒 Complete {sections[index - 1]} to unlock</p>
                      )}
                      {unlocked && !isCompleted && (
                        <p className="text-sm text-[#009688] mt-2">👆 Click to continue learning</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;