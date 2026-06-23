import { BaseUrl } from "../BaseUrl"
import { setUserData } from "../redux/userSlice"

export const getCurrentUser = async (dispatch)=> {
    try {
        const result = await BaseUrl.get("/api/user/currentuser")
        // console.log("result is: ", result)
        dispatch(setUserData(result.data))
    } catch (error) {
        console.log("api.js > getCurrentUser catch error: ", error)
    }
}