import { BaseUrl } from "../BaseUrl"
import { setUserData } from "../redux/userSlice"

// get current active user use as middleware
export const getCurrentUser = async (dispatch)=> {
    try {
        const result = await BaseUrl.get("/api/user/currentuser")
        // console.log("result is: ", result)
        dispatch(setUserData(result.data))
    } catch (error) {
        console.log("api.js > getCurrentUser catch error: ", error)
    }
}

// generate notes
export const generateNotes =async(payload)=>{
    try {
        const result = await BaseUrl.post(`/api/notes/generate-notes`, payload)
        // console.log("generate notes result.data: ", result.data)
        return result.data
    } catch (error) {
        console.log("services > api.js > generateNotes catch error: ", error)
    }
}