import { connectToDB } from "@/lib/utils/mongoConnect";
import Quote from "@/types/mongoModels";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  console.log("We get the user");
  console.log(userId);

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log("authorized");
  try {
    await connectToDB();

    const quotes = await Quote.find({ creator: userId }).sort({
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
