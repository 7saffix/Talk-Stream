import jwt from "jsonwebtoken";

export const encodeToken = (res,userID)=>{
    const key = process.env.JWT_KEY;
    const expire = {expiresIn:'30d'};
    const payload ={userID}
    const token = jwt.sign(payload,key,expire)

    res.cookie('jwt',token,{
        maxAge:30 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV !== 'development'
    })
}


