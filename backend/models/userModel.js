import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true,require:true},
    email:{type:String,unique:true,require:true},
    fullName:{type:String,require:true},
    password:{type:String,require:true},
    profileImg:{type:String,default:''},
    coverImg:{type:String,default:''},
    bio:{type:String,default:''},
    link:{type:String,default:''},
    follower:[{type:mongoose.Schema.Types.ObjectId,ref:'userModel',default:[]}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:'userModel',default:[]}],
},{
    timestamps:true,
    versionKey:false 
});

const userModel = mongoose.model('users',userSchema) 
export default userModel