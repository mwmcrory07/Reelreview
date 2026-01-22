const express = require('express')

const fs = require("fs")

const app = express()

const path = require("path")




app.use(express.static(path.join(__dirname,"Client side")))


let data = JSON.stringify([{
    "film": "Interstellar",
    "review": "I liked this film",
    "rating" : 3

}])

function add_review(review){

   fs.readFile("./reviews.json", function(err,data){

   if (err) throw error;
   const reviews = JSON.parse(data);
   const js_review = JSON.parse(review);
   reviews.push(js_review);
   
   fs.writeFileSync("./reviews.json",JSON.stringify(reviews));

})
}



app.listen(8090)