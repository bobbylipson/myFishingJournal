const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Album must have a title"
    },
    artist: {
        type: String,
        trim: true,
        required: "Albums must have an artist"
    },
    genre: {
        type: String
    },
    release_date: {
        type: Date,
        default: Date.now
    },

    songs: [{
        type: Schema.Types.ObjectId,
        ref: "Song"
    }]
});
const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
//turn it into a model