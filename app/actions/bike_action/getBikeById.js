"use server";

import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function getBikeById(id) {
  if (!id) return null;
  try {
    let query = {};
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { id: id }] };
    } else {
      query = { id: id };
    }
    const doc = await dbConnect("bikes").findOne(query);
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
  } catch (error) {
    console.error("Error fetching bike by id:", error);
    return null;
  }
}
