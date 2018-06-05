const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        unique: "Duplicate Article Title"
    },
    content:{
        type:String,
        required: true
    },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;