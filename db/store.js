const util = require("util");
const fs = require("fs");

// this npm package will generate unique id's for our notes being stored
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // this is where the unique id is added using package required in line 5
    const newNote = { title, text, id: uuidv1() };

    return this.getNotes()

      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }
  //
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  //remove notes using unique id and write the filtered notes
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((notes) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();
