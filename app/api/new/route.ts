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

export async function POST(req: NextRequest) {
  //We get the data!
  const { userId } = getAuth(req);
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
    const newQuote = new Quote({
      creator: userId,
      author: author,
      favs: 0,
      lastedit: new Date(),
      quote: quote,
      topics: topics,
    });

    await newQuote.save();

    return new Response(JSON.stringify(newQuote), { status: 200 });
  } catch (error) {
    return new Response("Failed to upload the quote", { status: 500 });
  }
}
