import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes";
import ablyRoutes from "./routes/ablyRoutes";
import productRoutes from "./routes/productRoutes";
import tradeRoutes from "./routes/tradeRoutes";
import requestRoutes from "./routes/requestRoutes";
import newsRoutes from "./routes/newsRoutes";
import defaultRoute from "./routes/defaultRoute";
import errorHandler from "./middleware/errorHandler";
import setHeaderConfig from "./middleware/setHeaderConfig";
import { mongodbUser, mongodbPass, port } from "./constants";
const app = express();

app.use(cors());
app.use(helmet());
app.use(setHeaderConfig);
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/ably", ablyRoutes);
app.use("/product", productRoutes);
app.use("/trade", tradeRoutes);
app.use("/request", requestRoutes);
app.use("/news", newsRoutes);
app.use("/", defaultRoute);
app.use(errorHandler);

// DATABASE CONNECTION
const url = `mongodb+srv://${mongodbUser}:${mongodbPass}@projectv.5nrvym2.mongodb.net/`;

mongoose.connect(url).then((result) => {
    app.listen(port);
});
