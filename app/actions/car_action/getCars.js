"use server";

import dbConnect from "@/lib/dbConnect";

export const getCars = async () => {

    try {
        const products = await dbConnect('cars').find({}).toArray();
        return products;

    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
}