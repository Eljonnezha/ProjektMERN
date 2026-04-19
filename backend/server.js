const express = require('express') 
const app = express() 
const mongoose = require('mongoose') 
const cors = require('cors') 
const session = require('express-session') 
const path = require("path")

require("dotenv").config();

const contactRoute = require("./routes/contactRoute")
const menuRoute = require("./routes/menuRoute")
const orderRoute = require("./routes/orderRoute")
const paymentRoute = require("./routes/paymentRoute");
const userRouter = require("./routes/userRouter") 

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


mongoose.connect(process.env.MONGO_URI) 
.then(() =>console.log("DB connected")) 
.catch((err) => console.log("Something is wrong", err)) 


// test
app.use(contactRoute)
app.use(menuRoute)
app.use(orderRoute)
app.use("/api/payment", paymentRoute);
app.use(userRouter);
app.use("/images", express.static(path.join(__dirname, "/images")));




// Server
app.listen(process.env.PORT, () => console.log('Server created'))