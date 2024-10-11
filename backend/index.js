import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js";

dotenv.config()
const PORT = process.env.PORT || 3000 ;

const app = express()

;(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running successfully at port :: ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1); 
    }
})();