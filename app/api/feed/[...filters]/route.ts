import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";
import { QuoteProps } from "@/types/types_d";
import { skip } from "node:test";

export async function GET (
    _req: Request,
    { params }: { params: { filters: string[] } }
  ) {
    try {
        await connectToDB();

        const limit = 20;
        
        const page = Number(params.filters[0]) - 1 || 0;
        const query = params.filters[1];
        const category = params.filters[2];
        if (!query) return new Error("Query string is missing.");
        if (isNaN(page) || page < 0) {
            throw new Error("Invalid pagination number");
        }
        var quotes: QuoteProps[] = [];
        var quotesCount = 0;
        switch(category) {
            case "Contents":
                quotes = await Quote.find({
                    quote: {"$regex": query, "$options": "i"}
                }).sort({lastedit: 'desc'})
                .skip(page * limit)    
                .limit(limit);

                quotesCount = await Quote.countDocuments({
                    quote: {"$regex": query, "$options": "i"}
                });
                break;
        
            case "Author":
                quotes = await Quote.find({
                    author: {"$regex": query, "$options": "i"}
                }).sort({author: 'asc'})
                .skip(page * limit)   
                .limit(limit);

                quotesCount = await Quote.countDocuments({
                    author: {"$regex": query, "$options": "i"}
                });
                break;

            case "Topics":
                quotes = await Quote.find({ topics: query }).sort({lastedit: 'desc'})
                .skip(page * limit)
                .limit(limit);
                quotesCount = await Quote.countDocuments({ topics: query });
                break;
        
            default: //else
                return new Response("Category to search for is missing.", {status: 400});
                break;
        }


        const response = {
            quotes: quotes,
            quotesCount: [quotesCount]
        };

        if (quotesCount === 0) return new Response("No quotes with the required filters were found", { status: 404 });
        return new Response(JSON.stringify(response), { status: 200 });

        

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
