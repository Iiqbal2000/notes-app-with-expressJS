const express = require("express");
const router = express.Router();
const {
  addNoteController,
  getAllNotesController,
  getNoteByIdController,
  editNoteByIdController,
  deleteNoteController
} = require("./notes.controller");

router.route("/")
  .get(getAllNotesController)
  .post(addNoteController);

router.route("/:id")
  .get(getNoteByIdController)
  .put(editNoteByIdController)
  .delete(deleteNoteController);

module.exports = router;