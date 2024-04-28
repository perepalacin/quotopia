import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";

export async function GET (
    _req: Request,
    { params }: { params: { author: string } }
  ) {
    try {
        await connectToDB();

        const author = params.author;
        if (!author) return new Response("Author name is missing.", {status: 400});
        const quote = await Quote.find(
            {
                $and: [
                    {_id: {$ne: "662e3a49c09e91a3fdd81282"}},
                    {author: author}
                ]
            }
        );
        if (!quote) return new Response("Quote Not Found", { status: 404 });

        return new Response(JSON.stringify(quote), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
