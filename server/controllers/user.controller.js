import UserModel from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await UserModel.findOne({ _id: userId })

        if (!user) {
            return res.status(404).json({message: "Current user not available."})
        }

        return res.status(200).json(user)
    } catch (error) {
        console.log("user.controller.js > getCurrentUser catch error: ", error)
        return res.status(500).json({message: `getCurrentUser error: ${error}`})
    }
}