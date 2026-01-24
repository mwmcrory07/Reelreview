const express = require('express');

const fs = require("fs");

const app = express();

const path = require("path");

const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname,"Client side")));



// Function which adds a new review to the reviews.json file
function add_review(review){
   
   
   fs.readFile("./reviews.json", function(err,data){

   const reviews = JSON.parse(data);
   const js_review = review;

   reviews.push(js_review);
   
   fs.writeFileSync("./reviews.json",JSON.stringify(reviews));

})
}
// Post method used for adding a new review to the server
app.post("/review/new", function(req,res){
   add_review(req.body);
   res.send("Successfully added review");
})

// Get method for returning all the film data from the server

app.get("/films/all", function (req,res){

   fs.readFile("./films.json", function(err,data){
      res.send(data);
   });

   
})



app.listen(PORT)