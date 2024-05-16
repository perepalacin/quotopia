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
  try {

    const { userId } = getAuth(req);
    
    const id = params.id;
    if (!id) {
        return new Response("Missing quote ID to update", {status: 400});
    }

    if (!userId) {
        return new Response("Unauthorized user", { status: 401 });
    }

    await connectToDB();

    const alreadyLiked = await Quote.countDocuments({
        $and: [
          {_id: id},
          {favs: userId}
      ]
      });

    if (alreadyLiked === 1) {
        console.log("Already liked!");
        throw new Error("Already Liked quote");
    }

    const updatedQuote = await Quote.findByIdAndUpdate(
        id, 
        {
            $push: {favs: userId}
        });

    return new Response(JSON.stringify(updatedQuote), { status: 200 });

  } catch (error) {

    return new Response("Failed to update the quote", { status: 500 });

  }
}
