const { nanoid } = require("nanoid");
const data = require("../../data");

const addNoteController = (req, res) => {
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const { title = 'untitled', tags, body } = req.body;

  const newNote = {
    id, title, tags, body, createdAt, updatedAt,
  };

  data.push(newNote);

  const isSuccess = data.filter((note) => note.id === id).length > 0;
  
  if(isSuccess === 0) {
    return res.status(500).json({message: "Catatan gagal ditambahkan"});
  }

  return res.status(201).json({
    status: "success",
    message: "Catatan berhasil ditambahkan",
    id: newNote.id,
  });
};

const getAllNotesController = (req, res) => {
  return res.status(200).json({
    status: "success",
    data: data,
  })
};

const getNoteByIdController = (req, res) => {
  const paramId = req.params.id;
  const getNote = data.filter((note) => {
    return note.id === paramId;
  });

  if(getNote.length > 0) {
    return res.status(200).json({
      status: "success",
      data: getNote,
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Catatan tidak ditemukan"
  });
};

const editNoteByIdController = (req, res) => {
  const paramId = req.params.id;
  const indexNote = data.findIndex((note) => note.id === paramId);

  if(indexNote === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Catatan tidak ditemukan"
    });
  }

  const { title = 'untitled', tags, body } = req.body;
  
  const updatedAt = new Date().toISOString();

  data[indexNote] = {
    ...data[indexNote],
    title,
    tags,
    body,
    updatedAt
  };
  
  return res.status(200).json({
    status: "success",
    message: "Catatan berhasil diperbarui"
  });
}

const deleteNoteController = (req, res) => {
  const paramId = req.params.id;
  const indexNote = data.findIndex((note) => note.id === paramId);

  if(indexNote === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Catatan tidak ditemukan"
    });
  }

  data.splice(indexNote, 1);
  return res.status(200).json({
    status: "success",
    message: "Catatan berhasil dihapus"
  });
};


module.exports = {
  addNoteController,
  getAllNotesController,
  getNoteByIdController,
  editNoteByIdController,
  deleteNoteController};