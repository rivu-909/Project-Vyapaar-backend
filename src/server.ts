import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";
import defaultRoute from "./routes/defaultRoute";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middleware/errorHandler";
import setHeaderConfig from "./middleware/setHeaderConfig";
import { mongodbUser, mongodbPass, port } from "./constants";
const app = express();

app.use(bodyParser.json());
app.use(setHeaderConfig);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/", defaultRoute);
app.use(errorHandler);

// DATABASE CONNECTION
const url = `mongodb+srv://${mongodbUser}:${mongodbPass}@projectv.5nrvym2.mongodb.net/`;

mongoose.connect(url).then((result) => {
    app.listen(port);
});
