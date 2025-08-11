'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUpdateButton({ carId }) {
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    if (pwd === "jim12345") {
      setErr("");
      setOpen(false);
      router.push(`/cars/${carId}/edit`);
    } else {
      setErr("Incorrect password.");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full border border-gray-300 py-2 rounded-xl hover:bg-gray-50"
      >
        Update (Admin)
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-lg font-semibold">Admin Authentication</h3>
            <p className="text-sm text-gray-600 mt-1">Enter the admin password to edit this car.</p>

            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Enter password"
                className="w-full border rounded-xl px-3 py-2"
                autoFocus
              />
              {err && <p className="text-sm text-red-600">{err}</p>}

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-black text-white py-2 rounded-xl">
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); setPwd(""); setErr(""); }}
                  className="flex-1 border py-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
