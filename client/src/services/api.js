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

// download-pdf
export const downloadPDF=async(result)=>{
    try {
        const response = await BaseUrl.post(`/api/pdf/generate-pdf`, {result}, {
            responseType: "blob",
        })

        const blob = new Blob([response.data], {
            type: "application/pdf",
        })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href= url 
        link.download = "ExamNotesAI.pdf"
        link.click()

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log("api.js > downloadPdf catch error: ", error.message);
        throw new Error("PDF download failed.", { cause: error });
    }
}