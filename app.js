const express=require('express');
const app=express();
const path=require('path');
// const bodyParser=require('body-parser');
const fs=require('fs');
const port=8000;

// express specific stuff
app.use('static',express.static('static'));
app.use(express.urlencoded());
// app.use(bodyParser.urlencoded({extended:true}));


// pug specific stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Endpoints
app.get('/',(req,res)=>{
   
    res.status(200).render('home.pug');
})
app.get('/history',(req,res)=>{
   
    res.status(200).render('history.pug');
})
app.get('/transfer',(req,res)=>{
   
    res.status(200).render('transfer.pug');
})
app.get('/members',(req,res)=>{
   
    res.status(200).render('members.pug');
})




//starting the server
app.listen(port,()=>{
    console.log(`starting at port ${port}`);
})

