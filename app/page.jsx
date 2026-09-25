import { redirect } from "next/navigation";

export const metadata = {
  title: "CarGoON BD | Bangladesh Car & Bike Marketplace",
  description: "Buy and sell cars and bikes in Bangladesh with verified pricing in BDT.",
};

export const viewport = {
  themeColor: "#020617",
};

export default function Page() {
  redirect("/home");
}
