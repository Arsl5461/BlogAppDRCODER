const express=require("express")
const app=express();
const PORT=8082;
const {connectDb}=require("./config/connectDb")
const blogRoute=require("./routes/blog.route")
const userRoute=require("./routes/user.route")
const cors=require("cors")

connectDb();
app.use(cors())
app.use(express.json())

app.use("/api/blog",blogRoute)
app.use("/api/user",userRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})