// app/api/cars/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// const oid = (id) => { try { return new ObjectId(id); } catch { return null; } };
// const col = () => dbConnect("cars");

// export async function GET(_req, { params }) {
//   try {
//     const _id = oid(params.id);
//     if (!_id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
//     const doc = await (await col()).findOne({ _id });
//     if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
//     return NextResponse.json(doc, { status: 200 });
//   } catch (e) {
//     return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
//   }
// }
const oid = (id) => { try { return new ObjectId(id); } catch { return null; } };
const col = async () => dbConnect("cars");

// GET /api/cars/:id  -> returns one car (JSON) by Mongo _id
export async function GET(_req, { params }) {
  try {
    const _id = oid(params.id);
    if (!_id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const doc = await (await col()).findOne({ _id });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // normalize for client use (stringify _id)
    return NextResponse.json({ ...doc, _id: doc._id.toString() }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const _id = oid(params.id);
    if (!_id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const { deletedCount } = await (await col()).deleteOne({ _id });
    if (!deletedCount) return NextResponse.json({ error: "Not found" }, { status: 404 });
    // Return JSON (NOT 204) to avoid frontend .json() crash
    return NextResponse.json({ ok: true, id: params.id, message: "Deleted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}

// PATCH (Update) single data
export async function PATCH(req, { params }) {
  const p = await params;
  const body = await req.json(); // Updated fields from request body

  const updateResult = await dbConnect("cars").updateOne(
    { _id: new ObjectId(p.id) },
    { $set: body }
  );

  return Response.json({
    updateResult,
    params: p,
    message: "Successfully updated data",
  });
}



