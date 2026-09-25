import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const oid = (id) => {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
};

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    const _id = oid(id);
    let query = _id ? { $or: [{ _id }, { id }] } : { id };

    const doc = await dbConnect("bikes").findOne(query);
    if (!doc) return NextResponse.json({ error: "Bike not found" }, { status: 404 });

    return NextResponse.json({ ...doc, _id: doc._id.toString() }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    const _id = oid(id);
    if (!_id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const { deletedCount } = await dbConnect("bikes").deleteOne({ _id });
    if (!deletedCount) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ ok: true, id, message: "Deleted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updateResult = await dbConnect("bikes").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    return NextResponse.json({
      updateResult,
      message: "Successfully updated bike data",
    });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
