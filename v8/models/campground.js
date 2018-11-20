let mongoose = require("mongoose");

//SCHEMA SETUP
let campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
});

module.exports = mongoose.model("Campground", campgroundSchema);


// db.campgrounds.find() {
//     "_id": ObjectId("5bf140cf064799921e010ff2"),
//     "comments": [
//         ObjectId("5bf140d9064799921e010ff3"),
//         ObjectId("5bf140f7064799921e010ff6")
//     ],
//     "name": "free yourself",
//     "image": "https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=51fddf4b092d3c27c2021234a9f3433f&auto=format&fit=crop&w=934&q=80",
//     "description": "You are re-establishing the relationship with yourself cheer up!",
//     "__v": 2
// }