import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";

export const GET = async () => {
    try {
        await connectToDB();
        const quotes = await Quote.find({}).sort({lastedit: 'desc'});
        return new Response(JSON.stringify(quotes), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch the home page quotes", {status: 500})
    }
}
