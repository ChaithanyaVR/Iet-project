const mongoose = require('mongoose')
const IetSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    PhoneNumber:{type:Number,required:true},
    Email:{type:String,required:true},
    VerificationToken: String,
    IsEmailVerified: { type: Boolean, default: false } 
});
const Iet=mongoose.model("IetUserDetail",IetSchema)
module.exports=Iet