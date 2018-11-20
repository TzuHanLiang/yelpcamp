let mongoose = require("mongoose"),
    passLocalMongoose = require("passport-local-mongoose");

let userSchema = mongoose.Schema({
    username: String,
    password: String,
});

userSchema.plugin(passLocalMongoose);

module.exports = mongoose.model("User", userSchema);