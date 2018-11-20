// the point of a seed's file is that we can run it to seed our
// database with some data.

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
        name: "Kingston lake",
        image: "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=63ffaa8c9b9aca319b57204b5d620f56&auto=format&fit=crop&w=750&q=80",
        description: "Camping in Northern Michigan will probably always be my happy place."
    },
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-0.3.5&s=565d683d4df97d1679f8345160735320&auto=format&fit=crop&w=752&q=80",
        description: "My sister and I went backpacking in Arches National Park over the summer. In some panic ridden state, we woke up and barely caught the sunrise."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1461770354136-8f58567b617a?ixlib=rb-0.3.5&s=2d9240d0cd7578db44a94bb0bf9da5cf&auto=format&fit=crop&w=750&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1537387788952-cffe9f8d3090?ixlib=rb-0.3.5&s=4f00908a251774227dfa4031fb83c06f&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        // if (err) {
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        // Comment.remove({}, function(err) {
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
        //add a few campgrounds
        // data.forEach(function (seed) {
        //     Campground.create(seed, function (err, campground) {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log("added a campground");
        //             //create a comment
        //             Comment.create({
        //                 text: "This place is great, but I wish there was internet",
        //                 author: "Homer"
        //             }, function (err, comment) {
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("Created new comment");
        //                 }
        //             });
        //         }
        //     });
        // });
        // });
    });
    //add a few comments
}

module.exports = seedDB;

