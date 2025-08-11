import { notFound } from "next/navigation";
import { getCarById } from "@/app/actions/car_action/getCarById";
import AdminUpdateButton from "../components/AdminUpdateButton";
 // adjust if your path differs

export const revalidate = 0;

function format(n) {
  try {
    return new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `${Number(n).toLocaleString()} BDT`;
  }
}

export default async function CarDetailsPage({ params }) {
  // _id comes from the URL: /cars/:id
  const car = await getCarById(params.id);
  if (!car) return notFound();

  const title = `${car.make} ${car.model} ${car.trim ?? ""}`.trim();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold">{title} — {car.year}</h1>
      <p className="mt-1 text-gray-600">{car.location?.city}, {car.location?.country}</p>

      {/* Images */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {(car.images ?? []).slice(0, 3).map((src, i) => (
          <img key={i} src={src} alt={`${title} ${i + 1}`} className="w-full h-56 object-cover rounded-xl" />
        ))}
      </div>

      {/* Summary + Price */}
      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 rounded-2xl border p-5">
          <h2 className="text-xl font-semibold mb-3">Key Specs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div><span className="text-gray-500">Body:</span> {car.body_type}</div>
            <div><span className="text-gray-500">Fuel:</span> {car.fuel_type}</div>
            <div><span className="text-gray-500">Transmission:</span> {car.transmission}</div>
            <div><span className="text-gray-500">Drivetrain:</span> {car.drivetrain}</div>
            <div><span className="text-gray-500">Seats:</span> {car.seats}</div>
            <div><span className="text-gray-500">Mileage:</span> {car.mileage_km?.toLocaleString()} km</div>
          </div>

          <h3 className="text-lg font-semibold mt-5">Engine</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mt-2">
            {car.engine?.type === "EV" ? (
              <>
                <div><span className="text-gray-500">Motor:</span> {car.engine?.power_kw} kW</div>
                <div><span className="text-gray-500">HP:</span> {car.engine?.horsepower} hp</div>
                <div><span className="text-gray-500">Torque:</span> {car.engine?.torque_nm} Nm</div>
              </>
            ) : (
              <>
                <div><span className="text-gray-500">Displacement:</span> {car.engine?.displacement_l} L</div>
                <div><span className="text-gray-500">Turbo:</span> {car.engine?.turbo ? "Yes" : "No"}</div>
                <div><span className="text-gray-500">HP:</span> {car.engine?.horsepower} hp</div>
                <div><span className="text-gray-500">Torque:</span> {car.engine?.torque_nm} Nm</div>
              </>
            )}
          </div>

          <h3 className="text-lg font-semibold mt-5">Features</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {(car.features || []).map((f) => (
              <span key={f} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{f}</span>
            ))}
          </div>
        </div>

        <aside className="w-full md:w-80 shrink-0 rounded-2xl border p-5 h-fit">
          <div className="text-2xl font-bold">{format(car.price_bdt)}</div>
          <div className="mt-2 text-sm text-gray-600">Seller: {car.seller_type}</div>
          <div className="mt-1 text-sm text-gray-600">Safety (est.): {car.safety_rating_est}★</div>
          <div className="mt-1 text-sm text-gray-600">Listed: {car.listed_at}</div>

          <button className="mt-4 w-full bg-black text-white py-3 rounded-xl">Contact Seller</button>

          {/* ADMIN UPDATE */}
          <div className="mt-3">
            <AdminUpdateButton carId={car._id} />
          </div>
        </aside>
      </div>
    </div>
  );
}
