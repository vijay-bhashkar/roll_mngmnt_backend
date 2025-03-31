import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { DB_NAME } from "../constants.js"

const connectDb = async( ) => {
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(connection.connection.port, "Database Connected Successfully")
    }catch(error){
        console.log("Error in Database Connection: ", error);
    }
}

export default connectDb;

