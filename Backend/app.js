import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";  
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/short.model.js"
const app=express();
dotenv.config("./.env");



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/api/create',(req,res)=>{ 
    const {url}=req.body;
    const shorturl=nanoid(7)
    const newUrl=new urlSchema({
        full_url:url,
        short_url:shorturl
    })
    newUrl.save()
  res.send(nanoid(7));
})

app.get("/:id",async(req,res)=>{
    const {id}=req.params;
    const url=await urlSchema.findOne({short_url:id});
    if(url) {
        res.redirect(url.full_url);
    } else{
        res.status(404).send("URL not found");
    }
})

app.listen(5000,()=>{
  connectDB()
    console.log("Server started on port https://localhost:");
});

