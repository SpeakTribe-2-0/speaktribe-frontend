// pages/Profile.js
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (!currentUser) return;

      setUser(currentUser);
      setEmail(currentUser.email);
      setDisplayName(
        currentUser.user_metadata?.full_name ||
          currentUser.user_metadata?.displayName ||
          ""
      );
      setAvatarUrl(currentUser.user_metadata?.avatar_url || "");
    };

    fetchUser();
  }, []);

  // Upload avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Upload failed!");
      console.error(uploadError);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    // Update user metadata with avatar URL
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    });

    if (updateError) {
      toast.error("Failed to update avatar!");
      console.error(updateError);
    } else {
      toast.success("Avatar updated!");
      setAvatarUrl(publicUrl);
    }
    setUploading(false);
  };

  // Update display name
  const handleDisplayNameUpdate = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: displayName },
    });

    if (error) toast.error("Failed to update display name");
    else toast.success("Display name updated!");
  };

  // Update email
  const handleEmailUpdate = async () => {
    const { error } = await supabase.auth.updateUser({ email });

    if (error) toast.error("Failed to update email");
    else toast.success("Email updated! Check your inbox for confirmation.");
  };

  // Update password
  const handlePasswordUpdate = async () => {
    if (!password) return toast.error("Password cannot be empty");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) toast.error("Failed to update password");
    else toast.success("Password updated!");
    setPassword("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>

      {/* Avatar */}
      <div className="mb-6 flex items-center gap-4">
        <img
          src={avatarUrl || "https://via.placeholder.com/80?text=User"}
          alt="avatar"
          className="w-30 h-30 rounded-full object-cover border-2 border-[#009688]"
        />
        <div>
          <label className="cursor-pointer px-4 py-2 bg-[#009688] text-white rounded hover:bg-[#00796b] transition">
            {uploading ? "Uploading..." : "Change Avatar"}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Display Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Display Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#009688]"
        />
        <button
          onClick={handleDisplayNameUpdate}
          className="mt-2 px-4 py-2 bg-[#009688] text-white rounded hover:bg-[#00796b] transition"
        >
          Update Name
        </button>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#009688]"
        />
        <button
          onClick={handleEmailUpdate}
          className="mt-2 px-4 py-2 bg-[#009688] text-white rounded hover:bg-[#00796b] transition"
        >
          Update Email
        </button>
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block font-medium mb-1">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#009688]"
        />
        <button
          onClick={handlePasswordUpdate}
          className="mt-2 px-4 py-2 bg-[#009688] text-white rounded hover:bg-[#00796b] transition"
        >
          Update Password
        </button>
      </div>


      {/* ** i just added this line, save update and cancel update. validate it on your end. you can take out the save update button, but retain the cancel update button to return the user to the last visited page.. that is where they are coming from which is their dashboard ** */}
      <div className=" flex gap-[20px] mt-[50px]">
        <button
          onClick={handlePasswordUpdate}
          className="mt-2 px-4 py-2 bg-[#009688] text-white rounded hover:bg-[#00796b] transition"
        >
          Save Update
        </button>
        <button
          onClick={handlePasswordUpdate}
          className="mt-2 px-4 py-2 bg-[#bf0f03] text-white rounded hover:bg-[#900c02] transition"
        >
          Cancel Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
