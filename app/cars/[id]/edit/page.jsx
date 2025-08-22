// app/cars/[id]/edit/page.jsx
import { notFound } from "next/navigation";
import { getCarById } from "@/app/actions/car_action/getCarById";
import EditCarForm from "../../components/EditCarForm";


export const revalidate = 0; // always fresh after updates

export default async function EditCarPage({ params }) {
  // params.id is the Mongo _id in the URL: /cars/:id/edit
  const car = await getCarById(params.id);
  if (!car) return notFound();

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-5xl  mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl text-white font-bold">
        Edit Car — {car.make} {car.model}
      </h1>
      <p className="text-gray-200 mt-1">ID: {car._id}</p>

      <div className="pt-5 ">
        <EditCarForm initialCar={car} />
      </div>
    </div>
    </div>
  );
}
