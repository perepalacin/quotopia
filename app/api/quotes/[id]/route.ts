import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";

export async function GET (
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
        await connectToDB();

        const id = params.id;
        if (!id) return new Response("Id is not properly formatted.", {status: 400});
        console.log("we have id:" + id);
        const quote = await Quote.findById(id);
        console.log(id);
        if (!quote) return new Response("Quote Not Found", { status: 404 });

        return new Response(JSON.stringify(quote), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
