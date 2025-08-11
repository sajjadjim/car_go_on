"use server";

import dbConnect from "@/lib/dbConnect";

export const  addNewCar = async (carData) => {
    try {
        const result = await dbConnect('cars').insertOne(caraData);
        // After the data update, this path revalidates the cache store data clear and new Data Taken from this link
        revalidatePath('/cars');
        return result;
    } catch (error) {
        console.error("Error posting data:", error);
        return new Response("Failed to post data", { status: 500 });
    }

}