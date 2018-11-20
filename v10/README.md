#YelpCamp

##Initial Setup
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
   * Name
   * Image

##Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

##Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

##Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

##Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

##Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

##Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

##Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

##Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

##Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

##Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

##Style Show Page
* Add sidebar to show page
* Display comments nicely

##Finish Styling Show Page
* Add public directory
* Add custom stylesheet

##Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

##Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt. 3 - Login
* Add login routes
* Add login template

##Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 

##Refactor The Routes
* Use Express router to reoragnize all routes

##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

##Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

#Deleting Campgrounds
* Add Destroy Route
* Add Delete button

<!-- So authentication(身份驗證) and authorization(授權) there are different authentication refers to finding out if someone is who they say they are. Well authorization is once you know who someone is. You figure out what they're allowed to do. So think of it as permissions. What can someone what what is someone authorized to do with their security clearance in our application -->

#Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

Campground Edit Route: <!--/campgrounds/:id/edit-->
Comment Edit Route:   <!--/campgrounds/:id/comments/:comment_id/edit-->

#Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route: /campgrounds/:id
Comment Destroy Route:    /campgrounds/:id/comments/:comment_id

#Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware






* BOOTSTRAP NAV COLLPASE JS
* Flash Messages
* Refactor container div to header
* Show/hide delete and update buttons
* style login/register forms
* Random Background Landing Page
* Refactor middleware
* change styling in show template - comment delete/update
* UPDATE/DELETE CAMPGROUND


RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dogs
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     campgrounds/:id/comments/new    GET
CREATE  campgrounds/:id/comments      POST

express-session is an Express middleware used for persisting sessions across HTTP requests.

A session is a place to store data that you want access to across requests. Each user that visits your website has a unique session.  You can use sessions to store and access user data as they browse your application.

A cookie is usually a small piece of data that gets sent between a web server to your web browser. It allows the server to store information relevant to a specific user. One common use for cookies is to store session data.

You can read more details here: https://nodewebapps.com/2017/06/18/how-do-nodejs-sessions-work/

