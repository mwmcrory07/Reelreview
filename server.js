const express = require('express');

const fs = require("fs");

const app = express();

const path = require("path");

const PORT = 3000;


const ADMIN_KEY = "m?B)j|fJKq06z]n)";

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
// POST method used for adding a new review to the server
app.post("/review/new", function(req,res){
   add_review(req.body);
   res.send("Successfully added review");
})


// POST method for adding a new film to the server
app.post("/films/new", function(req,res){
   let data = req.body;
   // Check to see if the request was sent by someone with access to admin code before storing data
   if (data.admin_key == ADMIN_KEY){
      let save_data = Object();
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
      res.send("Film has been added")
   }
   else{
      res.send("Incorrect admin key");
   }
})

// POST method for updating the value of the average rating on the server
app.post("/films/update" , function(req,res){
   let data = req.body;

   if (data.average_rating > 0 && data.average_rating < 5){
         fs.readFile("./films.json", function(err,data){
         let original_data = JSON.parse(data);
         for (let i=0;i<original_data.length;i++){
            if(data.title == original_data[i].title){
               original_data.average_rating = data.average_rating;
            }
         }
         fs.writeFileSync("./films.json",JSON.stringify(original_data));
      
      res.send("The average rating has been updated");
   })
   }
      
   else{
      res.send("Values given are not within correct range");
   }
}
)

// GET method for returning all the film data from the server
app.get("/films/all", function (req,res){

   fs.readFile("./films.json", function(err,data){
      res.send(data);
   });

   
})


// GET method for returning all of the review data from the server
app.get("/reviews/all", function(req,res){
   
   fs.readFile("./reviews.json", function(err,data){
      res.send(data);
   });
   
})

// GET method for returning director information from the server for a specific director
/*
app.get("/director/search/:id", function(req,res){
   
   fs.readFile("./directors.json", function(err,data){

      const js_data = JSON.parse(data);
      let found_director = false;
      for (i=0;i<js_data.length;i++){
         let formatted_director = js_data[i].director.replace(/ /g,"_")
         if(formatted_director == req.params.id){
            res.send(JSON.stringify(js_data[i]))
            found_director = true
         }
      }
      if (!found_director){
         res.send("That director doesn't exist on the server")
      }

   });

})
*/







app.listen(PORT)