const express = require('express');
const { createNote, getAllnotes, deleteNote, updateNote } = require('../controllers/note.controller');


const noteRouter = express.Router();

noteRouter.post("/todos", createNote)
noteRouter.get("/todos", getAllnotes)
noteRouter.put("/todos/:id", updateNote)
noteRouter.delete("/todos/:id", deleteNote)

module.exports = noteRouter