# Car GoON Bangladesh 🇧🇩🚗🏍️

> **Bangladesh's Premier Vehicle Marketplace for Buying and Selling Cars and Motorcycles at Real Market Prices.**

Car GoON is a full-featured vehicle buy-and-sell web application built with **Next.js 15 (App Router)**, **MongoDB**, **Firebase Authentication**, and **Tailwind CSS**. It is tailored specifically for the Bangladeshi market with realistic pricing in ৳ Lakh/Crore BDT, BRTA registration verification, physical showroom directories, and direct seller WhatsApp/phone contact.

---

## 🌟 Key Features

### 🇧🇩 1. Authentic Bangladeshi Market Focus
- **Realistic BDT Pricing**: Display and filter prices in standard Bangladeshi denominations (**৳ Lakh** and **৳ Crore**).
- **BRTA Paperwork Status**: Track vehicle registration serials (e.g., *Dhaka Metro-GA*, *Chatto Metro-LA*), tax tokens, fitness certificates, and smart card status.
- **Top Local Models**: Tailored presets for popular vehicles in Bangladesh (Toyota Premio, Allion, Corolla Axio, Honda Vezel, Noah, Harrier; Yamaha R15M V4, MT-15, Royal Enfield Classic 350, Suzuki Gixxer SF, Bajaj Pulsar N160).
- **Direct Seller Communication**: Connect directly with owners and authorized dealerships via direct phone call or WhatsApp without middleman broker fees.

### 🏍️ 2. Dedicated Motorcycle Marketplace (`/bikes`)
- Complete motorcycle catalog with filters by **Make**, **Division/City**, **Engine CC**, **Brake Type (Dual ABS, Single ABS, CBS)**, and **Price**.
- Detailed specifications for engine displacement (cc), cooling type, mileage (km/l), and transmission.

### 🚗 3. Cars Marketplace (`/cars`)
- Browse Japanese reconditioned, brand-new, and certified pre-owned cars.
- Filter by fuel type (**Hybrid**, **Octane**, **Electric/EV**, **Diesel**, **CNG/LPG**), body type (**Sedan**, **SUV**, **Microbus**), and transmission.

### 🌓 4. Automatic Device Dark & Light Mode
- **System / Device Auto-Detection**: Automatically matches the user's operating system preference (`prefers-color-scheme`).
- **Interactive Three-State Toggle**: Switch effortlessly between **Auto (Device)**, **Light**, and **Dark** modes via the navbar toggle.
- **Zero-Flicker Layout**: Inlined head script prevents white/dark flashes during initial hydration.
- **High-Contrast Design System**: Clean white card elevation with `#e2e8f0` borders in light mode, and futuristic sleek slate in dark mode.

### 🧮 5. Bangladesh Bank Loan EMI Calculator (`/calculator`)
- Estimate monthly installments and total interest with preset interest rates for Bangladeshi financial institutions (**City Bank**, **BRAC Bank**, **IDLC Finance**, **Eastern Bank**, **Mutual Trust Bank**).
- Dynamic down payment, tenure slider (1 to 7 years), and amortization breakdown.

### 🏢 6. Verified BD Showroom Directory (`/showrooms`)
- Directory of physical automobile showrooms across Dhaka (**Tejgaon Commercial Area**, **Banani**, **Uttara**, **Gulshan**) and **Chittagong (Agrabad)**.

### 🔍 7. Unified Multi-Vehicle Filter (`/filter`)
- Search across both cars and bikes simultaneously with combined keyword, division/city, and budget range filters.

### 📝 8. Multi-Vehicle Ad Submission (`/addCar`)
- Protected route allowing registered users to post either a **Car** or a **Motorcycle** with live image preview and instant Lakh price calculation.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15.5.26](https://nextjs.org/) (App Router, Server Actions, Dynamic Metadata)
- **Runtime**: React 18
- **Styling**: Tailwind CSS with custom light/dark design tokens
- **Database**: MongoDB (via native `mongodb` driver with connection pooling)
- **Authentication**: Firebase Authentication (Email/Password & Google Sign-In)
- **UI Components & Carousel**: `react-icons`, `react-fast-marquee`, `react-slick`
- **Security & Vulnerability Patches**: Next.js `15.5.26` patched against CVE-2025-55182

---

## 📁 Project Structure

```
car_go_on/
├── app/
│   ├── actions/
│   │   ├── bike_action/          # getBikes, getBikeById, addNewBike
│   │   └── car_action/           # getCars, getCarById, addNewCar
│   ├── addCar/                   # Post free Car or Motorcycle ad
│   ├── api/
│   │   ├── bikes/                # REST endpoints for bikes
│   │   └── cars/                 # REST endpoints for cars
│   ├── authentications/
│   │   ├── login/                # Firebase login page
│   │   └── signup/               # Firebase registration page
│   ├── bikes/
│   │   ├── [id]/                 # Bike details page with specs & WhatsApp
│   │   └── page.jsx              # Bikes marketplace catalog
│   ├── calculator/               # Bangladesh Auto Loan EMI Calculator
│   ├── cars/
│   │   ├── [id]/                 # Car details page with specs & BRTA info
│   │   └── page.jsx              # Cars marketplace catalog
│   ├── components/
│   │   └── ThemeToggle.jsx       # Auto/Light/Dark mode switcher
│   ├── context/
│   │   ├── AuthContext.jsx       # Firebase user state
│   │   └── ThemeContext.jsx      # System & manual theme provider
│   ├── filter/                   # Unified multi-vehicle search
│   ├── home/
│   │   └── components/
│   │       ├── BrandsMarquee.jsx # Dynamic theme-adaptive manufacturer ticker
│   │       ├── FeaturedVehicles.jsx # Verified cars & bikes tabs
│   │       ├── HeroSearch.jsx    # Dual car/bike hero search hub
│   │       ├── MarketPriceGuide.jsx # Bangladesh market price benchmarks
│   │       └── WhyChooseUsBD.jsx # How CarGoON works + seller CTA banner
│   ├── showrooms/                # Physical showroom directory
│   ├── globals.css               # Light & Dark theme tokens
│   └── layout.jsx                # Root layout with theme anti-flash script
├── lib/
│   ├── dbConnect.js              # Cached MongoDB client connection pool
│   ├── firebase.init.js          # Firebase SDK initialization
│   └── vehicleUtils.js           # BDT currency formatters, BD cities, data presets
├── .env.local                    # Environment credentials
├── package.json                  # Dependencies & allowScripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.18 or higher (Node 20+ recommended)
- **MongoDB**: A MongoDB Atlas cluster or local MongoDB instance
- **Firebase**: A Firebase project with Authentication enabled (Email/Password & Google)

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/car_go_on.git
cd car_go_on
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
DB_NAME=car_go_on

# App Base URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=car-go-on.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=car-go-on
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=car-go-on.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=364584407286
NEXT_PUBLIC_FIREBASE_APP_ID=1:364584407286:web:your_app_id
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## ☁️ Deployment Guide

### Deploy to Vercel
1. Push your code to GitHub/GitLab.
2. Import the repository in [Vercel](https://vercel.com).
3. Add the environment variables from `.env.local`.
4. Deploy! Vercel automatically detects Next.js 15 and builds without issues.

### Deploy to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com).
2. Set the build command to `npm run build` and publish directory to `.next`.
3. Configure your environment variables in Netlify site settings.
4. **Security Note**: This repository uses **Next.js `15.5.26`**, which satisfies Netlify's security check for [CVE-2025-55182](https://ntl.fyi/cve-2025-55182) and avoids HTTP 400 deploy block errors.
5. Lifecycle script execution for packages like `@tailwindcss/oxide` and `sharp` is authorized via `allowScripts` in `package.json`.

---

## 📜 License

This project is licensed under the MIT License.
