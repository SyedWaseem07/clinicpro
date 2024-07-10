// Dependency
import mongoose, { mongo } from "mongoose";

export const connectToDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo DB Connected Successfully");
    } catch (error) {
        console.error(`Error Connecting to DB : ${error.message}`);
        process.exit(1);
    }
}

export default connectToDb