// hooks/useProgress.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";

const useProgress = (language) => {
  const [languageProgress, setLanguageProgress] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const sections = ["Alphabet", "Words", "Sentences"];

  const loadAllProgress = useCallback(async () => {
    try {
      setLoading(true);

      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
      if (authError || !currentUser) {
        console.error("Auth error:", authError);
        setUser(null);
        setLanguageProgress({});
        setOverallProgress(0);
        return;
      }

      setUser(currentUser);

      console.log("🔍 Fetching progress for:", { user: currentUser.id, language });

      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", currentUser.id)
        .eq("language", language);

      if (error) {
        console.error("❌ Supabase fetch error:", error);
        return;
      }

      console.log("📥 Fetched data:", data);

      const progressData = {};
      let totalProgress = 0;

      sections.forEach((section) => {
        const sectionData = data?.find((item) => item.section === section);
        const completedDays = sectionData?.completed_days || 0;
        const totalDays = sectionData?.total_days || 1;
        const progressPct = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

        progressData[section] = {
          completedDays,
          totalDays,
          progressPct,
        };

        totalProgress += progressPct;
      });

      setLanguageProgress(progressData);
      setOverallProgress(sections.length ? Math.round(totalProgress / sections.length) : 0);

      console.log("✅ Progress loaded:", { languageProgress: progressData, overallProgress: Math.round(totalProgress / sections.length) });
    } catch (err) {
      console.error("❌ Network error in loadAllProgress:", err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  const saveProgress = useCallback(
    async (section, completedDays, totalDays) => {
      if (!user) {
        console.warn("🚫 User not authenticated. Cannot save progress.");
        return;
      }

      const progressPct = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

      console.log("📤 Saving progress:", { language, section, completedDays, totalDays, progressPct });

      try {
        const { error } = await supabase
          .from("user_progress")
          .upsert(
            {
              user_id: user.id,
              language,
              section,
              completed_days: completedDays,
              total_days: totalDays,
              progress_pct: progressPct,
              updated_at: new Date().toISOString(),
            },
            { onConflict: ["user_id", "language", "section"] }
          );

        if (error) {
          console.error("❌ Error saving to Supabase:", error.message);
        } else {
          console.log("✅ Progress saved to DB!");
          await loadAllProgress();
          window.dispatchEvent(
            new CustomEvent("progressUpdate", { detail: { language } })
          );
        }
      } catch (err) {
        console.error("❌ Error in saveProgress:", err);
      }
    },
    [user, language, loadAllProgress]
  );

  useEffect(() => {
    loadAllProgress();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (["SIGNED_IN", "SIGNED_OUT", "TOKEN_REFRESHED"].includes(event)) {
        console.log("🔐 Auth state changed:", event);
        loadAllProgress();
        window.dispatchEvent(new CustomEvent("progressUpdate", { detail: { language } }));
      }
    });

    return () => authListener?.subscription?.unsubscribe?.();
  }, [loadAllProgress]);

  return {
    languageProgress,
    overallProgress,
    saveProgress,
    loadAllProgress,
    loading,
  };
};

export default useProgress;