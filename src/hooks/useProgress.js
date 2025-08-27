import { useState, useCallback } from 'react';

const useProgress = (language) => {
  const [languageProgress, setLanguageProgress] = useState({});
  const sections = ['Alphabet', 'Words', 'Sentences'];

  const loadAllProgress = useCallback(() => {
    if (!language) return;

    const allProgress = {};
    sections.forEach((section) => {
      const key = `progress_${language}_${section}`;
      const storedProgress = localStorage.getItem(key);
      if (storedProgress) {
        allProgress[section] = JSON.parse(storedProgress);
      } else {
        allProgress[section] = { score: 0, total: 0, progressPct: 0 };
      }
    });
    setLanguageProgress(allProgress);
  }, [language]);

  // ✅ Memoize saveProgress to prevent infinite re-renders
  const saveProgress = useCallback((section, score, total) => {
    if (!language || !section) return;

    const progressPct = Math.round((score / total) * 100);
    const progressData = {
      score,
      total,
      progressPct,
      date: new Date().toISOString(),
    };

    const key = `progress_${language}_${section}`;
    localStorage.setItem(key, JSON.stringify(progressData));

    setLanguageProgress((prev) => ({
      ...prev,
      [section]: progressData,
    }));

    // Dispatch event for other components
    window.dispatchEvent(new Event('progressUpdate'));
  }, [language]);

  const overallProgress = () => {
    const totalProgress = sections.reduce((acc, section) => {
      return acc + (languageProgress[section]?.progressPct || 0);
    }, 0);
    return Math.round(totalProgress / sections.length);
  };

  return {
    languageProgress,
    overallProgress: overallProgress(),
    loadAllProgress,
    saveProgress,
  };
};

export default useProgress;
