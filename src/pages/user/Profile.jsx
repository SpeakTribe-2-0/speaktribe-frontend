import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [nativeLang, setNativeLang] = useState("");
  const [learningLangs, setLearningLangs] = useState("");
  const [proficiency, setProficiency] = useState("Beginner");
  const [uploading, setUploading] = useState(false);
  const [completedLangs, setCompletedLangs] = useState([]);

  const navigate = useNavigate();

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;

      const currentUser = data.user;
      setUser(currentUser);
      setEmail(currentUser.email || "");
      setDisplayName(currentUser.user_metadata?.displayName || "");
      setAvatarUrl(currentUser.user_metadata?.avatar_url || "");
      setNativeLang(currentUser.user_metadata?.nativeLang || "");
      setLearningLangs(currentUser.user_metadata?.learningLangs || []);
      setProficiency(currentUser.user_metadata?.proficiency || "Beginner");
      setCompletedLangs(currentUser.user_metadata?.completedLangs || []); 
    };
    fetchUser();
  }, []);

  // Upload avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = `${data.publicUrl}?t=${Date.now()}`; // bust cache

      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast.success("Avatar updated!");
    } catch (err) {
      console.error("Upload error:", err.message);
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // Save all updates
  const handleSave = async () => {
    if (!displayName || !nativeLang) {
      toast.error("Please fill in required fields!");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        displayName,
        nativeLang,
        learningLangs,
        proficiency,
        avatar_url: avatarUrl,
        
      },
      
    }
  );

    if (error) {
      console.log(error);
      
      toast.error("Update failed!");
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  // Cancel update
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20 font-[poppins-regular]">
      <h1 className="text-3xl font-bold mb-8 text-[#009688]">Profile Settings</h1>

      
     {/* Avatar + Nickname */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={avatarUrl || "https://via.placeholder.com/100"}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border-2 border-[#009688] mb-4"
        />
        <label className="cursor-pointer px-4 py-2 bg-[#009688] text-white rounded hover:bg-[#00796b] transition mb-4">
          {uploading ? "Uploading..." : "Change Avatar"}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </label>

        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your nickname"
          className="text-2xl font-bold text-center border-b-2 border-[#009688] focus:outline-none focus:border-[#00796b] bg-transparent w-64"
        />
      </div>


      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-[#F8F8F8] focus:outline-none focus:border-[#009688]"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
          />
        </div>
      </div>

      {/* Language Preferences */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Native Language</label>
        <select
          value={nativeLang}
          onChange={(e) => setNativeLang(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-[#F8F8F8] focus:outline-none focus:border-[#009688]"
        >
          <option value="">Select language</option>
          <option value="Yoruba">Yoruba</option>
          <option value="Igbo">Igbo</option>
          <option value="Hausa">Hausa</option>
        </select>
      </div>

<div className="mb-6">
  <label className="block font-medium mb-2">Language Learning</label>
  <div className="flex gap-4 flex-wrap">
    {["Yoruba", "Igbo", "Hausa"].map((lang) => (
      <button
        key={lang}
        onClick={() => setLearningLangs(lang)} 
        className={`px-4 py-2 rounded transition ${
          learningLangs === lang
            ? "bg-[#009688] text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {lang}
      </button>
    ))}
  </div>
</div>

      {/* Proficiency */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Proficiency Level</label>
        <select
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-[#F8F8F8] focus:outline-none focus:border-[#009688]"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>
            {/* Completed Languages */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Completed Languages</label>
        {completedLangs.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {completedLangs.map((lang, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 border border-green-400"
              >
                {lang}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No languages completed yet.</p>
        )}
      </div>


      {/* Save & Cancel */}
      <div className="flex gap-6 mt-8">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-[#009688] text-white rounded hover:bg-[#00796b] transition"
        >
          Save Update
        </button>
        <ToastContainer position="top-right" autoClose={3000} />
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-[#bf0f03] text-white rounded hover:bg-[#900c02] transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Profile;
