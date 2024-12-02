const express=require('express')
const app=express();
let {PORT,MONGODB_URI}=require('./config/index')
const schema=require('./Schema/schema')
const {engine}=require('express-handlebars')
const mongoose=require('mongoose')
const routing=require('./router/router')
const path=require('path')

app.engine('handlebars',engine())
app.set('view engine','handlebars')

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public'))) 

let connectdb=async()=>{
    let connection=await mongoose.connect(MONGODB_URI);
    console.log("coonected succssfully");
}
connectdb();
   
app.get('/',(req,res)=>{
    res.render('home',{title:'Home page'})
})
app.get('/home',(req,res)=>{
    res.render('home',{title:'Home page'})
})

app.use('/api',routing)

app.listen(PORT,err=>{
    if(err) throw err;
    console.log("server is running on port 5000");
    
})