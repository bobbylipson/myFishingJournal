const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
mongoose.connect(process.env.MONGGODB_URI || "mongodb://localhost/example_songs")

const db = require("./models");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

app.get("/populate", (req, res) => {
    db.Album.create({ title: "Cats...AHAHHAA", artist: "kTTy$"}).then(function(dbAlbum){
        db.Song.create({ title: "Sunbeam", artist: "kTTy$"}).then(function(dbSong){
            db.Album.findOneAndUpdate({_id: dbAlbum._id}, {$push: { songs: dbSong._id}}, {new: true}).then(function(){
                res.json(dbSong);
            });
        });
    });
});

app.get("/api/album", (req, res) => {
    db.Album.find({})
        .populate("songs")
        .then(function(dbAlbum){
            res.json(dbAlbum);
        })
});

app.listen(PORT, () => {
    console.log(`Listening on :${PORT}`)
});