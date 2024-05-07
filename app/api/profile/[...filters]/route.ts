import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, 
  { params }: { params: { filters: string[] } }
) {

  const userId = params.filters[0];
  const query = params.filters[1];
  const category = params.filters[2];
  //We should read the user session from the auth, to make this api call protected!
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    await connectToDB();

    var quotes = [];

    if (!query || !category) {
      quotes = await Quote.find({ creator: userId }).sort({
        lastedit: "desc",
      });
    } else {
      switch(category) {
        case "Contents":
            quotes = await Quote.find({
              $and: [
                {creator: userId},
                {quote: {"$regex": query, "$options": "i"}}
            ]
            }).sort({lastedit: 'desc'});    
            break;
    
        case "Author":
            quotes = await Quote.find({
              $and: [
                {creator: userId},
                {author: {"$regex": query, "$options": "i"}}
            ]
            }).sort({author: 'asc'});   
            break;

        case "Topics":
            quotes = await Quote.find({ 
              $and: [
                {creator: userId},
                {topics: {"$regex": query, "$options": "i"}}
            ]
            }).sort({lastedit: 'desc'});
            break;
    
        default: //else
            return new Response("Category to search for is missing.", {status: 400});
      }
    }

    if (!quotes) {
      return new Response("Profile  Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(quotes), { status: 200 });

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
