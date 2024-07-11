import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("Please define the MONGO_URI environment variable inside .env.local");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("MongoDB connected!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};
