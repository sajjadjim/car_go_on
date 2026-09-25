"use server";

import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

export const addNewCar = async (carData) => {
  try {
    const result = await dbConnect("cars").insertOne(carData);
    revalidatePath("/cars");
    revalidatePath("/home");
    return { success: true, insertedId: result.insertedId.toString() };
  } catch (error) {
    console.error("Error posting car data:", error);
    throw new Error(error.message || "Failed to post car data");
  }
};