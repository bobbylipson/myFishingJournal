const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Songs must have a title"
    },
    artist: {
        type: String,
        trim: true,
        required: "Songs must have an artist"
    },
    genre: {
        type: String,
        default: "punk rock"
    },
    release_date: {
        type: Date,
        default: Date.now
    }
});
const Song = mongoose.model("Song", SongSchema);

module.exports = Song;
//turn it into a model

