const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// *************** General setup ******************
// express.urlencoded() recognizes the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// We need express.json() because Axios automatically converts the JS object to JSON data in a POST request
// express.json() parses and recognizes the incoming Request Object as a JSON Object.
app.use(express.json());

// **************** Database **********************
mongoose.connect("mongodb://localhost:27017/stickynotesDB");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

// *************** Routes *********************
app.get("/", function (req, res) {
  // console.log(__dirname + "/../");
  Note.find({}, function (err, notes) {
    if (err) {
      console.log("Error", err);
    } else {
      res.send(notes);
    }
  });
});

app.post("/", function (req, res) {
  const stickyNote = req.body;
  const newNote = new Note(stickyNote);
  newNote.save(function (err) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Note saved!");
      res.redirect("/");
    }
  });
});

app.post("/delete", function (req, res) {
  const deleteStickyNote = req.body;
  Note.findByIdAndDelete(deleteStickyNote._id, function (err, deletedNote) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", deletedNote);
      res.redirect("/");
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully.");
});
