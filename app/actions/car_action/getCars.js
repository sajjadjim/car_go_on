"use server";

import dbConnect from "@/lib/dbConnect";

export const getCars = async () => {
  try {
    const products = await dbConnect("cars").find({}).sort({ _id: -1 }).toArray();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};