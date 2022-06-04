import "./mongodb.js";
import routes from "./routes/index.js";
import express, { urlencoded, json } from "express";
import cors from "cors";
const app=express();

app.use(cors());

app.use(urlencoded({ extended : false }));


app.use(json());

app.use('/api', routes);

app.listen(process.env.APP_PORT, () => console.log(`listening on port ${process.env.APP_PORT}.`));