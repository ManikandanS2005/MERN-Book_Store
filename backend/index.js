import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from 'cors';

const app = express();

// Middleware to parse JSON
app.use(express.json());


app.use(cors());

app.use(cors(
    {
        origin:'http://localhost:5173',
        methods:['GET','PUT','POST','DELETE'],
        allowedHeaders:['Content-Type'],
    }
));


app.use('/books',booksRoutes)

app.get('/', (req, res) => {
    return res.status(200).send("hi");
});


mongoose.connect(MongoDBURL)
    .then(() => {
        console.log("Mongodb Connected Successfully");
        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
