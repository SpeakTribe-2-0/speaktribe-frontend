import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";

const useProgress = (language) => {
  const [languageProgress, setLanguageProgress] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = ["Alphabet", "Words", "Sentences"];

  // Load all progress for the current user and language
  const loadAllProgress = useCallback(async () => {
    try {
      setLoading(true);

      // Supabase v2 getUser
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Auth error:", authError);
        setUser(null);
        setLanguageProgress({});
        setOverallProgress(0);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("language", language);

      if (error) {
        console.error("Supabase fetch error:", error);
        return;
      }

      const progressData = {};
      let totalProgress = 0;

      sections.forEach(section => {
        const sectionData = data?.find(item => item.section === section);
        progressData[section] = {
          completedDays: sectionData?.completed_days || 0,
          totalDays: sectionData?.total_days || 1,
          progressPct: sectionData?.progress_pct ?? 0, // Prevent NaN
        };
        totalProgress += progressData[section].progressPct;
      });

      setLanguageProgress(progressData);
      setOverallProgress(sections.length ? Math.round(totalProgress / sections.length) : 0);

    } catch (err) {
      console.error("Network error in loadAllProgress:", err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Save progress for a specific section
  const saveProgress = useCallback(
    async (section, completedDays, totalDays) => {
      if (!user) {
        console.warn("User not authenticated. Cannot save progress.");
        return;
      }

      // Upsert row using unique constraint
      const { error } = await supabase
        .from("user_progress")
        .upsert({
          user_id: user.id,
          language,
          section,
          completed_days: completedDays,
          total_days: totalDays,
        }, { onConflict: ["user_id", "language", "section"] });

      if (error) {
        console.error("Error saving progress:", error.message);
      } else {
        loadAllProgress(); // Refresh state
        window.dispatchEvent(new Event("progressUpdate"));
      }
    },
    [user, language, loadAllProgress]
  );

  // Initialize progress and listen for auth changes
  useEffect(() => {
    loadAllProgress();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (["SIGNED_IN", "SIGNED_OUT", "TOKEN_REFRESHED"].includes(event)) {
        loadAllProgress();
        window.dispatchEvent(new Event("progressUpdate"));
      }
    });

    return () => subscription?.unsubscribe?.();
  }, [loadAllProgress]);

  return { languageProgress, overallProgress, saveProgress, loadAllProgress, user, loading, sections };
};

export default useProgress;
