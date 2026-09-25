"use server";

import dbConnect from "@/lib/dbConnect";

export const getBikes = async () => {
  try {
    const bikes = await dbConnect("bikes").find({}).sort({ _id: -1 }).toArray();
    return JSON.parse(JSON.stringify(bikes));
  } catch (error) {
    console.error("Error fetching bikes:", error);
    return [];
  }
};
