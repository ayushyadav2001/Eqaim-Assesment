import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import blogRouter from "../backend/routes/blog-routes"
import router from "./routes/user-routes"


const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);




mongoose.connect('mongodb+srv://eqaimAdmin:Iw31jKyxBP1xOYmn@cluster0.1fsfipy.mongodb.net/Blog?retryWrites=true&w=majority')
.then(()=>{
    app.listen(port, () => {
        console.log(` app listening on port ${port}`)
      })
}).then(()=>console.log("Database Connected"))
.catch((err)=>console.log(err));


