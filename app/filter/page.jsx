import { getCars } from "@/app/actions/car_action/getCars";
import { getBikes } from "@/app/actions/bike_action/getBikes";
import UnifiedFilterClient from "./components/UnifiedFilterClient";

export const metadata = {
  title: "Filter & Compare Cars & Bikes | Car GoON Bangladesh",
  description: "Advanced search & filter tool for cars and motorcycles in Bangladesh. Compare prices in BDT, fuel types, and locations.",
};

export default async function FilterPage() {
  const [cars, bikes] = await Promise.all([getCars(), getBikes()]);
  return <UnifiedFilterClient cars={cars} bikes={bikes} />;
}
