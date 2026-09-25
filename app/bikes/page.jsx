import { getBikes } from "@/app/actions/bike_action/getBikes";
import BikesBrowser from "./components/BikesBrowser";

export const metadata = {
  title: "Bikes for Sale in Bangladesh | Current Market Price & Verified Sellers",
  description: "Browse Yamaha, Royal Enfield, Honda, Suzuki, Bajaj, and TVS bikes for sale in Bangladesh with current market prices in BDT, BRTA registration info, and seller contact.",
};

export default async function BikesPage() {
  const bikes = await getBikes();
  return <BikesBrowser initialBikes={bikes} />;
}
