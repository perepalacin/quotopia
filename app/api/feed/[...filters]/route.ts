import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";
import { QuoteProps } from "@/types/types_d";

export async function GET (
    _req: Request,
    { params }: { params: { filters: string[] } }
  ) {
    try {
        await connectToDB();

        const query = params.filters[0];
        const category = params.filters[1];
        if (!query) return new Response("Query string is missing.", {status: 400});
        var quotes: QuoteProps[] = [];
        switch(category) {
            case "Contents":
                quotes = await Quote.find({
                    quote: {"$regex": query, "$options": "i"}
                });    
                break;
        
            case "Author":
                quotes = await Quote.find({
                    author: {"$regex": query, "$options": "i"}
                });   
                break;

            case "Topics":
                quotes = await Quote.find({ topics: query });
                break;
        
            default: //else
                return new Response("Category to search for is missing.", {status: 400});
                break;
        
        }

        if (quotes.length === 0) return new Response("No quotes with the required filters were found", { status: 404 });
        return new Response(JSON.stringify(quotes), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
