"use client";
import { useState } from "react";

/**
 * Client-only <img> with a fallback when the source fails to load.
 * Use in Server Components without passing any handlers down.
 */
export default function SafeImg({
  src,
  alt,
  className = "",
  fallback =
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop"
}) {
  const [err, setErr] = useState(false);
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={err ? fallback : src}
      alt={alt}
      className={className}
      onError={() => setErr(true)}
    />
  );
}
