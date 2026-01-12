

require("dotenv").config();
const app=require("./src/app.js");

app.get("/",(req,res)=>{
    res.send("hello!");
})

app.listen(3000,()=>{
    console.log("port is listening to localhost:3000");
})