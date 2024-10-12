import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { encodeToken } from "../utilities/encodeToken.js";

//Registration
export const signup =async(req,res)=>{
    try {
        const {fullName,username,email,password} = req.body;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.json({status:400,message:'invalid email format'})
        }

        const existEmail = await userModel.findOne({email})
        if(existEmail){
            return res.json({status:200,message:'email already registered'})
        }

        const existUsername = await userModel.findOne({username})
        if(existUsername){
            return res.json({status:200,message:'username already taken'})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({
            fullName,username,email,
            password:hashPassword
        })
        return res.json({status:201,message:'registration successful',user})
    } catch (error) {
        return res.json({status:500,message:error.toString()})
    }
}

// //login
export const login =async(req,res)=>{
    try {
        const {email,password} = req.body
        const user =await userModel.findOne({email})
        const isPasswordValid = await bcrypt.compare(password,user?.password || '')

        if(!user)return res.json({status:400,message:'invalid email'})
        if(!isPasswordValid)return res.json({status:400,message:'invalid password'})
        
        encodeToken(res,user._id)    
        return res.json({status:201,message:'login successful',user})
           
    } catch (error) {
        return res.json({status:500,message:error.toString()}) 
    }
} 

// //logout
export const logout = async(req,res)=>{
    try {
        res.cookie('jwt','',{maxAge:0})
        return res.json({status:201,message:'logout successful'})
    } catch (error) {
        return res.json({status:500,message:error.toString()})  
    }
}
