const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
//Add other bits of info to this too
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true }, //The username
    // email:   { type: String, required: true, unique: true}, //ToDo: add validation of email
    password: { type: String, required: true }, //the encrypted user password
    // verified: { type: Boolean, default: false }  //if the user is validated
});

UserSchema.pre('save', function(next){
    //If they modified the pasword of this is a new user
    if(this.isModified('password') || this.isNew){
        //Generate 10 rounds of salt and hash
        bcrypt.hash(this.password, 10, (err, hash) => {
            if(err){ return next(err); }
            this.password = hash;
            return next();
        });
    } else {
        return next();
    }
})

UserSchema.methods.comparePassword = function(pass, cb){
    bcrypt.compare(pass, this.password, (err, isMatch) => {
        if(err){ return cb(err)}
        cb(null, isMatch);
    })
};

const User = mongoose.model("User", UserSchema);
module.exports = User;