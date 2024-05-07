import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { isArrayOfStrings, isString } from "@/lib/utils/TypeChecker";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }
) {
  //We get the data!
  const { userId } = getAuth(req);
  
  const id = params.id;
  if (!id) {
    return new Response("Missing quote ID to update", {status: 400});
  }

  const data = await req.json();
  if (!data) {
    return new Response("Missing request data", { status: 400 });
  }

  const quote = String(data.quote);
  const author = String(data.author);
  const topics = data.topics;
  
  if (!isString(quote)) {
    return new Response("Improperly formated quote data", { status: 400 });
  }
  if (!isString(author)) {
    return new Response("Improperly formated author name", { status: 400 });
  }
  if (!isArrayOfStrings(topics)) {
    return new Response("Improperly formated topics", { status: 400 });
  }
  if (!userId) {
    return new Response("Unauthorized user", { status: 401 });
  }

  try {
    await connectToDB();
    const updatedQuote = await Quote.findByIdAndUpdate(
        id, 
        {
            author: author,
            lastedit: new Date(),
            quote: quote,
            topics: topics,
        });

    await updatedQuote.save();

    return new Response(JSON.stringify(updatedQuote), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the quote", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }
) {
  //We get the data!
  console.log("Here");
  const { userId } = getAuth(req);
  console.log(userId);
  
  const id = params.id;
  console.log(id);
  if (!id) {
    return new Response("Missing quote ID to update", {status: 400});
  }

  if (!userId) {
    return new Response("Unauthorized user", { status: 401 });
  }

  try {
    await connectToDB();
    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return new Response("Quote not found", { status: 404 });
    }

    return new Response("Quote deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the quote", { status: 500 });
  }
}
