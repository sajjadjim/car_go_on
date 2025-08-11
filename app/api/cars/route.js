import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-static'

export async function GET() {
    const data = await dbConnect('cars').find({}).toArray();
    return Response.json( data )
}


