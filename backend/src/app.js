const express=require("express");
const app=express();
const cors=require("cors")

const aiRoutes=require("./routers/ai.router")


app.use(express.json())
app.use(cors());
app.use("/ai",aiRoutes);


module.exports=app;