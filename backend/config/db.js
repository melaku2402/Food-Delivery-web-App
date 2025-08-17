import mongoose from "mongoose";

 export const connectDB = async () => {
    await mongoose
      .connect(
        "mongodb+srv://adanemelaku517:mk24022179@cluster0.bvqqr2l.mongodb.net/food-del"
        // 'mongodb+srv://melakuadane:mk24022179@cluster0.ws5iljd.mongodb.net/food-del'
      )
      .then(() => {
        console.log("Database Connected");
      });
}

