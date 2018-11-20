let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("process.env.MONGODB_URI || mongodb://localhost/yelp_camp_v2", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//SCHEMA SETUP
let campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=750&q=80" ,
//         description: "This is a huge granite hill, no bathroom. no water. Beautiful granite!"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("------success-------");
//             console.log(campground);
//         }
//     });


app.get("/", function(req, res){
    res.render("landing");
});

// restful convention names:
// '/INDEX - show all the campgrounds 
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({},  function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: campgrounds});
        }
    });
    
});

// CREATE -  create a new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to compgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {
        name: name, 
        image:image,
        description: description
    };
    
    // with database setup, we can create a new Campground and save to DB
    // instead of doing this campgrounds.push(newCampground);
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log(err);
        }else{
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
            console.log("___success___");
            console.log(newCampground);
        }
    });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
   res.render("new") ;
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campround with provided ID
      let id = req.params.id;
      Campground.findById(id, function(err, foundCampground){
          if(err){
              console.log(err)
          }else{
              // render show template with that campground
              res.render("show", {campground: foundCampground});
          }
      });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("YelpCamp Server is on");
});