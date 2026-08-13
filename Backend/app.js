import express from "express";
import { nanoid } from "nanoid";
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
app.use(cors(
  {origin:'http://localhost:5173',
    credentials:true
  }
));
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(attachUSer)

app.use('/api/user',routeUser)
app.use('/api/auth',routeAauth)
app.use('/api/create',short_url)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

app.listen(5000,()=>{
  connectDB()
    console.log("Server started on port https://localhost:");
});
