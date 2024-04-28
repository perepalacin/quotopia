import { connectToDB } from "@/lib/utils/mongoConnect";

export const GET = async () => {
    try {
        await connectToDB();
        return new Response("pong", {status: 200})
    } catch (error) {
        return new Response("Server is down", {status: 500})
    }
}
