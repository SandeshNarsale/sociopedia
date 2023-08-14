import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "http";
import { error } from "console";
import {register} from "./controllers/auth.js";
import { createPost} from "./controllers/posts.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { create } from "domain";
 import User from "./models/User.js";
 import Post from "./models/Post.js";
 import { users,posts } from "./data/index.js";
/*Configuration */
const __filename =fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename);
dotenv.config();
const app= express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended :"true"}));
app.use(bodyParser.urlencoded({limit : "30mb",extended :"true"}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname,'public/assets')));/*instead of public/assets we can use /assets*/

/* File Stoarge */
const storage = multer.diskStorage({             /*can save file like this format */
    destination :function(req, file, cb) {  
        cb(null,"public/assets"); /*in public/assets*/
    },
    filename: function(req, file ,cb){
        cb(null , file.originalname);
    }
});

const upload = multer({ storage});
/*Routes With File  */
app.post("/auth/register",upload.single("picture"), register);/* /auth/register is a route which acn accept image which then goes through upload(line 38) to stoarge(line 29) to public/assets(line 31)middleware function*/
app.post("/posts",verifyToken,upload.single("picture"),createPost);
/*Routes */
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);
/*Mongoose Setup */

const PORT=process.env.PORT || 6001; /* port from env 3001 if 3001 doesnot work then 6001 backup port*/
mongoose.connect(process.env.MONGO_URL ,
    {
        useNewUrlParser :true,
        useUnifiedTopology :true,

    }).then(()=>{
        app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));/* after mongodb connection run my server */
        /*Add data one time */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect `));