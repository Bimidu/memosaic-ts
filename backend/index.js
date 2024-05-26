import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

import cors from 'cors';
import NoteRoute from "./routes/NoteRoute.js";

const app = express();

app.use(express.json());


app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome to memo');
});



app.use('/notes', NoteRoute);



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
