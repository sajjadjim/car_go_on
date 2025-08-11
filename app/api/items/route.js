import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-static'

export async function GET() {
    const data = await dbConnect('practice_data').find({}).toArray();
    return Response.json( data )
}


export async function POST(req) {
    const postedData = await req.json();

    const result = await dbConnect('practice_data').insertOne(postedData);
    // After the data update, this path revalidates the cache store data clear and new Data Taken from this link 
    revalidatePath('/products');
    return Response.json({ message: 'Data received successfully', result });
}