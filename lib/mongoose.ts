import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MONGO connection missing !!");
  }

  if (isConnected) {
    return console.log("Mongo is connected!");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "code-nest",
    });
    isConnected = true;
  } catch (err) {
    console.log("MONGO_ERROR__ : ", err);
  }
};
