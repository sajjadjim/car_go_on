"use server";

import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

export const addNewBike = async (bikeData) => {
  try {
    const result = await dbConnect("bikes").insertOne(bikeData);
    revalidatePath("/bikes");
    revalidatePath("/home");
    return { success: true, insertedId: result.insertedId.toString() };
  } catch (error) {
    console.error("Error adding bike:", error);
    throw new Error(error.message || "Failed to add bike");
  }
};
