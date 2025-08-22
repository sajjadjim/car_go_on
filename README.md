# Car GoON

A modern car marketplace built with **Next.js (App Router)**, **Tailwind CSS**, and **Firebase Authentication** — styled with a clean dark/glass UI. Deployed to **Firebase Hosting** with SSR.

## ✨ Features

- **Next.js App Router** (server + client components)
- **Authentication** with Firebase (Email/Password + Google)
- **Protected routes** (e.g. `Add Car` only for signed-in users)
- **Cars Browser** with sort + pagination
- **Car Details** page with gallery; **Edit Car** form with live previews
- Responsive, accessible UI (Tailwind, icons, glassmorphism)
- Environment-driven config via `.env.local`
- Deployable to **Firebase Hosting (web frameworks backend / SSR)**

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **npm** (or `pnpm` / `yarn` — stick to one manager)
- A Firebase project + Web app

### 1) Install
```bash
npm ci   # or: npm install
```

### 2) Configure environment
Create **`.env.local`** in the project root:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=car-go-on.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=car-go-on
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=car-go-on.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=364584407286
NEXT_PUBLIC_FIREBASE_APP_ID=1:364584407286:web:783997e2e8a609ef0f1cd7
```

> These keys are *public* client config for Firebase Web SDK. Actual security lives in your Firestore/Storage rules and backend logic.

### 3) Dev server
```bash
npm run dev
```
- App runs at `http://localhost:3000`
- Uses Turbopack by default

### 4) Production build
```bash
npm run build
npm run start
```

---

## 🧭 Project Structure (key parts)

```
app/
  actions/
    car_action/
      addNewCar.ts            # server action / API call
      getCarById.ts
  api/
    cars/route.ts             # POST/GET cars (if used)
    cars/[id]/route.ts        # PATCH/DELETE (if used)
  authentications/
    login/page.jsx
    signup/page.jsx
  components/
    HomeCarousel.jsx
    CarBrandsMarquee.jsx
    CarsBrowser.jsx
    EditCarForm.jsx
    SafeImg.jsx
  context/
    AuthContext.jsx
  cars/
    page.jsx                  # listing page (browser)
    [id]/page.jsx             # car details (SSR)
    [id]/edit/page.jsx        # edit form (protected)
  addCar/page.jsx             # protected route
  profile/page.jsx            # user profile
  navbar/page.jsx
  footer/page.jsx
  layout.jsx                  # root layout
  page.jsx                    # homepage (sections imported)

public/
  car/*                       # sample images
  logo/*                      # brand logos
  favicon.ico | icon.png
```

---

## 🔐 Authentication

- **Context**: `app/context/AuthContext.jsx` wraps the app and exposes:
  - `createUser(email, password)`
  - `signIn(email, password)`
  - `signInWithGoogle()`
  - `updateUserProfile({ displayName, photoURL })`
  - `logOut()`
  - `user` and `loading` states

- **Protected UI**:
  - Navbar shows **Login / Sign up** when signed out
  - Shows **Profile (avatar icon)** and **Add Car** only when signed in
  - `addCar` page performs a client-side check and redirects to `/authentications/login` if not signed in

> For stricter protection, you can add a server-side check with middleware or server actions to block non-auth users at the route boundary.

---

## 🛠️ Styling & Components

- Tailwind-based dark theme + glassmorphism
- Reusable components:
  - `HomeCarousel` (react-slick), `CarBrandsMarquee` (react-fast-marquee)
  - `CarsBrowser` (cards, pagination, sort)
  - `EditCarForm` (live image preview, feature chips)
  - `SafeImg` (client-only image with graceful fallback; fixes Server Component `onError` issue)

---

## ☁️ Deploy to Firebase Hosting (SSR)

Use **web frameworks** integration (recommended). Do **not** use `public + rewrites` for Next.js SSR.

### 0) Install & login
```bash
npm i -g firebase-tools
firebase login
```

### 1) Initialize (frameworks)
```bash
firebase init hosting
# -> Use existing project: car-go-on
# -> Detected Next.js? Yes
# -> Choose region (e.g., asia-east1)
```
It will create a `firebase.json` like:
```json
{
  "hosting": {
    "source": ".",
    "frameworksBackend": { "region": "asia-east1" }
  }
}
```

### 2) Build & deploy
```bash
firebase deploy
```
Firebase CLI will build your app and deploy static assets + SSR backend automatically.

> **Preview deploy** (no prod impact): `firebase hosting:channel:deploy staging`

---

## 🧳 Alternative: Static Export (not recommended here)

Only if you can live **without SSR / API routes / server actions**:

- `next.config.js`:
  ```js
  /** @type {import('next').NextConfig} */
  const config = {
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: true,
  };
  module.exports = config;
  ```
- Pre-generate all dynamic routes with `generateStaticParams`
- Export:
  ```bash
  npm run build
  npx next export -o out
  ```
- Host `out/` via Firebase:
  ```json
  { "hosting": { "public": "out" } }
  ```

---

## 🧩 Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## 🧰 Common Issues & Fixes

- **Windows + OneDrive `readlink EINVAL` during build/deploy**  
  Move the project out of OneDrive (e.g., `C:\dev\car_go_on\`), or mark the folder *Always keep on this device* and pause sync. Delete `.next` and rebuild.

- **`next` is not recognized**  
  Run `npm ci` to restore `node_modules`. Ensure `next`, `react`, `react-dom` are in `dependencies`.

- **`themeColor` warnings**  
  In App Router, set `export const viewport = { themeColor: '#0f172a' }` and **remove** `themeColor` from `metadata` exports.

- **Remote images not loading**  
  Configure `next.config.(js|mjs)` `images.remotePatterns` for domains you use.

---

## 📜 License

MIT © Car GoON
