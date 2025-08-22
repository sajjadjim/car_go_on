"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaCarSide,
} from "react-icons/fa";

export default function SignupPage() {
  const { createUser, updateUserProfile, signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [error, setError] = useState("");

  if (user) router.replace("/");

  const passwordScore = useMemo(() => {
    let s = 0;
    if (form.password.length >= 8) s++;
    if (/[A-Z]/.test(form.password)) s++;
    if (/[0-9]/.test(form.password)) s++;
    if (/[^A-Za-z0-9]/.test(form.password)) s++;
    return s; // 0..4
  }, [form.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUser(form.email, form.password);
      await updateUserProfile({ displayName: form.name });
      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to create account.");
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    }
  };

  const strengthLabel = ["Too weak", "Weak", "Okay", "Good", "Strong"][passwordScore];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaCarSide className="text-yellow-400 text-3xl" />
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            Car <span className="text-yellow-400">GoON</span>
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-white/90 text-center">
          Create your account
        </h2>
        <p className="text-sm text-gray-300 text-center mb-6">
          Join and start exploring the best car deals
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 text-red-200 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <label className="block">
            <span className="block text-xs text-gray-300 mb-1">Full name</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <FaUser />
              </span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 text-white placeholder-gray-400 pl-10 pr-3 py-2 outline-none focus:border-yellow-400/60 transition"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                required
                autoComplete="name"
              />
            </div>
          </label>

          {/* Email */}
          <label className="block">
            <span className="block text-xs text-gray-300 mb-1">Email</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <FaEnvelope />
              </span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 text-white placeholder-gray-400 pl-10 pr-3 py-2 outline-none focus:border-yellow-400/60 transition"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                required
                autoComplete="email"
              />
            </div>
          </label>

          {/* Password */}
          <label className="block">
            <span className="block text-xs text-gray-300 mb-1">Password</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <FaLock />
              </span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 text-white placeholder-gray-400 pl-10 pr-10 py-2 outline-none focus:border-yellow-400/60 transition"
                type={showPw ? "text" : "password"}
                placeholder="At least 8 characters"
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                required
                autoComplete="new-password"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-yellow-400 transition"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Strength meter */}
            <div className="mt-2">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-2 transition-all ${
                    ["w-0", "w-1/4", "w-2/4", "w-3/4", "w-full"][passwordScore]
                  } ${["bg-red-500","bg-orange-400","bg-yellow-400","bg-lime-400","bg-green-500"][passwordScore]}`}
                />
              </div>
              <div className="text-xs text-gray-300 mt-1">{strengthLabel}</div>
            </div>
          </label>

          {/* Confirm */}
          <label className="block">
            <span className="block text-xs text-gray-300 mb-1">Confirm password</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <FaLock />
              </span>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 text-white placeholder-gray-400 pl-10 pr-10 py-2 outline-none focus:border-yellow-400/60 transition"
                type={showPw2 ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={(e) => setForm((s) => ({ ...s, confirm: e.target.value }))}
                required
                autoComplete="new-password"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPw2((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-yellow-400 transition"
                aria-label={showPw2 ? "Hide password" : "Show password"}
              >
                {showPw2 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-yellow-400 text-gray-900 font-semibold py-2 hover:opacity-90 transition flex items-center justify-center gap-2"
            type="submit"
          >
            {loading && <FaSpinner className="animate-spin" />}
            Sign up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-300">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="w-full rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white py-2 transition flex items-center justify-center gap-2"
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-300 text-center mt-6">
          Already have an account?{" "}
          <Link href="/authentications/login" className="text-yellow-400 hover:opacity-90">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
