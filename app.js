const express = require("express");
const path = require("path");
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
const app = express();
const port = 8000;

//we don't use bodyparser in this website

//making here the database of mongodb 
//next two lines taking from mongodb documentation of v5.9.6
// getting-started.js
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});



//Making/Defining the Schema of Mongodb database
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const contact = mongoose.model('contact', contactSchema);


//EXPRESS SPECIFIC STUFF
//making a static file
app.use('/static',express.static('static'))
app.use(express.urlencoded())


//PUG SPECIFIC STUFF
app.set('view engine','pug')//setting the template engine as pug
app.set('views',path.join(__dirname,'views'))//setting the views directory for pug

//ENDPOINTS
//sending the variable of html in pug
app.get('/',(req,res)=>{
    const params ={}
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params ={}
    res.status(200).render('contact.pug',params)
})

//saving the data of the contact into our "contactDance" database with using body-parser so we want to download body-paser
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body)
    myData.save().then(()=>{
           res.send("your items have been sucessefully send")
        
        //if the error happens then using below syntax
    }).catch(()=>{
        res.status(400).send("This items has not been saved")
    })
})




// Starting the server
app.listen(port,()=>{
    console.log(`The application started sucessfully on port ${port}`)
})