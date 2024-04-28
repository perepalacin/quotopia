import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (_req: NextRequest, res: NextResponse) => {
    // const {
    //     creator,
    //     author,
    //     favs,
    //     lastedit,
    //     quote,
    //     topics
    // } = await req.json(); 

    try {
        await connectToDB();
        const newQuote = new Quote({
            creator: '1234',
            author: 'Alexander the Great',
            favs: 0,
            lastedit: new Date(),
            quote: "Ad Astra",
            topics: ["Glory", "Fame"],
        });

        await newQuote.save();

        return new Response(JSON.stringify(newQuote), {status: 200});
    }catch (error) {
        return new Response("Failed to upload the quote", {status: 500});
    }
}