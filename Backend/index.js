const {connection}=require("./database/db")

const express=require("express");

const app=express();

const cors=require("cors");
app.use(cors({origin:"*"}))

app.use(express.json())
const {postRoute}=require("./Route/post.route")
app.use("/",postRoute)

app.get("/hello",(req,res)=>{
    res.send("welcome to To-Do App")
})

app.listen(3500,async()=>{
    try {
        await connection
        console.log("connection established")
    } catch (error) {
        console.log(error)
    }
    console.log("server listening on port 3500")
})