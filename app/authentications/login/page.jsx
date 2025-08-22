"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaCarSide,
} from "react-icons/fa";

export default function LoginPage() {
  const { signIn, signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [reveal, setReveal] = useState(false);

  if (user) router.replace("/"); // already logged in

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(form.email, form.password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

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
          Welcome back
        </h2>
        <p className="text-sm text-gray-300 text-center mb-6">
          Login to continue exploring cars and deals
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 text-red-200 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                type={reveal ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setReveal((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-yellow-400 transition"
                aria-label={reveal ? "Hide password" : "Show password"}
              >
                {reveal ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          {/* Actions */}
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                className="accent-yellow-400"
                onChange={() => {}}
              />
              Remember me
            </label>
            <Link href="#" className="text-yellow-400 hover:opacity-90">
              Forgot password?
            </Link>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-yellow-400 text-gray-900 font-semibold py-2 hover:opacity-90 transition flex items-center justify-center gap-2"
            type="submit"
          >
            {loading && <FaSpinner className="animate-spin" />}
            Login
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
          New here?{" "}
          <Link href="/authentications/signup" className="text-yellow-400 hover:opacity-90">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
