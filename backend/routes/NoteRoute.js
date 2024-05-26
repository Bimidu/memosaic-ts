import {NoteRecord} from "../models/NoteModel.js";
import express from "express";

const router = express.Router();

// create a new record
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.date ||
            !request.body.time ||
            !request.body.name ||
            !request.body.content ||
            !request.body.author
        ) {
            return response.status(400).send({
                message: 'Send all required fields: date, type, name',
            });
        }

        const NewNoteRecord = {
            date: request.body.date,
            time: request.body.time,
            name: request.body.name,
            content: request.body.content,
            author: request.body.author
        };

        const NotesRecord = await NoteRecord.create(NewNoteRecord);
        return response.status(201).send(NotesRecord);

    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get All from database

router.get('/', async (request, response) => {
    try {
        const NotesRecord = await NoteRecord.find({});

        return response.status(200).json({
            count: NotesRecord.length,
            data: NotesRecord,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One transaction from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const NotesRecord = await NoteRecord.findById(id);

        return response.status(200).json(NotesRecord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a transaction
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.date ||
            !request.body.time ||
            !request.body.name ||
            !request.body.content ||
            !request.body.author
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        const result = await NoteRecord.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Transaction record not found' });
        }

        return response.status(200).send({ message: 'Transaction record updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await NoteRecord.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Transaction record not found' });
        }

        return response.status(200).send({ message: 'Transaction record deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;