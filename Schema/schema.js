const mongoose=require('mongoose')

const cnt_schema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true, 
    },
    numr:{
        type:Number,
        required:true,
        
    },
    loc:{
        type:String,
        required:true,
        // default--->only one value
        enum:['mobile','sim','email']  //for multiple values
    }

},{Timestamp:true})

module.exports=mongoose.model('cnt_schema',cnt_schema,'cnt_schema')

