"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function ProfilePage() {
  const { user, loading, updateUserProfile, logOut } = useAuth();
  const router = useRouter();

  // redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) router.replace("/authentications/login");
  }, [loading, user, router]);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const initials = useMemo(() => {
    if (!user?.displayName && !user?.email) return "U";
    const base = user?.displayName || user.email;
    const parts = base.trim().split(/\s+/);
    return parts.slice(0, 2).map(p => p[0]?.toUpperCase()).join("");
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg("");
    setSaving(true);
    try {
      await updateUserProfile({
        displayName: name || null,
        photoURL: photoURL || null,
      });
      setMsg("Profile updated successfully.");
    } catch (err) {
      setMsg(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logOut();
    router.push("/authentications/login");
  };

  if (loading || (!user && typeof window !== "undefined")) {
    return <div className="p-6">Loading…</div>;
  }

  if (!user) return null; // redirected

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>

      <div className="bg-white/5 border border-gray-700 rounded-xl p-5 text-white">
        <div className="flex items-center gap-4 mb-6">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border border-gray-600"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-yellow-500 text-gray-900 flex items-center justify-center text-xl font-bold">
              {initials}
            </div>
          )}

          <div>
            <div className="text-lg font-medium">{user.displayName || "Unnamed user"}</div>
            <div className="text-gray-300 text-sm">{user.email}</div>
          </div>

          <button
            onClick={handleLogout}
            className="ml-auto px-3 py-1.5 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Display name</label>
            <input
              className="w-full bg-gray-800 border border-gray-600 rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Photo URL</label>
            <input
              className="w-full bg-gray-800 border border-gray-600 rounded p-2"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-yellow-400 text-gray-900 hover:opacity-90 transition"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          {msg && <p className="mt-2 text-sm">{msg}</p>}
        </form>
      </div>
    </div>
  );
}
