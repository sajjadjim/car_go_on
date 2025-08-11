// Fetch single car from our API by id; no-cache to keep it fresh
export async function getCarById(id) {
  if (!id) return null;

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`, { cache: "no-store" });

  if (!res.ok) return null;
  return res.json();
}
