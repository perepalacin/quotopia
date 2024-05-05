import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }
) {

  //We should read the user session from the auth, to make this api call protected!

  if (!params.userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    await connectToDB();

    const quotes = await Quote.find({ creator: params.userId }).sort({
      lastedit: "desc",
    });
    console.log(quotes);
    if (!quotes) {
      return new Response("Profile  Not Found", { status: 404 });
    }
    console.log("Done!");
    return new Response(JSON.stringify(quotes), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
