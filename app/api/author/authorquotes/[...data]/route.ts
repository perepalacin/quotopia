import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";

export async function GET (
    _req: Request,
    { params }: { params: { data: string[] } }
  ) {
    try {
        await connectToDB();

        const author = params.data[0];
        const id = params.data[1];
        if (!author) return new Response("Author name is missing.", {status: 400});
        if (!id) return new Response("Reference Id is missing.", {status: 400});
        const quotes = await Quote.find(
            {
                $and: [
                    {_id: {$ne: id}},
                    {author: author}
                ]
            }
        ).sort({lastedit: 'desc'}).limit(25);
        if (quotes.length === 0) return new Response("Failed to fetch realted quotes", { status: 404 });

        return new Response(JSON.stringify(quotes), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
