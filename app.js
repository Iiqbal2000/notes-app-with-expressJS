const express = require("express");
const app = express();
const port = 3000;
const notesRouter = require("./components/notes/notes.router");

app.use(express.json()) // for parsing application/json

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/notes", notesRouter);

// selain endpoint di atas
app.use("/", (req, res) => {
  res.status(404);
  res.send("Oooooh, Not Found!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});