// app/cars/page.jsx
import { getCars } from "@/app/actions/car_action/getCars";
import CarsBrowser from "@/app/cars/components/CarsBrowser";

export default async function CarsPage() {
  const cars = await getCars(); // expects an array of car objects
  return <CarsBrowser initialCars={cars} />;
}
