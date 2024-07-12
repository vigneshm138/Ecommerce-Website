import express from 'express';
// import { userRegistration } from './Routes/userRoutes.js';
import dotenv from 'dotenv';
import { connectDB } from './Database/db.js';

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 2001;


import userRoutes from './Routes/userRoutes.js'
// User Details Register In MongoDB
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server Is Running Port ${port}`)
    connectDB()
}
)
