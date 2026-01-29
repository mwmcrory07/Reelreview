const fs = require("fs");

const express = require("express");

const app = express();

const path = require("path");

const ADMIN_KEY = "m?B)j|fJKq06z]n)";

const VALID_REVIEWS = ["I loved this film","This film was enjoyable","This film was good but not really the type of film I enjoy","I didn't like this film"]

const SYMBOLS = ["''",'""',"*","!","(",")","<",">","@","{","}","^","!",";","#",",","=","+","_","~"];
app.use(express.json());

app.use(express.static(path.join(__dirname,"Client side")));

// Validates that a given string doesn't contain certain symbols and actually exists
function validate_string(input){
   let valid = true;
   if (!input){
      return false;
   }
   for (let i=0;i<input.length;i++){
      if (SYMBOLS.includes(input[i])){
         valid = false;
      }
   }
   return valid;
}

// Validates an image link
function validate_img(input){
   try {
      if (input.slice(0,5) == "http:" || input.slice(0,6) == "https:"){
         return true;
      }
      else{
         return false;
      }
   }
   catch{
      return false;
   }
 
}

// Function which adds a new review to the reviews.json file
function add_review(review){
   
   
   fs.readFile("./reviews.json", function(err,data){

   const reviews = JSON.parse(data);
   const js_review = review;

   reviews.push(js_review);
   
   fs.writeFileSync("./reviews.json",JSON.stringify(reviews));

})
}
// POST method used for adding a new review to the server
app.post("/review/new", function(req,res){
   let is_validated = true;
   let data = req.body;
   is_validated = validate_string(data.film);
   if (!VALID_REVIEWS.includes(data.review)){
      is_validated = false;
   }
   if (data.rating < 0 || data.rating > 5){
      is_validated = false;
   }
   if (is_validated){
   try{
   add_review(req.body);
   res.status(201).send("Successfully added review");
   }
   catch{
      res.status(500).send("Error occured when adding to the server");
   }
   }
   else{
      res.status(400).send("Incorrect values given for the review");
   }
})


// POST method for adding a new film to the server
app.post("/films/new", function(req,res){
   let data = req.body;

   let is_validated = true;

   let save_data = Object();

   if (validate_string(data.title) && validate_string(data.director) && validate_string(data.img_src) && validate_img(data.image) && data.average_rating >= 0 && data.average_rating <= 5){
      is_validated = true;
   }
   else{
      is_validated = false;
   }
 
      if(is_validated){

         save_data.title = data.title;
         save_data.image = data.image;
         save_data.director = data.director;
         save_data.average_rating = data.average_rating;
         save_data.img_src = data.img_src;
         fs.readFile("./films.json", function(err,data){
            let original_data = JSON.parse(data);
            original_data.push(save_data);
            fs.writeFileSync("./films.json",JSON.stringify(original_data));
         })
         res.status(201).send("Film has been added");
      }
      else{
         res.status(400).send("Values inputted in incorrect format");
      }
   }
)

// POST method for updating the value of the average rating on the server
app.post("/films/update" , function(req,res){
   let client_data = req.body;

   if (client_data.average_rating > 0 && client_data.average_rating <= 5){
         fs.readFile("./films.json", function(err,data){
         let original_data = JSON.parse(data);
         let found = false;
         for (let i=0;i<original_data.length;i++){
            if(client_data.title == original_data[i].title){
               original_data[i].average_rating = client_data.average_rating;
               found = true;
            }
         }
         if (found){
         fs.writeFileSync("./films.json",JSON.stringify(original_data));
         res.status(200).send("The average rating has been updated");
         }
         else{
            res.status(400).send("That film doesnt exist");
         }
   })
   }
      
   else{
      res.status(400).send("Values given are not within correct range");
   }
}
)

// GET method for returning all the film data from the server
app.get("/films/all", function (req,res){
   try{
   fs.readFile("./films.json", function(err,data){
      res.status(200).send(data);
   });
   }
   catch{
      res.status(500).send("Error with retrieving data from the server");

   }

   
})


// GET method for returning all of the review data from the server
app.get("/reviews/all", function(req,res){
   try{
   fs.readFile("./reviews.json", function(err,data){
      res.status(200).send(data);
   });
   }
   catch{
      res.status(500).send("Error with retrieving data from the server");
   }
   
})

// GET method for returning the review that is most recent to a given film
app.get("/reviews/last/:film", function (req,res){
   let formatted_film = req.params.film.replace(/_/g," ");
   fs.readFile("./reviews.json", function(err,data){
      let js_data = JSON.parse(data);
      let counter = js_data.length - 1;
      let found = false;
      while (!found && counter > -1) {
         if (js_data[counter].film == formatted_film){
            found = true;
            res.status(200).json({
               "review" : js_data[counter].review
            })
         
         }
         else{
            counter = counter - 1;
         }
      }
      if (!found){
         res.status(200).json({
               "review" : "There has been no reviews yet for this film"
            })
      }
   });
})

module.exports = app;