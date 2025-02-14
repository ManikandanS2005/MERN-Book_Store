import { Router } from "express";
import { Book } from "../model/bookModel.js";
import mongoose from "mongoose";

const router =Router()


router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' });
        }

        const newBook = { title, author, publishYear };
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to get books from database
router.get('/', async(req,res)=>{
    try {
        const books= await Book.find();
        return res.status(200).json({ count: books.length, data: books });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

//Route to get one book
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid book ID format' });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }

        return res.status(200).json({ book });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to update a Book
router.put('/:id', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' });
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid book ID format' });
        }

        const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            return res.status(404).send({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book updated successfully', data: result });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to delete a book
router.delete('/:id', async(req,res)=>{
    try {
        const {id}= req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result)
        {
            return res.status(404).send({ message: 'Book not found' });

        }
        return res.status(200).send({ message: 'Book deleted  successfully', data: result });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
        
    }
})

export default  router;