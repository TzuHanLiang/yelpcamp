let express = require("express");
let app = express();

app.set("view engine", "ejs");

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

 let campgrounds = [
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=343c64df1b43f50769656d03c2b9f523&auto=format&fit=crop&w=750&q=80" },
        {name: "Granite Hill", image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=750&q=80" },
        {name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=750&q=80" },
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=343c64df1b43f50769656d03c2b9f523&auto=format&fit=crop&w=750&q=80" },
        {name: "Granite Hill", image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=750&q=80" },
        {name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=750&q=80" },
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=343c64df1b43f50769656d03c2b9f523&auto=format&fit=crop&w=750&q=80" },
        {name: "Granite Hill", image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=750&q=80" },
        {name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=750&q=80" },
        ];

app.get("/", function(req, res){
    res.render("landing");
});

// restful convention names:
// '/campgrounds' as a get, show all the campgrounds 
app.get("/campgrounds", function(req, res){
    // let campgrounds = [
    //     {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=343c64df1b43f50769656d03c2b9f523&auto=format&fit=crop&w=750&q=80" },
    //     {name: "Granite Hill", image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=750&q=80" },
    //     {name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=750&q=80" },
    //     ];
    res.render("campgrounds", {campgrounds: campgrounds});
});

// '/campgrounds' as a post, where you can create a new campground
app.post("/campgrounds", function(req, res){
    // get data from form and add to compgrounds array
    let name = req.body.name;
    let image = req.body.image;
    // console.log(image);
    let newCampground = {name: name, image:image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

// '/campgrounds/new' as a get, show the form that will send the data to 
app.get("/campgrounds/new", function(req, res) {
   res.render("new") ;
});

app.listen(process.env.PORT || 3000, function(){
    console.log("YelpCamp Server is on");
});