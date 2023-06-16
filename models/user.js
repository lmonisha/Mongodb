const mongoose=require('mongoose');
const Schema=mongoose.Schema

const userSchema=new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    mobileNo:{
        type:Number
    }
},{timestamps:true})

const user=mongoose.model('User',userSchema)
module.exports=user