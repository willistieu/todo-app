const noteModel = require("../models/note.model");
const { tokendecoded } = require("../plugins/encryption");

const createNote = async (req, res) => {
  try {
    const { name, description } = req.body;
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = await authorization.split(" ")[1];
      const userId = await tokendecoded(token);
      if (userId === "Authorization is fail!") {
        res.status(400).json({ message: "Note isn't created!" });
      } else {
        const note = await noteModel.create({
          name: name,
          description: description,
          userId: userId,
        });
        res.status(201).json(note);
      }
    } else {
      res.status(400).json({ message: "The request isn't authorization!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllnotes = async (req, res) => {
  try {
    const statusQuery = req.query.status;
    if (statusQuery) {
      const notes = await noteModel.findAll({
        where: {
          status: statusQuery,
        },
      });
      res.status(200).json({ notes: notes, length: notes.length });
    } else {
      const notes = await noteModel.findAll();
      res.status(200).json({ notes: notes, length: notes.length });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await noteModel
      .destroy({
        where: {
          id: id,
        },
      })
      .then((result, error) => {
        if (error) {
          res.status(400).json(error);
        } else {
          if (result === 1) {
            res.status(200).json({ message: "the note is deleted." });
          } else {
            res.status(200).json({ message: "the note doesn't exist." });
          }
        }
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateNote = async (req, res) => {
  try {
    const id = req.params;
    const body = req.body;

    await noteModel
      .update(body, {
        where: {
          id: id,
        },
      })
      .then((result, error) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(result);
        }
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createNote,
  getAllnotes,
  deleteNote,
  updateNote,
};
