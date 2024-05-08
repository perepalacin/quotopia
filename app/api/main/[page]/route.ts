import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";

export const GET = async (    
    req: Request,
    { params }: { params: { page: string } }
) => {

    try {
        const page = Number(params.page) - 1 || 0;
        if (isNaN(page) || page < 0) {
            throw new Error("Invalid page number");
        }
        await connectToDB();
        const quotes = await Quote.find({}).
        sort({lastedit: 'desc'})
        .skip(page * 20)
        .limit(20);

        const quotesCount = await Quote.countDocuments({});

        const response = {
            quotes: quotes,
            quotesCount: [quotesCount]
        };

        return new Response(JSON.stringify(response), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch the home page quotes", {status: 500})
    }
}
