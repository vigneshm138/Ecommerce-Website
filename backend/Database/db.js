import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Data Base Connected");
    } catch (error) {
        // res.send
    }
}