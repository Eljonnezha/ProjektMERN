const express = require('express') 
const app = express() 
const mongoose = require('mongoose') 
const cors = require('cors') 
const session = require('express-session') 

const contactRoute = require("./routes/contactRoute")
const menuRoute = require("./routes/menuRoute")
const orderRoute = require("./routes/orderRoute")

app.use(cors( 
{ 
credentials: true, 
origin: "http://localhost:3000", 
exposedHeaders: ["set-cookie"], 
})) 
app.use(session({ 
secret: "This will be secret", 
resave: false, 
saveUninitialized: true, 
cookie: {maxAge: 1000 * 60 * 60 * 24} 
})) 
app.use(express.json({ limit: "1000mb", extended: true })); 


mongoose.connect('mongodb+srv://eljon:Nezha24@cluster0.6hz38da.mongodb.net/food-ordering-app?retryWrites=true&w=majority') 
.then(() =>console.log("DB connected")) 
.catch((err) => console.log("Something is wrong", err)) 


// test
app.use(contactRoute)
app.use(menuRoute)
app.use(orderRoute)
app.use("/images", express.static("images"));




// Server
app.listen(5000, () => console.log('Server created'))