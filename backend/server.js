import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinay.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

//app config

const app = express();
const port = process.env.PORT || 5000;
connectDB()
connectCloudinary()

//middleware

app.use(express.json());
app.use(cors());

//api endpoints

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);


app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});