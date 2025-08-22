"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  FaUserCircle,
  FaEnvelope,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCamera,
  FaSave,
  FaUndo,
  FaSignOutAlt,
} from "react-icons/fa";

export default function ProfilePage() {
  const { user, loading, updateUserProfile, logOut } = useAuth();
  const router = useRouter();

  // redirect if not authed
  useEffect(() => {
    if (!loading && !user) router.replace("/authentications/login");
  }, [loading, user, router]);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null); // {type:'success'|'error', text:string}
  const [photoBroken, setPhotoBroken] = useState(false);

  // seed form from current user
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setPhotoBroken(false);
    }
  }, [user]);

  // live initials
  const initials = useMemo(() => {
    const base = (name || user?.displayName || user?.email || "U").trim();
    const parts = base.split(/\s+/);
    return parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
  }, [name, user]);

  const emailStr = user?.email || "—";
  const isVerified = !!user?.emailVerified;
  const lastSeen =
    user?.metadata?.lastSignInTime
      ? new Date(user.metadata.lastSignInTime).toLocaleString()
      : null;

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      await updateUserProfile({
        displayName: name || null,
        photoURL: photoURL || null,
      });
      setMsg({ type: "success", text: "Profile updated successfully." });
      setPhotoBroken(false);
    } catch (err) {
      setMsg({
        type: "error",
        text: err?.message || "Failed to update profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setPhotoBroken(false);
    setMsg(null);
  };

  const handleLogout = async () => {
    await logOut();
    router.push("/authentications/login");
  };

  if (loading || (!user && typeof window !== "undefined")) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        Loading…
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 text-white">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <p className="text-sm text-white/70">
            Manage your name and avatar. You’re signed in as{" "}
            <span className="font-medium text-white">{emailStr}</span>.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white shadow-xl">
          {/* top row: avatar + info + logout */}
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar preview (live from photoURL) */}
            <div className="relative">
              {photoURL && !photoBroken ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoURL}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border border-white/20"
                  onError={() => setPhotoBroken(true)}
                />
              ) : user?.photoURL && !photoBroken ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border border-white/20"
                  onError={() => setPhotoBroken(true)}
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-2xl font-extrabold">
                  {initials}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-black/70 border border-white/10 flex items-center justify-center">
                <FaCamera className="text-white/90" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="text-lg font-semibold truncate">
                {name || user.displayName || "Unnamed user"}
              </div>
              <div className="text-sm text-white/80 flex items-center gap-2 mt-1">
                <FaEnvelope className="opacity-80" />
                <span className="truncate">{emailStr}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs">
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-200">
                    <FaCheckCircle /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-200">
                    <FaExclamationTriangle /> Not verified
                  </span>
                )}
                {lastSeen && (
                  <span className="text-white/60">Last sign-in: {lastSeen}</span>
                )}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              title="Logout"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Alert */}
          {msg && (
            <div
              className={`mb-4 rounded-xl px-4 py-3 text-sm border ${
                msg.type === "success"
                  ? "bg-green-500/10 border-green-500/30 text-green-200"
                  : "bg-red-500/10 border-red-500/30 text-red-200"
              }`}
            >
              {msg.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-1">Display name</label>
              <div className="relative">
                <input
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-yellow-400/60"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Photo URL</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                  <FaCamera />
                </span>
                <input
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-white outline-none focus:border-yellow-400/60"
                  value={photoURL}
                  onChange={(e) => {
                    setPhotoBroken(false);
                    setPhotoURL(e.target.value);
                  }}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <p className="text-xs text-white/50 mt-1">
                Tip: Use a square image (e.g., 400×400) for best results.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${
                  saving
                    ? "bg-white/20 text-white/60 cursor-not-allowed"
                    : "bg-yellow-400 text-gray-900 hover:opacity-90"
                }`}
              >
                <FaSave />
                {saving ? "Saving..." : "Save changes"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                <FaUndo />
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* tiny footnote */}
        <p className="mt-4 text-center text-xs text-white/50">
          Your profile is used across Car GoON to personalize your experience.
        </p>
      </div>
    </div>
  );
}
