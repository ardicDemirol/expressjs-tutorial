import express, { request, response } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.mjs";
import mongoose from "mongoose";
import dotenv from 'dotenv';


const app = express();
dotenv.config(); 

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(() => {
        console.log("Connection Failed");
    });


app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(session({
    secret:"juniperdevkey",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: 60000 * 60,
    },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Running on port ${PORT}`); });

   