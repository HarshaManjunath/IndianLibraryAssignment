const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const addLibrarySchema = new Schema({
    name: {
        type: String,
        default: "",
    },
    published: {
        type: Number,
        default: 0000,
    },
    author: {
        type: String,
        default: "",
    },
    domain: {
        type: String,
        default: "",
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    availabilityDate: {
        type: String,
        default: "",
    },
    createdDate: {
        type: Date,
        default: new Date(),
    },
});

const addLibrary = mongoose.model("addLibrary", addLibrarySchema);
module.exports = addLibrary;
