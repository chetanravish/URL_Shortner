import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from "express";
import dotenv from "dotenv";  
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/short.model.js";
import short_url from "./src/routes/shorturl_route.js";
import { redirectFromShortUrl } from "./src/controller/short_url_controller.js";
import { errorHandler } from "./src/utils/error_handler.js";
import cors from "cors";
import routeAauth from "./src/routes/route_auth.js";
import routeUser from './src/routes/user_route.js'
import cookieParser from "cookie-parser";
import { attachUSer } from "./src/utils/attach_user.js";
const app=express();
dotenv.config("./.env");
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://url-shortener-alb-1306131148.ap-northeast-1.elb.amazonaws.com"
  ],
  credentials: true,
}));
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(attachUSer)

app.get("/", (req, res) => {
  res.status(200).json({ message: "URL Shortener API Running" });
});

app.use('/api/user',routeUser)
app.use('/api/auth',routeAauth)
app.use('/api/create',short_url)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
});

