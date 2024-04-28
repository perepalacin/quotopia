import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected){
        console.log("MongoDB is already connected");
        return ;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            //change db name ot the one you want to use in your mongodb portal
            dbName: "quotopia",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("MongoDB connected succesfully");
    } catch (error) {
        console.log(error);
    }
}