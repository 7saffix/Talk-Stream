import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
       await mongoose.connect(process.env.MONGODB_URI)
       console.log(`mongoDB connected successfully`); 
    } catch (error) {
        console.log(`database connection failed : ${error.toString()}`);
    }
}