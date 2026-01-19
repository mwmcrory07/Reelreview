const express = require('express')


const app = express()

const path = require("path")


app.use(express.static(path.join(__dirname,"Client side")))

app.get('/', function(req, resp){
   resp.sendFile("Client side","index.html")
})

app.listen(8090)