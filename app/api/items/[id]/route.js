import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET single data
export async function GET(req, { params }) {
  const p = await params;

  const singleDataFind = await dbConnect("practice_data").findOne({
    _id: new ObjectId(p.id),
  });

  return Response.json({
    singleDataFind,
    params: p,
    message: "Successfully fetched data",
  });
}

// DELETE single data
export async function DELETE(req, { params }) {
  const p = await params;

  const deleteResult = await dbConnect("practice_data").deleteOne({
    _id: new ObjectId(p.id),
  });

  return Response.json({
    deleteResult,
    params: p,
    message: "Successfully deleted data",
  });
}

// PATCH (Update) single data
export async function PATCH(req, { params }) {
  const p = await params;
  const body = await req.json(); // Updated fields from request body

  const updateResult = await dbConnect("practice_data").updateOne(
    { _id: new ObjectId(p.id) },
    { $set: body }
  );

  return Response.json({
    updateResult,
    params: p,
    message: "Successfully updated data",
  });
}
