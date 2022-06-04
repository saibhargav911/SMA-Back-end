import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

//creating mongo connection

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    //useFindAndModify: false,
    //useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
	console.log("Connected successfully");
});