const express=require('express');
const app=express();
const path=require('path');
// const bodyParser=require('body-parser');
const fs=require('fs');
const mongoose = require('mongoose');
const User=require('./model');

const dotenv = require('dotenv');
const alert=require('alert');
dotenv.config();


// express specific stuff
app.use('static',express.static('static'));
app.use(express.urlencoded());
// app.use(bodyParser.urlencoded({extended:true}));


// pug specific stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


mongoose.connect(process.env.MONGO_URI,
()=>{
    console.log("connected to mongodb"),
    e=>{
        console.log(e);
    }
});


let history = [];

//Endpoints
app.get('/',(req,res)=>{
   
    res.status(200).render('home.pug');
})
app.get('/history',async(req,res)=>{
    try{
        // const users= await User.find();
        const params={history};
        res.status(200).render('history.pug',params);
    }
    catch(err){
        console.log("error"+err);
        res.send('error'+err);
    }
})
app.get('/transfer',async(req,res)=>{
    try{
        const users= await User.find();
        const params={users};
        res.status(200).render('transfer.pug',params);
    }
    catch(err){
        console.log("error"+err);
        res.send('error'+err);
    }
})
app.post('/transfer',async(req,res)=>{
    sender=req.body.select1;
    receiver=req.body.select2;
    amount=Number(req.body.amount);
    const user1= await User.findById(sender);
    const user2= await User.findById(receiver);
    history=[user1.name,user2.name,amount,user1.date];
    if(amount>user1.balance){
        alert('You have less Balance in your account to Transfer!');
        res.redirect('/transfer');
    }else{
        user1.balance-=amount;
        user2.balance+=amount;
        await user1.save();
        await user2.save();
        // const userArray=[user1,user2];
        // res.send(userArray);
        alert("Your money is Tranferred Successfully");
        res.redirect('/transfer');
    }

})
app.get('/members', async(req, res) => {
    try{
        const users= await User.find();
        const params={users};
        res.status(200).render('members.pug',params);
    }
    catch(err){
        console.log("error"+err);
        res.send('error'+err);
    }
})
app.get('/add', async(req, res) => {
    res.status(200).render('add.pug');     
})
app.post('/add', async(req, res) => {
    try{
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        balance:req.body.balance,
        accountNo:req.body.accountNo
    })
   
        await user.save();
        res.status(200).render('add.pug');
    }
    catch(err){
        console.log("error"+err);
        res.send('error'+err);
    }
})



const port=process.env.PORT || 8000;
//starting the server
app.listen(port,()=>{
    console.log(`starting at port ${port}`);
})

