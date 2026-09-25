// lib/vehicleUtils.js

/**
 * Formats a number into Bangladeshi currency format (৳ Lakh / Crore representation)
 * e.g., 3450000 -> "৳34.50 Lakh"
 *       14500000 -> "৳1.45 Crore"
 *       605000 -> "৳6.05 Lakh"
 *       85000 -> "৳85,000"
 */
export function formatBDPrice(n) {
  const num = Number(n) || 0;
  if (num >= 10000000) {
    const crore = (num / 10000000).toFixed(2);
    return `৳${crore.replace(/\.00$/, "")} Crore`;
  }
  if (num >= 100000) {
    const lakh = (num / 100000).toFixed(2);
    return `৳${lakh.replace(/\.00$/, "")} Lakh`;
  }
  return `৳${num.toLocaleString("en-BD")}`;
}

/**
 * Formats exact BDT with comma standard for Bangladesh
 * e.g., 3450000 -> "৳34,50,000"
 */
export function formatBDT(n) {
  const num = Number(n) || 0;
  try {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `৳${num.toLocaleString("en-BD")}`;
  }
}

/**
 * Full combined label: "৳34.50 Lakh (৳34,50,000)"
 */
export function formatBDPriceFull(n) {
  const num = Number(n) || 0;
  const shortStr = formatBDPrice(num);
  const fullStr = formatBDT(num);
  if (num >= 100000) {
    return `${shortStr} (${fullStr})`;
  }
  return fullStr;
}

export const BD_CITIES = [
  "All Cities",
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Bogura",
  "Cumilla",
  "Mymensingh",
  "Gazipur",
  "Narayanganj"
];

export const CAR_MAKES = [
  "Toyota",
  "Honda",
  "Nissan",
  "Mitsubishi",
  "Hyundai",
  "Kia",
  "Suzuki",
  "BYD",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Mazda",
  "Ford"
];

export const BIKE_MAKES = [
  "Yamaha",
  "Royal Enfield",
  "Honda",
  "Suzuki",
  "Bajaj",
  "TVS",
  "Hero",
  "KTM",
  "Lifan",
  "Kawasaki"
];

export const BD_SHOWROOMS = [
  {
    id: "progoti-banani",
    name: "Progoti Auto Hub Banani",
    city: "Dhaka",
    address: "Road 11, Block D, Banani, Dhaka-1213",
    rating: 4.9,
    reviews: 142,
    phone: "+880 1712-345678",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
    specialty: "Japanese Reconditioned Sedans & Luxury SUVs",
    verified: true,
  },
  {
    id: "tejgaon-auto-zone",
    name: "Tejgaon Mega Car & Bike Zone",
    city: "Dhaka",
    address: "185-188 Shahid Tajuddin Ahmed Sarani, Tejgaon, Dhaka",
    rating: 4.8,
    reviews: 210,
    phone: "+880 1711-223344",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    specialty: "Official Dealerships, EVs, Hybrids & Sports Bikes",
    verified: true,
  },
  {
    id: "crescent-yamaha",
    name: "Crescent Enterprise Flagship (Yamaha)",
    city: "Dhaka",
    address: "Plot 29, Main Road, Mirpur 10, Dhaka",
    rating: 4.9,
    reviews: 320,
    phone: "+880 1712-889900",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
    specialty: "Authorized Yamaha Sports Bikes & Scooters",
    verified: true,
  },
  {
    id: "ifad-royal-enfield",
    name: "Ifad Motors Flagship (Royal Enfield BD)",
    city: "Dhaka",
    address: "Tejgaon Commercial Area, Dhaka",
    rating: 5.0,
    reviews: 95,
    phone: "+880 1700-778899",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800&auto=format&fit=crop",
    specialty: "Official Royal Enfield Classic 350 & Hunter 350",
    verified: true,
  },
  {
    id: "chattogram-auto-emporium",
    name: "Chattogram Auto Emporium",
    city: "Chittagong",
    address: "Agrabad Commercial Area, Chittagong",
    rating: 4.8,
    reviews: 115,
    phone: "+880 1713-009988",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop",
    specialty: "Port Direct Reconditioned Vehicles & Commuter Bikes",
    verified: true,
  }
];
