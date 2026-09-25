import { notFound } from "next/navigation";
import Link from "next/link";
import { getBikeById } from "@/app/actions/bike_action/getBikeById";
import { getBikes } from "@/app/actions/bike_action/getBikes";
import {
  FaMotorcycle,
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaCalendarAlt,
  FaShieldAlt,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaArrowLeft,
  FaCalculator,
  FaTachometerAlt,
  FaFileContract,
} from "react-icons/fa";
import { formatBDPrice, formatBDT } from "@/lib/vehicleUtils";

export const revalidate = 0;

function SpecItem({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3.5 hover:border-slate-700 transition">
      <div className="text-slate-400 text-xs flex items-center gap-2 mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-white font-semibold text-sm">{value || "—"}</div>
    </div>
  );
}

export default async function BikeDetailsPage({ params }) {
  const { id } = await params;
  const bike = await getBikeById(id);
  if (!bike) return notFound();

  const title = `${bike.make} ${bike.model} ${bike.trim ?? ""}`.trim();
  const images = (bike.images && bike.images.length > 0)
    ? bike.images
    : ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop"];

  const allBikes = await getBikes();
  const similarBikes = allBikes
    .filter((b) => (b._id || b.id) !== (bike._id || bike.id))
    .slice(0, 3);

  // EMI sample calculation (30% down, 11% interest, 36 months)
  const price = Number(bike.price_bdt) || 0;
  const downPayment = Math.round(price * 0.3);
  const loanAmount = price - downPayment;
  const monthlyRate = 0.11 / 12;
  const months = 36;
  const estimatedEMI = loanAmount > 0
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1))
    : 0;

  const whatsappMessage = encodeURIComponent(
    `Hello! I saw your ${title} listed on CarGoON BD for ${formatBDPrice(bike.price_bdt)}. Is it still available?`
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/bikes"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition"
          >
            <FaArrowLeft /> Back to all bikes
          </Link>

          <span className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full">
            Category: <strong className="text-white">Motorcycle / Bike</strong>
          </span>
        </div>

        {/* Title Header */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {bike.condition || "Verified Bike"}
              </span>
              {bike.bike_type && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {bike.bike_type}
                </span>
              )}
              {bike.engine_cc && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {bike.engine_cc} CC
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              {title} <span className="text-slate-500 font-normal">—</span>{" "}
              <span className="text-amber-400 font-bold">{bike.year}</span>
            </h1>

            <p className="mt-2 text-sm text-slate-400 flex items-center gap-2">
              <FaMapMarkerAlt className="text-emerald-400" />
              <span>
                {bike.location?.area ? `${bike.location.area}, ` : ""}
                {bike.location?.city || "Dhaka"}, {bike.location?.country || "Bangladesh"}
              </span>
              {bike.brta_reg && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-300 font-mono bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded text-xs">
                    BRTA: {bike.brta_reg}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="md:text-right p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs uppercase tracking-wider text-slate-400">Bangladeshi Asking Price</div>
            <div className="text-3xl font-black text-emerald-400 flex items-center md:justify-end gap-1.5 mt-0.5">
              <FaMoneyBillWave className="text-2xl" />
              <span>{formatBDPrice(bike.price_bdt)}</span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">
              Exact BDT: {formatBDT(bike.price_bdt)}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[0]}
              alt={title}
              className="w-full h-[360px] md:h-[460px] object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {images.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 h-44 lg:h-[222px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${title} view ${idx + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
            {images.length === 1 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col items-center justify-center text-center text-slate-500 h-full">
                <FaMotorcycle size={40} className="mb-2 opacity-40 text-emerald-400" />
                <p className="text-xs">Original Bangladeshi seller verified photos</p>
              </div>
            )}
          </div>
        </div>

        {/* Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Technical Specifications */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <FaCogs className="text-emerald-400" /> Technical Specifications
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <SpecItem
                  icon={<FaCogs className="text-emerald-400" />}
                  label="Engine Displacement"
                  value={bike.engine_cc ? `${bike.engine_cc} cc` : null}
                />
                <SpecItem
                  icon={<FaTachometerAlt className="text-amber-400" />}
                  label="Cooling System"
                  value={bike.cooling}
                />
                <SpecItem
                  icon={<FaShieldAlt className="text-emerald-400" />}
                  label="Braking System"
                  value={bike.brake_type}
                />
                <SpecItem
                  icon={<FaGasPump className="text-sky-400" />}
                  label="Fuel Supply"
                  value={bike.fuel_system}
                />
                <SpecItem
                  icon={<FaGasPump className="text-amber-400" />}
                  label="Fuel Economy (Mileage)"
                  value={bike.mileage_kmpl ? `${bike.mileage_kmpl} km/l` : null}
                />
                <SpecItem
                  icon={<FaCogs className="text-slate-400" />}
                  label="Transmission"
                  value={bike.transmission}
                />
                <SpecItem
                  icon={<FaCalendarAlt className="text-emerald-400" />}
                  label="Odometer (KM Run)"
                  value={typeof bike.mileage_km === "number" ? `${bike.mileage_km.toLocaleString()} km` : "—"}
                />
                <SpecItem
                  icon={<FaShieldAlt className="text-sky-400" />}
                  label="Front Brake"
                  value={bike.front_brake}
                />
                <SpecItem
                  icon={<FaShieldAlt className="text-amber-400" />}
                  label="Rear Brake"
                  value={bike.rear_brake}
                />
              </div>

              {bike.suspension && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-emerald-400">Suspension Setup:</span> {bike.suspension}
                </div>
              )}
            </div>

            {/* Key Features & Equipment */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <FaCheckCircle className="text-emerald-400" /> Key Features & Electronics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(bike.features || [
                  "Dual Channel ABS",
                  "Digital TFT Cockpit",
                  "LED Lighting Setup",
                  "Tubeless Tyres",
                  "Alloy Wheels",
                ]).map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-sm text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0">
                      ✓
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BRTA & Paperwork Status in BD */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <FaFileContract className="text-amber-400" /> Bangladesh BRTA & Documentation Status
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400 block">BRTA Number Plate</span>
                  <span className="font-mono font-bold text-white mt-1 block">
                    {bike.brta_reg || "Dhaka Metro Registered"}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Tax Token Validity</span>
                  <span className="font-semibold text-emerald-400 mt-1 block">
                    {bike.tax_token_validity ? `Updated upto ${bike.tax_token_validity}` : "Updated"}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Ownership Status</span>
                  <span className="font-semibold text-white mt-1 block">
                    1st Party / Name Transfer Possible
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Contact, Verification & Loan */}
          <div className="space-y-6">
            {/* Seller Contact Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md sticky top-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 font-bold flex items-center justify-center text-xl">
                  {bike.seller_name ? bike.seller_name[0] : "B"}
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">
                    {bike.seller_name || "Verified Bike Seller"}
                  </h3>
                  <div className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                    <FaCheckCircle size={11} /> {bike.seller_type || "Authorized Dealer"}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-3">
                {bike.seller_phone && (
                  <>
                    <a
                      href={`tel:${bike.seller_phone}`}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/20 transition-all duration-200"
                    >
                      <FaPhoneAlt /> Call {bike.seller_phone}
                    </a>

                    <a
                      href={`https://wa.me/${bike.seller_phone.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 font-semibold text-sm transition"
                    >
                      <FaWhatsapp size={18} /> Chat on WhatsApp
                    </a>
                  </>
                )}

                <Link
                  href="/calculator"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
                >
                  <FaCalculator /> Calculate Loan EMI
                </Link>
              </div>

              {/* Estimated Monthly EMI */}
              {estimatedEMI > 0 && (
                <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Est. Bank EMI</span>
                    <span className="text-emerald-400 font-bold">~ ৳{estimatedEMI.toLocaleString()}/mo</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Based on 30% down payment ({formatBDPrice(downPayment)}) & 36-month tenure at 11% interest.
                  </p>
                </div>
              )}

              {/* Safety & Inspection Checklist */}
              <div className="mt-5 pt-4 border-t border-slate-800 text-xs space-y-2 text-slate-400">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <FaShieldAlt className="text-emerald-400" /> Buyer Safety Guarantee
                </div>
                <div>✓ Always inspect the motorcycle in daylight</div>
                <div>✓ Verify engine & chassis number with BRTA smart card</div>
                <div>✓ Never transfer funds before physical vehicle handover</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Bikes in Bangladesh */}
        {similarBikes.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-6">
              More Bikes You Might Like in Bangladesh
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarBikes.map((sim) => {
                const sId = sim._id || sim.id;
                const simImg =
                  (sim.images && sim.images[0]) ||
                  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop";
                return (
                  <Link
                    key={sId}
                    href={`/bikes/${sId}`}
                    className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition flex flex-col justify-between"
                  >
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={simImg}
                        alt={`${sim.make} ${sim.model}`}
                        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {sim.make} {sim.model} {sim.trim || ""}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {sim.engine_cc}cc • {sim.year} • {sim.location?.city || "Dhaka"}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <span className="text-sm font-extrabold text-emerald-400">
                        {formatBDPrice(sim.price_bdt)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
