import path from "path"
import dotenv from "dotenv"
import connectToDb from "./db/index.js"
dotenv.config()

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import receiptionistRouter from "./routes/receiptionist.routes.js"
import doctorRouter from "./routes/doctor.routes.js"

const app = express()

app.use(cors());
const __dirname = path.resolve();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/receptionist", receiptionistRouter);
app.use("/api/v1/users/doctor", doctorRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
export { app }


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    console.log(`Server is running at ${PORT}`)
    connectToDb();
})
