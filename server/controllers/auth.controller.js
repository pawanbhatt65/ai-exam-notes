import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * during singing google authentication, and signin successfully
 */
export const googleAuth=async(req, res)=>{
    try {
        const {name, email} = req.body;
        let user = await UserModel.findOne({email})
        if (!user) {
            user = UserModel.create({
                name, email
            })
        }
        let token = await getToken(user._id)
        // console.log("fetch token from auth.controller.js > googleAuth: ", token)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            samesite: "strict", // on production it will be: none
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.status(200).json(user);
    } catch (error) {
        console.log("auth.controller.js > googleAuth catch error: ", error)
        return res.status(500).json({message: `google signup error: ${error}`})
    }
}

/**
 * User logout successfully
 */
export const logout=async(req, res)=>{
    try {
        await res.clearCookie("token")
        return res.status(200).json({message: "User has been logout successfully."});
    } catch (error) {
        console.log("auth.controller.js > logout catch error: ", error)
        return res.status(500).json({message: `logout error: ${error}`})
    }
}