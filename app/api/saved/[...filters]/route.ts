import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, 
  { params }: { params: { filters: string[] } }
) {

  const userId = params.filters[0];
  const page = Number(params.filters[1]) - 1;
  const query = params.filters[2];
  const category = params.filters[3];

  const limit = 20;
  
  //We should read the user session from the auth, to make this api call protected!
  try {
      
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }
    await connectToDB();

    var quotes = [];
    var quotesCount = 0;

    if (!query || !category) {
      quotes = await Quote.find({ favs: userId }).sort({
        lastedit: "desc",
      })
      .skip(page*limit)
      .limit(limit);
      quotesCount = await Quote.countDocuments({ favs: userId });
      
    } else {
      switch(category) {
        case "Contents":
            quotes = await Quote.find({
              $and: [
                {favs: userId},
                {quote: {"$regex": query, "$options": "i"}}
            ]
            }).sort({lastedit: 'desc'})
            .skip(page*limit)
            .limit(limit);    
            
            quotesCount = await Quote.countDocuments({
              $and: [
                {favs: userId},
                {quote: {"$regex": query, "$options": "i"}}
            ]
            });
            break;
        case "Author":

            quotes = await Quote.find({
              $and: [
                {favs: userId},
                {author: {"$regex": query, "$options": "i"}}
            ]
            }).sort({author: 'asc'})
            .skip(page*limit)
            .limit(limit);  
            
            quotesCount = await Quote.countDocuments({
              $and: [
                {favs: userId},
                {author: {"$regex": query, "$options": "i"}}
            ]
            });
            break;

        case "Topics":
            quotes = await Quote.find({ 
              $and: [
                {favs: userId},
                {topics: {"$regex": query, "$options": "i"}}
            ]
            }).sort({lastedit: 'desc'})
            .skip(page*limit)
            .limit(limit);

            quotesCount = await Quote.countDocuments({ 
              $and: [
                {favs: userId},
                {topics: {"$regex": query, "$options": "i"}}
            ]
            });
            break;

            default: //else
            return new Response("Category to search for is missing.", {status: 400});
          }

        }
        
        if (!quotes) {
          return new Response("Saved quotes not found", { status: 404 });
        }

        const response = {
          quotes: quotes,
          quotesCount: [quotesCount]
        };
        
    return new Response(JSON.stringify(response), { status: 200 });

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
