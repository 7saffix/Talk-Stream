import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import route from "./routes/api.js";

dotenv.config()
const PORT = process.env.PORT || 3000 ;

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api',route)

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