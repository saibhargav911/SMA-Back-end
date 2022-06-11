import "./mongodb.js";
import routes from "./routes/index.js";
import express, { urlencoded, json } from "express";
import cors from "cors";
import logger from "./middleware/logger.js";
import ResponseHandler from "./middleware/responseHandler.js";
const app=express();

app.use(cors());

app.use(urlencoded({ extended : false }));


app.use(json());

app.use('/api', routes);
const errorHandler=async (err,req,res,next) => {
    logger.info(` ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.send(await ResponseHandler.failureResponse("Error",err));
}

app.use(errorHandler);

app.listen(process.env.APP_PORT, () => console.log(`listening on port ${process.env.APP_PORT}.`));