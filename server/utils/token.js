import jwt from "jsonwebtoken"

export const getToken=async(userId)=>{
    try {
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"})
        // console.log("token is: ", token)
        return token;
    } catch (error) {
        console.log("token.js > getToken catch error: ", error)
        return res.status(500).json({message: `getToken error: ${error}`})
    }
}