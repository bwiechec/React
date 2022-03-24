const mongoose = require("mongoose");
const db = require("../database")
const Schema = mongoose.Schema;

const noteModel = mongoose.model('Note', new Schema({
    id: Number,
    dateOf: Date, //YYYY-MM-DD
    titleOf: String,
    textOf: String
}));

module.exports = noteModel;